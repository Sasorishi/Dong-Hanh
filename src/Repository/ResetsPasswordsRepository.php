<?php

namespace App\Repository;

use App\Entity\ResetsPasswords;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ResetsPasswords>
 *
 * @method ResetsPasswords|null find($id, $lockMode = null, $lockVersion = null)
 * @method ResetsPasswords|null findOneBy(array $criteria, array $orderBy = null)
 * @method ResetsPasswords[]    findAll()
 * @method ResetsPasswords[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ResetsPasswordsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResetsPasswords::class);
    }

    public function save(ResetsPasswords $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ResetsPasswords $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param User $user
     * @param string $token
     * @return void
     */
    public function generateNewRequestTokenPassword(User $user, string $token): void {
        $resetPassword = new ResetsPasswords;
        $resetPassword->setUser($user);
        $resetPassword->setToken($token);
        $resetPassword->setExpiredAt(new DateTime('+1 hour'));
        $this->save($resetPassword, true);
    }
}
