<?php

namespace App\Repository;

use App\Entity\User;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function save(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param string $email
     * @param string $password
     * @param UserPasswordHasherInterface $passwordHasher
     * @return User|null
     */
    public function createUser(string $email, string $password, UserPasswordHasherInterface $passwordHasher): ?User {
        $user = new User;
        $user->setEmail($email);
        
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $user->setRoles(['ROLE_USER']);
        $user->setCreateAt(new DateTime());

        $this->save($user, true);

        return $user;
    }

    /**
     * @param User $user
     * @param string $token
     * @return void
     */
    public function generateNewRequestTokenPassword(User $user, string $token): void {
        $user->setTokenPassword($token);
        $user->setPasswordRequestAt(new DateTime);
        $this->save($user, true);
    }

    /**
     * @param User $user
     * @param UserPasswordHasherInterface $passwordHasher
     * @return void
     */
    public function resetPassword(User $user, string $password, UserPasswordHasherInterface $passwordHasher): void {
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $user->setTokenPassword(null);
        $this->save($user, true);
    }

    /**
     * @param User $user
     * @param UserPasswordHasherInterface $passwordHasher
     * @return void
     */
    public function changePassword(User $user, string $password, UserPasswordHasherInterface $passwordHasher): void {
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $this->save($user, true);
    }
}
