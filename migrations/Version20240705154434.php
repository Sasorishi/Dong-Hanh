<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240705154434 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE account_code_verify (id INT AUTO_INCREMENT NOT NULL, user_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', code VARCHAR(255) DEFAULT NULL, expired_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_FE48EE2A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE account_code_verify ADD CONSTRAINT FK_FE48EE2A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD token_password VARCHAR(255) DEFAULT NULL, ADD password_request_at DATETIME DEFAULT NULL, ADD is_verified TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE account_code_verify DROP FOREIGN KEY FK_FE48EE2A76ED395');
        $this->addSql('DROP TABLE account_code_verify');
        $this->addSql('ALTER TABLE user DROP token_password, DROP password_request_at, DROP is_verified');
    }
}
