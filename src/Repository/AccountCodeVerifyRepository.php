<?php

namespace App\Repository;

use App\Entity\AccountCodeVerify;
use App\Entity\User;
use App\Service\AccountVerifyService;
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
    private $accountVerifyService;

    public function __construct(ManagerRegistry $registry, AccountVerifyService $accountVerifyService)
    {
        parent::__construct($registry, AccountCodeVerify::class);
        $this->accountVerifyService = $accountVerifyService;
    }

    public function save(AccountCodeVerify $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function createAccountCodeVerify(string $code, User $user): ?AccountCodeVerify
    {
        $accountCodeVerify = new AccountCodeVerify;
        $accountCodeVerify->setUser($user);
        $accountCodeVerify->setCode($code);
        $dateTime = $this->accountVerifyService->setTimeExpired("+10 minutes");
        $accountCodeVerify->setExpiredAt($dateTime);

        $this->save($accountCodeVerify, true);

        return $accountCodeVerify;
    }

    public function refreshAccountCodeVerify(string $code, string $userId): ?AccountCodeVerify
    {
        $accountCodeVerify = $this->findOneBy(['user' => $userId]);
        $accountCodeVerify->setCode($code);
        $dateTime = $this->accountVerifyService->setTimeExpired("+10 minutes");
        $accountCodeVerify->setExpiredAt($dateTime);

        $this->save($accountCodeVerify, true);

        return $accountCodeVerify;
    }
}
