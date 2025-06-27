<?php

namespace App\Entity;

use App\Repository\DiscountVoucherRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?bool $usable = null;

    /**
     * @var Collection<int, DiscountVoucherUsage>
     */
    #[ORM\OneToMany(mappedBy: 'DiscountVoucher', targetEntity: DiscountVoucherUsage::class)]
    private Collection $discountVoucherUsages;

    #[ORM\ManyToOne(inversedBy: 'discountVouchers')]
    private ?Event $Event = null;

    public function __construct()
    {
        $this->discountVoucherUsages = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, DiscountVoucherUsage>
     */
    public function getDiscountVoucherUsages(): Collection
    {
        return $this->discountVoucherUsages;
    }

    public function addDiscountVoucherUsage(DiscountVoucherUsage $discountVoucherUsage): static
    {
        if (!$this->discountVoucherUsages->contains($discountVoucherUsage)) {
            $this->discountVoucherUsages->add($discountVoucherUsage);
            $discountVoucherUsage->setDiscountVoucher($this);
        }

        return $this;
    }

    public function removeDiscountVoucherUsage(DiscountVoucherUsage $discountVoucherUsage): static
    {
        if ($this->discountVoucherUsages->removeElement($discountVoucherUsage)) {
            // set the owning side to null (unless already changed)
            if ($discountVoucherUsage->getDiscountVoucher() === $this) {
                $discountVoucherUsage->setDiscountVoucher(null);
            }
        }

        return $this;
    }

    public function getEvent(): ?Event
    {
        return $this->Event;
    }

    public function setEvent(?Event $Event): static
    {
        $this->Event = $Event;

        return $this;
    }
}
