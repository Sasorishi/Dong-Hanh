<?php

namespace App\Repository;

use App\Entity\Event;
use App\Entity\Participant;
use App\Entity\Ticket;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Uuid;

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

//    /**
//     * @return Ticket[] Returns an array of Ticket objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Ticket
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    public function createTicket(Event $eventData, array $details, string $captureId, Participant $participant, User $user): void {
        $ticket = new Ticket;
        $ticket->setPrice($eventData->getPrice()[0]);
        $ticket->setStatus($details['status']);
        $ticket->setCurrency($eventData->getCurrency());
        $ticket->setCreatedAt(new DateTime());
        $ticket->setUpdatedAt(new DateTime());
        $ticket->setCaptureId($captureId);
        $ticket->setOrderId($details['id']);
        $ticket->setParticipant($participant);
        $ticket->setEvent($eventData);
        $ticket->setScan(false);
        $ticket->setUser($user);

        $entityManager = $this->getEntityManager();
        $entityManager->persist($ticket);
        $entityManager->flush();
    }

    /**
     * @return Ticket[]
     */
    public function findGroupedTicketsByUser($userId): array
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
}
