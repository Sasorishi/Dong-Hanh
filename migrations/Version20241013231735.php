<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241013231735 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE logistic_information (id INT AUTO_INCREMENT NOT NULL, participant_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', arrival_transport VARCHAR(40) NOT NULL, arrival_datetime DATE NOT NULL, arrival_airline VARCHAR(80) DEFAULT NULL, arrival_flight_number VARCHAR(20) DEFAULT NULL, departure_transport VARCHAR(80) DEFAULT NULL, departure_datetime DATE NOT NULL, departure_airline VARCHAR(80) DEFAULT NULL, departure_flight_number VARCHAR(20) DEFAULT NULL, comments LONGTEXT DEFAULT NULL, UNIQUE INDEX UNIQ_286F59A19D1C3019 (participant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE logistic_information ADD CONSTRAINT FK_286F59A19D1C3019 FOREIGN KEY (participant_id) REFERENCES participant (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logistic_information DROP FOREIGN KEY FK_286F59A19D1C3019');
        $this->addSql('DROP TABLE logistic_information');
    }
}
