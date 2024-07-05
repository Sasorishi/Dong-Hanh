<?php

namespace App\Repository;

use App\Entity\AccountCodeVerify;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AccountCodeVerify>
 *
 * @method AccountCodeVerify|null find($id, $lockMode = null, $lockVersion = null)
 * @method AccountCodeVerify|null findOneBy(array $criteria, array $orderBy = null)
 * @method AccountCodeVerify[]    findAll()
 * @method AccountCodeVerify[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AccountCodeVerifyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AccountCodeVerify::class);
    }

//    /**
//     * @return AccountCodeVerify[] Returns an array of AccountCodeVerify objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?AccountCodeVerify
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
