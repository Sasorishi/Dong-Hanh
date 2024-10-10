<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241010144409 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE flight_information ADD participant_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE flight_information ADD CONSTRAINT FK_9C8CA6789D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9C8CA6789D1C3019 ON flight_information (participant_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE flight_information DROP FOREIGN KEY FK_9C8CA6789D1C3019');
        $this->addSql('DROP INDEX UNIQ_9C8CA6789D1C3019 ON flight_information');
        $this->addSql('ALTER TABLE flight_information DROP participant_id');
    }
}
