# Contributing to PixelSprint

Thank you for your interest in contributing to **PixelSprint**! We welcome contributions, bug fixes, feature requests, and improvements.

## Development Setup

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.
2. **Clone Repository**:
   ```bash
   git clone https://github.com/your-org/PixelSprint.git
   cd PixelSprint
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build & Verify**:
   ```bash
   npm run build
   ```

## Commit Message Conventions (Release Please)

PixelSprint uses **[Release Please](https://github.com/googleapis/release-please)** to automate versioning, CHANGELOG generation, and GitHub releases. 

Release Please relies on **[Conventional Commits](https://www.conventionalcommits.org/)**. Please format your commit messages using the following prefixes:

| Commit Type | Description | Release Impact |
| ----------- | ----------- | -------------- |
| `feat:`     | A new feature | Minor release (v1.x.0) |
| `fix:`      | A bug fix | Patch release (v1.0.x) |
| `docs:`     | Documentation changes | No release |
| `style:`    | Code formatting or UI styling changes | No release |
| `refactor:` | Code changes that neither fix a bug nor add a feature | Patch release |
| `perf:`     | Performance improvements | Patch release |
| `test:`     | Adding or updating tests | No release |
| `chore:`    | Maintenance, build configuration, dependencies | No release |

### Examples:
- `feat(board): add drag and drop support for retro cards`
- `fix(pwa): resolve service worker caching issue on mobile Safari`
- `docs(readme): update development setup instructions`

## Pull Request Guidelines

1. Fork the repository and create a new feature branch:
   ```bash
   git checkout -b feat/my-new-feature
   ```
2. Make your changes and verify with `npm run build`.
3. Commit your changes using Conventional Commit syntax.
4. Push your branch and open a Pull Request against `main`.

Thank you for helping make PixelSprint awesome!
