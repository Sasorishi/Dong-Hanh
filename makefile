# Makefile for Symfony Project

# Variables
APP_ENV ?= dev
APP_DEBUG ?= 1

# Commands
PHP = php
SYMFONY_CONSOLE = $(PHP) bin/console

# Targets
.PHONY: help cache clear cache warmup serve db migrate fixtures test

help:  ## Display help information
	@echo "Available commands:"
	@echo "  make cache-clear      Clear the cache"
	@echo "  make cache-warmup     Warm up the cache"
	@echo "  make serve            Start the Symfony server"
	@echo "  make db-migrate       Run database migrations"
	@echo "  make fixtures         Load fixtures into the database"
	@echo "  make test             Run tests"

cache-clear:  ## Clear the cache
	$(SYMFONY_CONSOLE) cache:clear --env=$(APP_ENV)

cache-warmup:  ## Warm up the cache
	$(SYMFONY_CONSOLE) cache:warmup --env=$(APP_ENV) --no-debug=$(APP_DEBUG)

serve:  ## Start the Symfony server
	$(SYMFONY_CONSOLE) server:start

db-migrate:  ## Run database migrations
	$(SYMFONY_CONSOLE) doctrine:migrations:migrate

fixtures:  ## Load fixtures into the database
	$(SYMFONY_CONSOLE) doctrine:fixtures:load --no-interaction

test:  ## Run tests
	$(PHP) bin/phpunit
