<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221116200100 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE emergency DROP FOREIGN KEY emergency_ibfk_1');
        $this->addSql('ALTER TABLE participants DROP FOREIGN KEY participants_ibfk_1');
        $this->addSql('ALTER TABLE participants DROP FOREIGN KEY participants_ibfk_2');
        $this->addSql('ALTER TABLE tickets DROP FOREIGN KEY tickets_ibfk_1');
        $this->addSql('ALTER TABLE tickets DROP FOREIGN KEY tickets_ibfk_2');
        $this->addSql('DROP TABLE camps');
        $this->addSql('DROP TABLE emergency');
        $this->addSql('DROP TABLE participants');
        $this->addSql('DROP TABLE tickets');
        $this->addSql('DROP TABLE users');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE camps (id VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, label VARCHAR(45) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, place VARCHAR(80) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, location VARCHAR(80) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, year INT NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE emergency (id VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, firstname VARCHAR(45) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, lastname VARCHAR(45) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, phone VARCHAR(35) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, email VARCHAR(50) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, idUser VARCHAR(36) CHARACTER SET utf8 DEFAULT NULL COLLATE `utf8_general_ci`, INDEX idUser (idUser), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE participants (id VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, firstname VARCHAR(45) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, lastname VARCHAR(45) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, phone VARCHAR(35) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, email VARCHAR(50) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, age INT NOT NULL, address VARCHAR(50) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, country VARCHAR(50) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, agreements TINYINT(1) NOT NULL, idCamp VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, idUser VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, INDEX idCamp (idCamp), INDEX idUser (idUser), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE tickets (id VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, price INT NOT NULL, idCamp VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, idParticipant VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, INDEX idParticipant (idParticipant), INDEX idCamp (idCamp), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE users (id VARCHAR(36) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, email VARCHAR(50) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, password VARCHAR(50) CHARACTER SET utf8 NOT NULL COLLATE `utf8_general_ci`, createDate DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_general_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE emergency ADD CONSTRAINT emergency_ibfk_1 FOREIGN KEY (idUser) REFERENCES users (id)');
        $this->addSql('ALTER TABLE participants ADD CONSTRAINT participants_ibfk_1 FOREIGN KEY (idCamp) REFERENCES camps (id)');
        $this->addSql('ALTER TABLE participants ADD CONSTRAINT participants_ibfk_2 FOREIGN KEY (idUser) REFERENCES users (id)');
        $this->addSql('ALTER TABLE tickets ADD CONSTRAINT tickets_ibfk_1 FOREIGN KEY (idCamp) REFERENCES camps (id)');
        $this->addSql('ALTER TABLE tickets ADD CONSTRAINT tickets_ibfk_2 FOREIGN KEY (idParticipant) REFERENCES participants (id)');
        $this->addSql('DROP TABLE user');
    }
}
