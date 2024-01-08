<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240107194512 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD event_category_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA74833676D FOREIGN KEY (event_category_id_id) REFERENCES event_categories (id)');
        $this->addSql('CREATE INDEX IDX_3BAE0AA74833676D ON event (event_category_id_id)');
        $this->addSql('ALTER TABLE participant ADD event_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE participant ADD CONSTRAINT FK_D79F6B113E5F2F7B FOREIGN KEY (event_id_id) REFERENCES event (id)');
        $this->addSql('CREATE INDEX IDX_D79F6B113E5F2F7B ON participant (event_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event DROP FOREIGN KEY FK_3BAE0AA74833676D');
        $this->addSql('DROP INDEX IDX_3BAE0AA74833676D ON event');
        $this->addSql('ALTER TABLE event DROP event_category_id_id');
        $this->addSql('ALTER TABLE participant DROP FOREIGN KEY FK_D79F6B113E5F2F7B');
        $this->addSql('DROP INDEX IDX_D79F6B113E5F2F7B ON participant');
        $this->addSql('ALTER TABLE participant DROP event_id_id');
    }
}
