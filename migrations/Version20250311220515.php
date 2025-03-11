<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250311220515 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logistic_information DROP updated_at, CHANGE arrival_datetime arrival_datetime DATE NOT NULL, CHANGE departure_datetime departure_datetime DATE NOT NULL');
        $this->addSql('ALTER TABLE resets_passwords DROP INDEX UNIQ_430EB590A76ED395, ADD INDEX IDX_430EB590A76ED395 (user_id)');
        $this->addSql('ALTER TABLE resets_passwords CHANGE user_id user_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE user DROP token_password, DROP password_request_at');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logistic_information ADD updated_at DATETIME DEFAULT NULL, CHANGE arrival_datetime arrival_datetime DATETIME NOT NULL, CHANGE departure_datetime departure_datetime DATETIME NOT NULL');
        $this->addSql('ALTER TABLE resets_passwords DROP INDEX IDX_430EB590A76ED395, ADD UNIQUE INDEX UNIQ_430EB590A76ED395 (user_id)');
        $this->addSql('ALTER TABLE resets_passwords CHANGE user_id user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE user ADD token_password VARCHAR(255) DEFAULT NULL, ADD password_request_at DATETIME DEFAULT NULL');
    }
}
