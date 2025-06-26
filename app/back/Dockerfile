FROM dunglas/frankenphp:1-php8.3 AS frankenphp_base

WORKDIR /var/www/html

# Installer Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash && \
    mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Copier l'application Symfony
COPY . .

# Installer les dépendances système
RUN apt-get update && apt-get install -y --no-install-recommends \
    acl \
    file \
    gettext \
    git \
    curl \
    gnupg \
    libpq-dev \
    libmariadb-dev \
    && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP
RUN install-php-extensions \
    @composer \
    apcu \
    intl \
    opcache \
    zip \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    gd

# Installer les dépendances Composer
RUN composer install --no-interaction --optimize-autoloader --no-scripts

# Exposer le port
EXPOSE 80
