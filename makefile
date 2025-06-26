# Makefile pour le projet Symfony et React

# Variables
DOCKER_COMPOSE = docker-compose
PHP_SERVICE = php
NODE_SERVICE = node
MAKE = make

# Cibles

.PHONY: all up down build install-php install-node start-php start-node test help

help:
	@echo "\nCommandes Docker :"
	@echo "  make up           : Démarrer les conteneurs Docker en arrière-plan"
	@echo "  make down         : Arrêter et supprimer les conteneurs Docker"
	@echo "  make build        : Construire les conteneurs Docker"
	@echo "  make rebuild      : Rebuild les conteneurs sans cache"
	@echo "  make clean        : Supprimer tous les conteneurs, images et volumes Docker"
	@echo "\nDépendances :"
	@echo "  make install-back : Installer les dépendances PHP (composer)"
	@echo "  make install-front: Installer les dépendances Node.js (npm)"
	@echo "\nAccès aux conteneurs :"
	@echo "  make back         : Ouvrir un shell bash dans le conteneur PHP"
	@echo "  make front        : Ouvrir un shell bash dans le conteneur Node.js"
	@echo "\nLogs :"
	@echo "  make php-logs     : Afficher les logs du conteneur PHP"
	@echo "  make node-logs    : Afficher les logs du conteneur Node.js"
	@echo "\nTests :"
	@echo "  make test         : Exécuter les tests unitaires PHP (PHPUnit)"
	@echo "\nQualité de code Back-end :"
	@echo "  make phpstan      : Lancer PHPStan sur le code back"
	@echo "  make phpcs        : Vérifier le code PHP avec PHPCS (PSR12)"
	@echo "  make back-lint    : Corriger le code PHP avec PHPCBF (PSR12)"
	@echo "\nQualité de code Front-end :"
	@echo "  make front-lint   : Lancer ESLint sur le code front"

# Cible par défaut
all: up

# Démarrer les conteneurs
up:
	$(DOCKER_COMPOSE) up -d

# Arrêter et supprimer les conteneurs
down:
	$(DOCKER_COMPOSE) down

# Construire les conteneurs
build:
	$(DOCKER_COMPOSE) build

# Rebuild sans cache
rebuild:
	$(DOCKER_COMPOSE) build --no-cache

# Efface tous les conteneurs, images et volumes
clean:
	$(DOCKER_COMPOSE) down --volumes --rmi all --remove-orphans

# Installer les dépendances PHP
install-back:
	$(DOCKER_COMPOSE) run --rm $(PHP_SERVICE) composer install

# Installer les dépendances Node.js
install-front:
	$(DOCKER_COMPOSE) run --rm $(NODE_SERVICE) npm install

# Démarrer le serveur PHP
back:
	$(DOCKER_COMPOSE) exec php bash

# Démarrer le serveur Node.js
front:
	$(DOCKER_COMPOSE) exec node bash

# Afficher les logs du conteneur PHP
php-logs:
	$(DOCKER_COMPOSE) logs php

# Afficher les logs du conteneur PHP
node-logs:
	$(DOCKER_COMPOSE) logs node

# Exécuter les tests
test:
	$(DOCKER_COMPOSE) run --rm $(PHP_SERVICE) php bin/phpunit --testdox --coverage-text

# Lance ESLint
front-lint:
	$(DOCKER_COMPOSE) exec $(NODE_SERVICE) npm run lint

# Lance Phpstan
phpstan:
	$(DOCKER_COMPOSE) exec $(PHP_SERVICE) vendor/bin/phpstan analyse

phpcs:
	$(DOCKER_COMPOSE) exec $(PHP_SERVICE) vendor/bin/phpcs --standard=PSR12 src/

back-lint:
	$(DOCKER_COMPOSE) exec $(PHP_SERVICE) vendor/bin/phpcbf --standard=PSR12 src/

.PHONY: run-tests
run-tests: ## Lance tous les tests et vérifications de qualité de code
	@echo "🔍 Lancement des vérifications de qualité de code..."
	$(MAKE) back-lint
	$(MAKE) phpcs
	$(MAKE) phpstan
	@echo "🧪 Lancement des tests unitaires..."
	$(MAKE) test
	@echo "📦 Build du frontend..."
	$(DOCKER_COMPOSE) exec $(NODE_SERVICE) npm run build
	@echo "✅ Tous les tests et vérifications sont terminés !"