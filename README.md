<p align="center">
  <a href="https://symfony.com" target="_blank">
    <img src="https://symfony.com/logos/symfony_black_02.svg">
  </a>
</p>

# Dong Hanh Website

The Dong Hanh website is powered by [Symfony][2], a robust PHP framework for web and console applications, and utilizes a set of reusable PHP components.

## Installation

1. [Install Symfony][4] using Composer (refer to [requirements details][3]).
2. Symfony strictly follows [semantic versioning][5] and provides "Long Term Support" (LTS) versions. Check the [release process][6] for predictability and business-friendly updates.
3. If you encounter issues with Composer installation, consider [installing it locally][12] and moving it to a folder within your PATH for [global usage][13].
4. Ensure Symfony is exported to your PATH.

## Documentation

Explore the following resources to master Symfony and understand its ecosystem:

- [Getting Started guide][7]: Ideal for Symfony beginners.
- [Symfony Demo application][14]: Practical experience with Symfony.
- [Symfony The Fast Track][15]: In-depth exploration of the Symfony ecosystem.
- [Guides and Tutorials][8], [Components docs][9], [Best Practices][10]: Master Symfony through detailed documentation.

## Project Specifics

This Symfony 6 project incorporates React and Tailwind. Follow the steps below to set up and run the project:

### Prerequisites

- Node.js and npm for managing JavaScript dependencies.
- Yarn for efficient package management.

### Installation Steps

1. Clone the repository: `git clone https://github.com/Sasorishi/dong-hanh.git`.
2. Navigate to the project folder: `cd dong-hanh`.
3. Install PHP dependencies with Composer: `composer install`.
4. Install JavaScript dependencies with Yarn: `npm install`.
5. Build assets with Webpack Encore: `npm run dev-server`.

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
