<?php

namespace App\Repository;

use App\Entity\Event;
use App\Entity\Participant;
use App\Entity\StaffMember;
use App\Entity\Ticket;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Ticket>
 *
 * @method Ticket|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ticket|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ticket[]    findAll()
 * @method Ticket[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TicketRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ticket::class);
    }

    public function save(Ticket $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Ticket $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function createTicket(Event $eventData, ?array $details, ?string $captureId, ?Participant $participant, User $user, ?int $price, ?StaffMember $staff = null): Ticket {
        $ticket = new Ticket;
        $ticket->setPrice($price ?? null);
        $ticket->setStatus($staff && $staff->isPayment() == false ? 'COMPLETED' : $details['status']);
        $ticket->setCurrency($eventData->getCurrency());
        $ticket->setCreatedAt(new DateTime());
        $ticket->setUpdatedAt(new DateTime());
        $ticket->setCaptureId($staff ? 'STAFFPASS' : $captureId);
        $ticket->setOrderId($staff ? 'STAFFPASS' : $details['id']);
        $ticket->setParticipant($participant ?? null);
        $ticket->setStaffMember($staff ?? null);
        $ticket->setEvent($eventData);
        $ticket->setScan(false);
        $ticket->setUser($user);

        $entityManager = $this->getEntityManager();
        $entityManager->persist($ticket);
        $entityManager->flush();

        return $ticket;
    }

    /**
     * @param string $userId
     * @return Ticket[]
     */
    public function findGroupedTicketsByUser(string $userId): array
    {
        $binaryUserId = hex2bin(str_replace('-', '', $userId));
        $queryBuilder = $this->createQueryBuilder('t')
            ->select('t', 'e', 'p', 'u', 'ec')
            ->leftJoin('t.event', 'e')
            ->leftJoin('t.participant', 'p')
            ->leftJoin('t.user', 'u')
            ->leftJoin('e.eventCategory', 'ec')
            ->andWhere('u.id = :userId')
            ->setParameter('userId', $binaryUserId)
            ->orderBy('t.created_at', 'DESC');

        $tickets = $queryBuilder->getQuery()->getResult();
        return $tickets;
    }

    /**
     * @param Ticket $ticket
     * @return void
     */
    public function scanTicket(Ticket $ticket): void {
        $ticket->setScan(true);
        $entityManager = $this->getEntityManager();
        $entityManager->flush();
    }
}
