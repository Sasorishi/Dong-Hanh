<?php

namespace App\Entity;

use App\Repository\DiscountVoucherUsageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    /**
     * @var Collection<int, Ticket>
     */
    #[ORM\OneToMany(mappedBy: 'discountVoucherUsage', targetEntity: Ticket::class)]
    private Collection $Ticket;

    public function __construct()
    {
        $this->Ticket = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Ticket>
     */
    public function getTicket(): Collection
    {
        return $this->Ticket;
    }

    public function addTicket(Ticket $ticket): static
    {
        if (!$this->Ticket->contains($ticket)) {
            $this->Ticket->add($ticket);
            $ticket->setDiscountVoucherUsage($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): static
    {
        if ($this->Ticket->removeElement($ticket)) {
            // set the owning side to null (unless already changed)
            if ($ticket->getDiscountVoucherUsage() === $this) {
                $ticket->setDiscountVoucherUsage(null);
            }
        }

        return $this;
    }
}
