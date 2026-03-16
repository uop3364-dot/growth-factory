.PHONY: dev build start db worker seed test clean setup

# Quick start
setup: db-up install
	@echo "GrowthFactory setup complete. Run 'make dev' to start."

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

# Database
db-up:
	docker compose up -d db redis

db-down:
	docker compose down

db-reset:
	docker compose down -v && docker compose up -d db redis

# Worker
worker:
	cd apps/worker && python -m worker.main

seed:
	cd apps/worker && python -m worker.seed_keywords

# Tests
test:
	pnpm --filter web build
	cd apps/worker && python -m pytest tests/ -v

# Docker
up:
	docker compose up -d

down:
	docker compose down

clean:
	docker compose down -v
	rm -rf apps/web/.next apps/web/node_modules node_modules
