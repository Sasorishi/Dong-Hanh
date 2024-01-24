<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240107195033 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA74833676D');
        $this->addSql('DROP INDEX IDX_3BAE0AA74833676D ON event');
        $this->addSql('ALTER TABLE event CHANGE event_category_id_id event_category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA7B9CF4E62 FOREIGN KEY (event_category_id) REFERENCES event_categories (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA7B9CF4E62 ON event (event_category_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA7B9CF4E62');
        $this->addSql('DROP INDEX IDX_3BAE0AA7B9CF4E62 ON event');
        $this->addSql('ALTER TABLE event CHANGE event_category_id event_category_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA74833676D FOREIGN KEY (event_category_id_id) REFERENCES event_categories (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA74833676D ON event (event_category_id_id)');
    }
}
