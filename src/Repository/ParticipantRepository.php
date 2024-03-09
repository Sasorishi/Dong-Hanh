<?php

namespace App\Repository;

use App\Entity\Event;
use App\Entity\Participant;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Participant>
 *
 * @method Participant|null find($id, $lockMode = null, $lockVersion = null)
 * @method Participant|null findOneBy(array $criteria, array $orderBy = null)
 * @method Participant[]    findAll()
 * @method Participant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ParticipantRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Participant::class);
    }

    public function save(Participant $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Participant $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Participant[] Returns an array of Participant objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Participant
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    public function createParticipant(Array $data, Event $event): Participant {
        $participant = new Participant();
        
        $participant->setFirstname($data['firstName']);
        $participant->setLastname($data['lastName']);
        $participant->setGender($data['gender']);
        $participant->setAge($data['age']);
        $participant->setEmail($data['email']);
        $participant->setPhone($data['phone']);
        $participant->setCountry($data['country']);
        $participant->setHealthcare($data['healthcare']);
        $participant->setExpectations($data['expectation']);
        $participant->setPayment(true);
        $participant->setWaiver(true);
        $participant->setGuardian(true);
        $participant->setEvent($event);
        $participant->setCreatedAt(new DateTime());

        $entityManager = $this->getEntityManager();
        $entityManager->persist($participant);
        $entityManager->flush();

        return $participant;
    }
}
