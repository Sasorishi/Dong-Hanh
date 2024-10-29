<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241029190858 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logistic_information CHANGE arrival_datetime arrival_datetime DATETIME NOT NULL, CHANGE departure_datetime departure_datetime DATETIME NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logistic_information CHANGE arrival_datetime arrival_datetime DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', CHANGE departure_datetime departure_datetime DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
    }
}
