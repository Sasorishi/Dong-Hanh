<?php

namespace App\Entity;

use App\Repository\DiscountVoucherUsageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DiscountVoucherUsageRepository::class)]
class DiscountVoucherUsage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $UsedAt = null;

    #[ORM\ManyToOne(inversedBy: 'discountVoucherUsages')]
    private ?DiscountVoucher $DiscountVoucher = null;

    #[ORM\ManyToOne(inversedBy: 'discountVoucherUsages')]
    private ?User $User = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsedAt(): ?\DateTimeImmutable
    {
        return $this->UsedAt;
    }

    public function setUsedAt(\DateTimeImmutable $UsedAt): static
    {
        $this->UsedAt = $UsedAt;

        return $this;
    }

    public function getDiscountVoucher(): ?DiscountVoucher
    {
        return $this->DiscountVoucher;
    }

    public function setDiscountVoucher(?DiscountVoucher $DiscountVoucher): static
    {
        $this->DiscountVoucher = $DiscountVoucher;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->User;
    }

    public function setUser(?User $User): static
    {
        $this->User = $User;

        return $this;
    }
}
