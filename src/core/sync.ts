/**
 * PixelSprint Core Real-time Synchronization Engine (TypeScript)
 * Provides real-time multi-tab & multi-device sync via BroadcastChannel & Pluggable Adapters
 */

import { RealtimeMessage, RealtimeEventType } from '../types';

export type RealtimeCallback = (msg: RealtimeMessage) => void;

class RealtimeSyncEngine {
  private channel: BroadcastChannel | null = null;
  private clientId: string;
  private currentSessionId: string | null = null;
  private listeners: RealtimeCallback[] = [];
  private ws: WebSocket | null = null;
  private customWsUrl: string | null = null;

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

    // 2. Optional WebSocket connection if custom server URL is set in localStorage
    const savedWsUrl = localStorage.getItem('pixelsprint_ws_server_url');
    if (savedWsUrl) {
      this.customWsUrl = savedWsUrl;
      this.connectWebSocket(savedWsUrl, sessionId);
    }

    // Request initial state from active peers
    this.broadcast('REQUEST_SYNC');
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

    if (this.channel) {
      try {
        this.channel.postMessage(msg);
      } catch (e) {}
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(msg));
      } catch (e) {}
    }
  }

  private handleIncomingMessage(msg: RealtimeMessage): void {
    if (msg.senderId === this.clientId) return;
    if (msg.sessionId !== this.currentSessionId) return;

    this.listeners.forEach(cb => cb(msg));
  }

  public onMessage(callback: RealtimeCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
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
    this.currentSessionId = null;
  }

  public getClientId(): string {
    return this.clientId;
  }
}

export const realtimeSync = new RealtimeSyncEngine();
