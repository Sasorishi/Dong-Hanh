<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230130180900 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD register TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE ticket ADD create_time DATETIME NOT NULL, ADD update_time DATETIME DEFAULT NULL, ADD status VARCHAR(255) DEFAULT NULL, ADD currency VARCHAR(15) NOT NULL, ADD order_id VARCHAR(255) NOT NULL, ADD capture_id VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event DROP register');
        $this->addSql('ALTER TABLE ticket DROP create_time, DROP update_time, DROP status, DROP currency, DROP order_id, DROP capture_id');
    }
}
