<?php

namespace App\Repository;

use App\Entity\EventCategories;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<EventCategories>
 *
 * @method EventCategories|null find($id, $lockMode = null, $lockVersion = null)
 * @method EventCategories|null findOneBy(array $criteria, array $orderBy = null)
 * @method EventCategories[]    findAll()
 * @method EventCategories[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EventCategoriesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EventCategories::class);
    }

//    /**
//     * @return EventCategories[] Returns an array of EventCategories objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?EventCategories
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
