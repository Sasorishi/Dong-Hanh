<?php
namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $email;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $tokenPassword = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $passwordRequestAt = null;

    #[ORM\Column(nullable: true)]
    private ?bool $verified = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $token_verified = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $verified_request_at = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * The public representation of the user (e.g. a username, an email address, etc.)
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getTokenPassword(): ?string
    {
        return $this->tokenPassword;
    }

    public function setTokenPassword(?string $tokenPassword): self
    {
        $this->tokenPassword = $tokenPassword;

        return $this;
    }

    public function getPasswordRequestAt(): ?\DateTimeInterface
    {
        return $this->passwordRequestAt;
    }

    public function setPasswordRequestAt(?\DateTimeInterface $passwordRequestAt): self
    {
        $this->passwordRequestAt = $passwordRequestAt;

        return $this;
    }

    public function isVerified(): ?bool
    {
        return $this->verified;
    }

    public function setVerified(?bool $verified): self
    {
        $this->verified = $verified;

        return $this;
    }

    public function getTokenVerified(): ?string
    {
        return $this->token_verified;
    }

    public function setTokenVerified(?string $token_verified): self
    {
        $this->token_verified = $token_verified;

        return $this;
    }

    public function getVerifiedRequestAt(): ?\DateTimeInterface
    {
        return $this->verified_request_at;
    }

    public function setVerifiedRequestAt(?\DateTimeInterface $verified_request_at): self
    {
        $this->verified_request_at = $verified_request_at;

        return $this;
    }
}
