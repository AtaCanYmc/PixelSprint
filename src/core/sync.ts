/**
 * PixelSprint Core Real-time Synchronization Engine (TypeScript)
 * Provides real-time multi-tab & multi-device sync via BroadcastChannel & WebRTC (PeerJS)
 */

import Peer, { DataConnection } from 'peerjs';
import { RealtimeMessage, RealtimeEventType } from '../types';

export type RealtimeCallback = (msg: RealtimeMessage) => void;

class RealtimeSyncEngine {
  private channel: BroadcastChannel | null = null;
  private clientId: string;
  private currentSessionId: string | null = null;
  private listeners: RealtimeCallback[] = [];
  private ws: WebSocket | null = null;
  private customWsUrl: string | null = null;

  // WebRTC (PeerJS) P2P Mesh Network
  private peer: Peer | null = null;
  private peerConnections: Map<string, DataConnection> = new Map();
  private isP2PConnected: boolean = false;

  constructor() {
    this.clientId = 'client-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
  }

  public init(sessionId: string): void {
    if (this.currentSessionId === sessionId) return;
    this.disconnect();

    this.currentSessionId = sessionId;

    // 1. BroadcastChannel API for instant cross-tab / multi-window sync
    if ('BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(`pixelsprint_session_${sessionId}`);
        this.channel.onmessage = (event: MessageEvent<RealtimeMessage>) => {
          this.handleIncomingMessage(event.data);
        };
      } catch (e) {
        console.warn('[RealtimeSync] BroadcastChannel init failed:', e);
      }
    }

    // 2. WebRTC P2P Multi-Device Synchronization (PeerJS)
    this.initP2PMesh(sessionId);

    // 3. Optional WebSocket connection if custom server URL is set
    const savedWsUrl = localStorage.getItem('pixelsprint_ws_server_url');
    if (savedWsUrl) {
      this.customWsUrl = savedWsUrl;
      this.connectWebSocket(savedWsUrl, sessionId);
    }

    // Request initial state from active peers
    this.broadcast('REQUEST_SYNC');
  }

  private initP2PMesh(sessionId: string): void {
    const sanitizedSessionId = sessionId.replace(/[^a-zA-Z0-9]/g, '');
    const peerId = `pxs-${sanitizedSessionId}-${this.clientId}`;
    const hostPeerId = `pxs-host-${sanitizedSessionId}`;

    try {
      // Create PeerJS client
      this.peer = new Peer(peerId, {
        debug: 0
      });

      this.peer.on('open', (id) => {
        console.log('[RealtimeSync P2P] Peer initialized with ID:', id);

        // Try connecting to session host
        if (peerId !== hostPeerId) {
          this.connectToPeer(hostPeerId);
        }
      });

      // Handle errors (e.g. host ID taken, become the host peer!)
      this.peer.on('error', (err) => {
        if (err.type === 'unavailable-id') {
          // Join existing room by connecting to host
          this.connectToPeer(hostPeerId);
        } else {
          console.warn('[RealtimeSync P2P] Peer error:', err.type);
        }
      });

      // Handle incoming P2P connection from mobile / other devices
      this.peer.on('connection', (conn) => {
        this.setupPeerConnection(conn);
      });

      // If host creation succeeds:
      if (!this.peer.destroyed) {
        const hostPeer = new Peer(hostPeerId, { debug: 0 });
        hostPeer.on('connection', (conn) => {
          this.setupPeerConnection(conn);
        });
        hostPeer.on('error', () => {
          // Host already exists, connect as peer client
          this.connectToPeer(hostPeerId);
        });
      }
    } catch (e) {
      console.warn('[RealtimeSync P2P] PeerJS init failed:', e);
    }
  }

  private connectToPeer(targetPeerId: string): void {
    if (!this.peer || this.peer.destroyed) return;
    try {
      const conn = this.peer.connect(targetPeerId, { reliable: true });
      this.setupPeerConnection(conn);
    } catch (e) {}
  }

  private setupPeerConnection(conn: DataConnection): void {
    conn.on('open', () => {
      console.log('[RealtimeSync P2P] Connected to P2P peer:', conn.peer);
      this.peerConnections.set(conn.peer, conn);
      this.isP2PConnected = true;
      this.updateP2PStatusBadge();

      // Request current cards state from connected peer
      const syncReq: RealtimeMessage = {
        type: 'REQUEST_SYNC',
        sessionId: this.currentSessionId || '',
        senderId: this.clientId,
        timestamp: Date.now()
      };
      conn.send(syncReq);
    });

    conn.on('data', (data) => {
      try {
        const msg = typeof data === 'string' ? JSON.parse(data) : (data as RealtimeMessage);
        this.handleIncomingMessage(msg);
      } catch (e) {}
    });

    conn.on('close', () => {
      this.peerConnections.delete(conn.peer);
      this.isP2PConnected = this.peerConnections.size > 0;
      this.updateP2PStatusBadge();
    });
  }

  private updateP2PStatusBadge(): void {
    const badge = document.getElementById('network-status-badge');
    if (!badge) return;
    if (this.peerConnections.size > 0) {
      badge.textContent = `🟢 P2P SYNC (${this.peerConnections.size + 1} Cihaz)`;
      badge.className = 'network-badge online';
      badge.title = `${this.peerConnections.size + 1} cihaz WebRTC P2P ile anlık senkronize.`;
    }
  }

  public setCustomWebSocketServer(url: string | null): void {
    this.customWsUrl = url;
    if (url) {
      localStorage.setItem('pixelsprint_ws_server_url', url);
      if (this.currentSessionId) {
        this.connectWebSocket(url, this.currentSessionId);
      }
    } else {
      localStorage.removeItem('pixelsprint_ws_server_url');
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    }
  }

  public getCustomWebSocketServer(): string | null {
    return this.customWsUrl;
  }

  private connectWebSocket(url: string, sessionId: string): void {
    try {
      this.ws = new WebSocket(`${url}?session=${sessionId}`);
      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data) as RealtimeMessage;
          this.handleIncomingMessage(msg);
        } catch (e) {}
      };
      this.ws.onopen = () => {
        console.log('[RealtimeSync] WebSocket connected to server:', url);
        this.broadcast('REQUEST_SYNC');
      };
    } catch (e) {
      console.warn('[RealtimeSync] WebSocket connection failed:', e);
    }
  }

  public broadcast(type: RealtimeEventType, payload?: any): void {
    if (!this.currentSessionId) return;

    const msg: RealtimeMessage = {
      type,
      sessionId: this.currentSessionId,
      senderId: this.clientId,
      timestamp: Date.now(),
      payload
    };

    // 1. BroadcastChannel (Cross-tab)
    if (this.channel) {
      try {
        this.channel.postMessage(msg);
      } catch (e) {}
    }

    // 2. WebRTC P2P DataChannels (Cross-Device Mobile ↔ Desktop)
    this.peerConnections.forEach((conn) => {
      if (conn.open) {
        try {
          conn.send(msg);
        } catch (e) {}
      }
    });

    // 3. WebSocket (Custom Server)
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(msg));
      } catch (e) {}
    }
  }

  private handleIncomingMessage(msg: RealtimeMessage): void {
    if (msg.senderId === this.clientId) return;
    if (msg.sessionId !== this.currentSessionId) return;

    this.listeners.forEach((cb) => cb(msg));
  }

  public onMessage(callback: RealtimeCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  public disconnect(): void {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.peerConnections.forEach((conn) => conn.close());
    this.peerConnections.clear();
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.isP2PConnected = false;
    this.currentSessionId = null;
  }

  public getClientId(): string {
    return this.clientId;
  }
}

export const realtimeSync = new RealtimeSyncEngine();
