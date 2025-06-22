<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250622123250 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE staff_member (id INT AUTO_INCREMENT NOT NULL, event_id INT DEFAULT NULL, lastname VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, age INT NOT NULL, gender VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', payment TINYINT(1) NOT NULL, email VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, INDEX IDX_759948C371F7E88B (event_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE staff_member ADD CONSTRAINT FK_759948C371F7E88B FOREIGN KEY (event_id) REFERENCES event (id)');
        $this->addSql('ALTER TABLE ticket ADD staff_member_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA344DB03B1 FOREIGN KEY (staff_member_id) REFERENCES staff_member (id)');
        $this->addSql('CREATE INDEX IDX_97A0ADA344DB03B1 ON ticket (staff_member_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA344DB03B1');
        $this->addSql('ALTER TABLE staff_member DROP FOREIGN KEY FK_759948C371F7E88B');
        $this->addSql('DROP TABLE staff_member');
        $this->addSql('DROP INDEX IDX_97A0ADA344DB03B1 ON ticket');
        $this->addSql('ALTER TABLE ticket DROP staff_member_id');
    }
}
