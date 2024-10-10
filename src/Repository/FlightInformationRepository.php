<?php

namespace App\Repository;

use App\Entity\FlightInformation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FlightInformation>
 *
 * @method FlightInformation|null find($id, $lockMode = null, $lockVersion = null)
 * @method FlightInformation|null findOneBy(array $criteria, array $orderBy = null)
 * @method FlightInformation[]    findAll()
 * @method FlightInformation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FlightInformationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FlightInformation::class);
    }

//    /**
//     * @return FlightInformation[] Returns an array of FlightInformation objects
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

//    public function findOneBySomeField($value): ?FlightInformation
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
