.PHONY: help install dev build preview check-types format clean check release-check

.DEFAULT_GOAL := help

help: ## Show available make commands
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Install dependencies cleanly (npm ci)
	npm ci

dev: ## Start local Vite development server with HMR
	npm run dev

build: ## Type-check and build production PWA bundle into dist/
	npm run build

preview: ## Serve production build locally from dist/
	npm run preview

check-types: ## Run TypeScript compiler type-check (tsc --noEmit)
	npm run check-types

format: ## Format all source and documentation files with Prettier
	npm run format

check: check-types build ## Run all verification checks (types + production build)

clean: ## Remove build artifacts (dist/)
	rm -rf dist

release-check: ## Show current release-please tracked version across repository
	@echo "Package version:  $$(node -p "require('./package.json').version")"
	@echo "Manifest version: $$(node -p "require('./.release-please-manifest.json')['.']")"
