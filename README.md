<p align="center">
  <a href="https://symfony.com" target="_blank">
    <img src="https://symfony.com/logos/symfony_black_02.svg">
  </a>
</p>

# Dong Hanh Website

The Dong Hanh website is powered by [Symfony][2], a robust PHP framework for web and console applications, and utilizes a set of reusable PHP components.

## Documentation

Explore the following resources to master Symfony and understand its ecosystem:

- [Getting Started guide][7]: Ideal for Symfony beginners.
- [Symfony Demo application][14]: Practical experience with Symfony.
- [Symfony The Fast Track][15]: In-depth exploration of the Symfony ecosystem.
- [Guides and Tutorials][8], [Components docs][9], [Best Practices][10]: Master Symfony through detailed documentation.

## Project Specifics

This Symfony 6 project incorporates React and Tailwind. Follow the steps below to set up and run the project:

## Prerequisites

Before getting started, make sure you have the following prerequisites installed on your machine:

- [PHP](https://www.php.net/) >= 8.2
- [Composer](https://getcomposer.org/) (Dependency Manager for PHP)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

1. **Clone this repository to your local machine:**

```bash
git clone url-repo
```

2. **Navigate into the project directory:**

   ```bash
   cd your-project
   ```

3. **Install PHP dependencies using Composer:**

   ```bash
   composer install
   ```

4. **Install JavaScript dependencies using npm:**

   ```bash
   npm install
   ```

5. **Build the frontend assets:**

   ```bash
   npm run build
   ```

6. **Start the Symfony server:**

   ```bash
   symfony serve:start
   ```

7. **Migrate the database:**
   Edit in your .env file : DATABASE_URL="mysql://username:password@127.0.0.1:3306/database"

```
php bin/console doctrine:database:create
```

```
php bin/console doctrine:schema:update --force
```

8. **Open your web browser and navigate to** `http://localhost:8000` **to view the application.**

### Development

Run Symfony development server: `symfony server:start`.

Run Encore watcher for automatic asset rebuilding during development: `yarn encore dev --watch`.

Visit [http://localhost:8000][1] in your browser to access the application.

## Community and Support

- [Symfony Community][11]: Engage with the Symfony community for support and collaboration.

[1]: http://localhost:8000
[2]: https://symfony.com
[3]: https://symfony.com/doc/current/reference/requirements.html
[4]: https://symfony.com/doc/current/setup.html
[5]: https://semver.org
[6]: https://symfony.com/doc/current/contributing/community/releases.html
[7]: https://symfony.com/doc/current/page_creation.html
[8]: https://symfony.com/doc/current/index.html
[9]: https://symfony.com/doc/current/components/index.html
[10]: https://symfony.com/doc/current/best_practices/index.html
[11]: https://symfony.com/community
[12]: https://getcomposer.org/download/
[13]: https://getcomposer.org/doc/00-intro.md#globally
[14]: https://github.com/symfony/symfony-demo
[15]: https://symfony.com/book
