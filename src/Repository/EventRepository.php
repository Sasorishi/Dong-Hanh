<?php

namespace App\Repository;

use App\Entity\Event;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Event>
 *
 * @method Event|null find($id, $lockMode = null, $lockVersion = null)
 * @method Event|null findOneBy(array $criteria, array $orderBy = null)
 * @method Event[]    findAll()
 * @method Event[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }

    public function save(Event $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Event $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return array 
     */
    public function getEventsNotExpired(): array {
        $currentDateTime = new DateTime();
        $entityManager = $this->getEntityManager();

        $events = $entityManager->createQueryBuilder()
            ->select('e')
            ->from('App\Entity\Event', 'e')
            ->where('e.dateEnd > :currentDateTime')
            ->setParameter('currentDateTime', $currentDateTime)
            ->getQuery()
            ->getResult();

        return $events;
    }

    public function getNearestEvent(): ?Event
    {
        $currentDateTime = new DateTime();
        $entityManager = $this->getEntityManager();
        
        return $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->where('e.dateStart >= :currentDateTime')
            ->andWhere('e.dateEnd >= :currentDateTime')
            ->andWhere('e.register = true')
            ->setParameter('currentDateTime', $currentDateTime)
            ->orderBy('e.dateStart', 'ASC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
