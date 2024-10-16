<?php

namespace App\Entity;

use App\Repository\ParticipantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ParticipantRepository::class)]
class Participant
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private $id;

    #[ORM\Column(length: 255)]
    private ?string $Firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $Lastname = null;

    #[ORM\Column(length: 255)]
    private ?string $Email = null;

    #[ORM\Column(length: 255)]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $country = null;

    #[ORM\Column(length: 255)]
    private ?string $gender = null;

    #[ORM\Column]
    private ?int $age = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $expectations = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $healthcare = null;

    #[ORM\Column]
    private ?bool $waiver = null;

    #[ORM\Column]
    private ?bool $guardian = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?bool $payment = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $city = null;

    #[ORM\ManyToOne(inversedBy: 'participants')]
    private ?Event $event = null;

    #[ORM\OneToMany(mappedBy: 'participant', targetEntity: Ticket::class)]
    private Collection $tickets;

    #[ORM\OneToOne(mappedBy: 'participant', cascade: ['persist', 'remove'])]
    private ?LogisticInformation $logisticInformation = null;

    #[ORM\Column]
    private ?bool $needLogistic = null;

    public function __construct()
    {
        $this->tickets = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->Firstname;
    }

    public function setFirstname(string $Firstname): self
    {
        $this->Firstname = $Firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->Lastname;
    }

    public function setLastname(string $Lastname): self
    {
        $this->Lastname = $Lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(string $Email): self
    {
        $this->Email = $Email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getExpectations(): ?string
    {
        return $this->expectations;
    }

    public function setExpectations(?string $expectations): self
    {
        $this->expectations = $expectations;

        return $this;
    }

    public function getHealthcare(): ?string
    {
        return $this->healthcare;
    }

    public function setHealthcare(?string $healthcare): self
    {
        $this->healthcare = $healthcare;

        return $this;
    }

    public function isWaiver(): ?bool
    {
        return $this->waiver;
    }

    public function setWaiver(bool $waiver): self
    {
        $this->waiver = $waiver;

        return $this;
    }

    public function isGuardian(): ?bool
    {
        return $this->guardian;
    }

    public function setGuardian(bool $guardian): self
    {
        $this->guardian = $guardian;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function isPayment(): ?bool
    {
        return $this->payment;
    }

    public function setPayment(?bool $payment): self
    {
        $this->payment = $payment;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function setEvent(?Event $event): static
    {
        $this->event = $event;

        return $this;
    }

    /**
     * @return Collection<int, Ticket>
     */
    public function getTickets(): Collection
    {
        return $this->tickets;
    }

    public function addTicket(Ticket $ticket): static
    {
        if (!$this->tickets->contains($ticket)) {
            $this->tickets->add($ticket);
            $ticket->setParticipant($this);
        }

        return $this;
    }

    public function removeTicket(Ticket $ticket): static
    {
        if ($this->tickets->removeElement($ticket)) {
            if ($ticket->getParticipant() === $this) {
                $ticket->setParticipant(null);
            }
        }

        return $this;
    }

    public function __toString(): string
    {
        return $this->Firstname. ' ' .$this->Lastname;
    }

    public function LogisticInformation(): ?LogisticInformation
    {
        return $this->logisticInformation;
    }

    public function setLogisticInformation(?LogisticInformation $logisticInformation): static
    {
        // unset the owning side of the relation if necessary
        if ($logisticInformation === null && $this->logisticInformation !== null) {
            $this->logisticInformation->setParticipant(null);
        }

        // set the owning side of the relation if necessary
        if ($logisticInformation !== null && $logisticInformation->getParticipant() !== $this) {
            $logisticInformation->setParticipant($this);
        }

        $this->logisticInformation = $logisticInformation;

        return $this;
    }

    public function isNeedLogistic(): ?bool
    {
        return $this->needLogistic;
    }

    public function setNeedLogistic(bool $needLogistic): static
    {
        $this->needLogistic = $needLogistic;

        return $this;
    }
}
