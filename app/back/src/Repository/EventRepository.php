<?php

namespace App\Repository;

use App\Entity\Event;
use App\Entity\EventCategories;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

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

    /**
     * @return Event|null
     */
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

    public function createEvent(EventCategories $eventCategory, Request $request): void {
        $data = json_decode($request->getContent(), true);
        $formatPrice = [];
        $formatPrice[] = $data['price'];

        $event = new Event;
        $event->setLabel($data['name']);
        $event->setDescription($data['description']);
        $event->setPlace($data['place']);
        $event->setLocation($data['location']);
        $event->setYear($data['year']);
        $event->setEventCategory($eventCategory);
        $event->setRegister($data['isRegistrable']);
        $event->setPrice($formatPrice);
        $event->setCurrency($data['currency']);
        $event->setDateStart(new DateTime($data['dateStart']));
        $event->setDateEnd(new DateTime($data['dateEnd']));
        $event->setRefundExpireAt(new DateTime($data['expiredRefundDate']));
        $event->setFeatures($data['features']);

        $this->save($event, true);
    }

    /**
     * @param Event $event
     * @param EventCategories $eventCategories
     * @param Request $request
     * @return array 
     */
    public function editEventData(Event $event, EventCategories $eventCategory, Request $request): void {
        $data = json_decode($request->getContent(), true);
        $formatPrice = [];
        $formatPrice[] = $data['price'];

        $event->setLabel($data['name']);
        $event->setDescription($data['description']);
        $event->setPlace($data['place']);
        $event->setLocation($data['location']);
        $event->setYear($data['year']);
        $event->setEventCategory($eventCategory);
        $event->setRegister($data['isRegistrable']);
        $event->setPrice($formatPrice);
        $event->setCurrency($data['currency']);
        $event->setDateStart(new DateTime($data['unformatDateStart']));
        $event->setDateEnd(new DateTime($data['unformatDateEnd']));
        $event->setFeatures($data['features']);

        $this->save($event, true);
    }

    /**
     * @param Event $event
     * @return Collection 
     */
    public function getParticipants(Event $event): Collection {
        return $event->getParticipants();
    }
}
