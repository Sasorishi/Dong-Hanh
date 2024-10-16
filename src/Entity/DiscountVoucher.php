<?php

namespace App\Entity;

use App\Repository\DiscountVoucherRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DiscountVoucherRepository::class)]
class DiscountVoucher
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column()]
    private ?int $discountPercentage = null;

    #[ORM\Column(length: 12)]
    private ?string $code = null;

    #[ORM\Column]
    private ?bool $isUsed = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne]
    private ?User $user = null;

    #[ORM\Column]
    private ?bool $usable = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDiscountPercentage(): ?int
    {
        return $this->discountPercentage;
    }

    public function setDiscountPercentage(int $discountPercentage): static
    {
        $this->discountPercentage = $discountPercentage;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function __toString(): string
    {
        return (string) $this->getCode();
    }

    public function isUsable(): ?bool
    {
        return $this->usable;
    }

    public function setUsable(bool $usable): static
    {
        $this->usable = $usable;

        return $this;
    }
}
