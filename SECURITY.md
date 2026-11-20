# Security Policy

## Supported Versions

| Version        | Supported |
| :------------- | :-------: |
| Latest release |    Yes    |
| Older releases |    No     |

Current release: `1.3.0` <!-- x-release-please-version -->

## Reporting a Vulnerability

Do not open a public issue.

Report privately through GitHub: [Security Advisories](https://github.com/AtaCanYmc/PixelSprint/security/advisories/new). Include reproduction steps, affected version or commit, and impact.

| Stage           | Target                                                                          |
| :-------------- | :------------------------------------------------------------------------------ |
| Acknowledgement | 48 hours                                                                        |
| Assessment      | 7 days                                                                          |
| Fix             | Released after verification, credited in the advisory unless you ask otherwise. |

## Threat Model

PixelSprint has no backend. Keep these properties in mind when assessing a report.

| Property       | Status                                                                                                                       |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| Storage        | `localStorage` only. Anyone with access to the browser profile can read it.                                                  |
| Transport      | WebRTC data channels, DTLS-encrypted. Signaling goes through the public PeerJS broker `0.peerjs.com`.                        |
| Session access | Anyone who knows or guesses a session ID can join. Session IDs are not secrets.                                              |
| Host role      | Client-side only. A modified client can send host events such as `DELETE_CARD` or `UPDATE_TIMER`, and peers will apply them. |
| Anonymity      | Cards carry a random codename. Peers can still see each other's IP addresses through WebRTC ICE candidates.                  |

Reports that need a server-side trust anchor to fix, such as authenticated host actions, are in scope as design issues. Card text rendered as HTML, XSS through exports, and service worker cache poisoning are in scope as vulnerabilities.
