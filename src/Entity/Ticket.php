<?php

namespace App\Entity;

use App\Repository\TicketRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TicketRepository::class)]
class Ticket
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $price = null;

    #[ORM\ManyToOne(inversedBy: 'tickets')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Event $idEvent = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $createTime = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updateTime = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $status = null;

    #[ORM\Column(length: 15)]
    private ?string $currency = null;

    #[ORM\Column(length: 255)]
    private ?string $orderId = null;

    #[ORM\Column(length: 255)]
    private ?string $captureId = null;

    #[ORM\Column(length: 255)]
    private ?string $participant = null;

    #[ORM\Column(nullable: true)]
    private ?bool $scan = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(?int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getIdEvent(): ?Event
    {
        return $this->idEvent;
    }

    public function setIdEvent(?Event $idEvent): self
    {
        $this->idEvent = $idEvent;

        return $this;
    }

    public function getCreateTime(): ?\DateTimeInterface
    {
        return $this->createTime;
    }

    public function setCreateTime(\DateTimeInterface $createTime): self
    {
        $this->createTime = $createTime;

        return $this;
    }

    public function getUpdateTime(): ?\DateTimeInterface
    {
        return $this->updateTime;
    }

    public function setUpdateTime(?\DateTimeInterface $updateTime): self
    {
        $this->updateTime = $updateTime;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): self
    {
        $this->currency = $currency;

        return $this;
    }

    public function getOrderId(): ?string
    {
        return $this->orderId;
    }

    public function setOrderId(string $orderId): self
    {
        $this->orderId = $orderId;

        return $this;
    }

    public function getCaptureId(): ?string
    {
        return $this->captureId;
    }

    public function setCaptureId(string $captureId): self
    {
        $this->captureId = $captureId;

        return $this;
    }

    public function getParticipant(): ?string
    {
        return $this->participant;
    }

    public function setParticipant(string $participant): self
    {
        $this->participant = $participant;

        return $this;
    }

    public function isScan(): ?bool
    {
        return $this->scan;
    }

    public function setScan(?bool $scan): self
    {
        $this->scan = $scan;

        return $this;
    }
}
