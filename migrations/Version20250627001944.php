<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250627001944 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ticket ADD discount_voucher_usage_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ticket ADD CONSTRAINT FK_97A0ADA3B0DEE344 FOREIGN KEY (discount_voucher_usage_id) REFERENCES discount_voucher_usage (id)');
        $this->addSql('CREATE INDEX IDX_97A0ADA3B0DEE344 ON ticket (discount_voucher_usage_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ticket DROP FOREIGN KEY FK_97A0ADA3B0DEE344');
        $this->addSql('DROP INDEX IDX_97A0ADA3B0DEE344 ON ticket');
        $this->addSql('ALTER TABLE ticket DROP discount_voucher_usage_id');
    }
}
