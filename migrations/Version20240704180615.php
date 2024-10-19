<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240704180615 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->connection->beginTransaction();

        try {
            // Déplacement des données vers la table resets_passwords
            $this->addSql('INSERT INTO resets_passwords (user_id, token, expired_at)
                SELECT id, token_password, password_request_at FROM user WHERE token_password IS NOT NULL');

            // Suppression des colonnes de la table user
            $this->addSql('ALTER TABLE user DROP token_password, DROP password_request_at');

            $this->connection->commit();
        } catch (\Exception $e) {
            $this->connection->rollBack();
            throw $e;
        }
    }

    public function down(Schema $schema): void
    {
        $this->connection->beginTransaction();

        try {
            // Récréation des colonnes dans la table user et insertion des données
            $this->addSql('ALTER TABLE user ADD token_password VARCHAR(255) DEFAULT NULL, ADD password_request_at DATETIME DEFAULT NULL');

            $this->addSql('UPDATE user u
                JOIN resets_passwords rp ON u.id = rp.user_id
                SET u.token_password = rp.token, u.password_request_at = rp.expired_at');

            // Suppression des données dans la table resets_passwords
            $this->addSql('TRUNCATE TABLE resets_passwords');

            $this->connection->commit();
        } catch (\Exception $e) {
            $this->connection->rollBack();
            throw $e;
        }
    }
}
