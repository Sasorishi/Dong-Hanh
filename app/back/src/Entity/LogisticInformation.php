<?php

namespace App\Entity;

use App\Repository\LogisticInformationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LogisticInformationRepository::class)]
class LogisticInformation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    
    #[ORM\Column(length: 40)]
    private ?string $ArrivalTransport = null;
    
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $arrivalDatetime = null;
    
    #[ORM\Column(length: 80, nullable: true)]
    private ?string $ArrivalAirline = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $ArrivalFlightNumber = null;
    
    #[ORM\Column(length: 80, nullable: true)]
    private ?string $DepartureTransport = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $departureDatetime = null;
    
    #[ORM\Column(length: 80, nullable: true)]
    private ?string $DepartureAirline = null;
    
    #[ORM\Column(length: 20, nullable: true)]
    private ?string $DepartureFlightNumber = null;
    
    #[ORM\OneToOne(inversedBy: 'logisticInformation', cascade: ['persist', 'remove'])]
    private ?Participant $participant = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $Comments = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $CreateAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArrivalDatetime(): ?\DateTimeInterface
    {
        return $this->arrivalDatetime;
    }

    public function setArrivalDatetime(\DateTimeInterface $arrivalDatetime): static
    {
        $this->arrivalDatetime = $arrivalDatetime;
        
        return $this;
    }
    
    public function getArrivalTransport(): ?string
    {
        return $this->ArrivalTransport;
    }
    
    public function setArrivalTransport(string $ArrivalTransport): static
    {
        $this->ArrivalTransport = $ArrivalTransport;
        
        return $this;
    }
    
    public function getArrivalAirline(): ?string
    {
        return $this->ArrivalAirline;
    }
    
    public function setArrivalAirline(?string $ArrivalAirline): static
    {
        $this->ArrivalAirline = $ArrivalAirline;
        
        return $this;
    }
    
    public function getArrivalFlightNumber(): ?string
    {
        return $this->ArrivalFlightNumber;
    }
    
    public function setArrivalFlightNumber(?string $ArrivalFlightNumber): static
    {
        $this->ArrivalFlightNumber = $ArrivalFlightNumber;
        
        return $this;
    }

    public function getDepartureTransport(): ?string
    {
        return $this->DepartureTransport;
    }

    public function setDepartureTransport(?string $DepartureTransport): static
    {
        $this->DepartureTransport = $DepartureTransport;
        
        return $this;
    }

    public function getDepartureDatetime(): ?\DateTimeInterface
    {
        return $this->departureDatetime;
    }

    public function setDepartureDatetime(\DateTimeInterface $departureDatetime): static
    {
        $this->departureDatetime = $departureDatetime;

        return $this;
    }

    public function getDepartureAirline(): ?string
    {
        return $this->DepartureAirline;
    }
    
    public function setDepartureAirline(?string $DepartureAirline): static
    {
        $this->DepartureAirline = $DepartureAirline;
        
        return $this;
    }
    
    public function getDepartureFlightNumber(): ?string
    {
        return $this->DepartureFlightNumber;
    }
    
    public function setDepartureFlightNumber(?string $DepartureFlightNumber): static
    {
        $this->DepartureFlightNumber = $DepartureFlightNumber;
        
        return $this;
    }
    
    public function getParticipant(): ?Participant
    {
        return $this->participant;
    }
    
    public function setParticipant(?Participant $participant): static
    {
        $this->participant = $participant;
        
        return $this;
    }
    public function getComments(): ?string
    {
        return $this->Comments;
    }
    
    public function setComments(?string $Comments): static
    {
        $this->Comments = $Comments;
        
        return $this;
    }

    public function getCreateAt(): ?\DateTimeImmutable
    {
        return $this->CreateAt;
    }

    public function setCreateAt(\DateTimeImmutable $CreateAt): static
    {
        $this->CreateAt = $CreateAt;

        return $this;
    }
}
