[← Back to Docs](README.md)

# Local Storage

All persistent state is in `window.localStorage` of the browser profile. Nothing is stored on a server.

| Key                              | Content                                                 |
| :------------------------------- | :------------------------------------------------------ |
| `pixelsprint_sessions_v1`        | Array of saved sessions.                                |
| `pixelsprint_active_session_v1`  | ID of the last opened session.                          |
| `pixelsprint_cards_session_<id>` | Cards for one session.                                  |
| `pixelsprint_user_votes`         | Map of card ID to `up`, `down` or null for this device. |
| `pixelsprint_hosted_sessions`    | Session IDs this browser hosts.                         |
| `pixelsprint_cards_revealed`     | Map of session ID to reveal flag.                       |
| `pixelsprint_timer_state`        | Map of session ID to `RetroTimerState`.                 |
| `pixelsprint_sound_v1`           | Sound on or off.                                        |
| `pixelsprint_theme`              | `light` or `dark`.                                      |
| `pixelsprint_show_button_labels` | `true` or `false`.                                      |
| `pixelsprint_ws_server_url`      | Optional WebSocket relay URL. Not set by the UI.        |

## Timer State

```ts
interface RetroTimerState {
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  isExpired: boolean;
  startedAt?: number;
}
```

## Resetting

Clear site data in the browser, or run `localStorage.clear()` in the DevTools console on the app origin. This also removes host status for every session.
