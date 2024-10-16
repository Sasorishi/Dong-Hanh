<?php

namespace App\Repository;

use App\Entity\LogisticInformation;
use App\Entity\Participant;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LogisticInformation>
 *
 * @method LogisticInformation|null find($id, $lockMode = null, $lockVersion = null)
 * @method LogisticInformation|null findOneBy(array $criteria, array $orderBy = null)
 * @method LogisticInformation[]    findAll()
 * @method LogisticInformation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LogisticInformationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, entityClass: LogisticInformation::class);
    }

//    /**
//     * @return LogisticInformation[] Returns an array of LogisticInformation objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?LogisticInformation
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    public function createLogisticInformation(array $data, Participant $participant): LogisticInformation
    {
        dump($data);
        $logisticInformation = new LogisticInformation();
        $logisticInformation->setParticipant($participant);
        $logisticInformation->setArrivalTransport($data['arrivalTransportType']);
        $logisticInformation->setArrivalDatetime(DateTime::createFromFormat('Y-m-d\TH:i', $data['arrivalDatetime']));
        $logisticInformation->setArrivalAirline($data['arrivalAirline']);
        $logisticInformation->setArrivalFlightNumber($data['arrivalFlightNumber']);
        $logisticInformation->setDepartureTransport($data['departureTransportType']);
        $logisticInformation->setDepartureDatetime(DateTime::createFromFormat('Y-m-d\TH:i', $data['departureDatetime']));
        $logisticInformation->setDepartureAirline($data['departureAirline']);
        $logisticInformation->setDepartureFlightNumber($data['departureFlightNumber']);
        $logisticInformation->setComments($data['comments']);
        $logisticInformation->setCreateAt(new \DateTimeImmutable());

        $this->getEntityManager()->persist($logisticInformation);
        $this->getEntityManager()->flush();

        return $logisticInformation;
    }
}
