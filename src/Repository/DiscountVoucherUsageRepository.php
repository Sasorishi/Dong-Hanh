<?php

namespace App\Repository;

use App\Entity\DiscountVoucher;
use App\Entity\DiscountVoucherUsage;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<DiscountVoucherUsage>
 */
class DiscountVoucherUsageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DiscountVoucherUsage::class);
    }

    public function save(DiscountVoucherUsage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(DiscountVoucherUsage $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function createDiscountVoucherUsage(DiscountVoucher $voucher, User $user): DiscountVoucherUsage {
        $discountVoucherUsage = new DiscountVoucherUsage;
        $discountVoucherUsage->setDiscountVoucher($voucher);
        $discountVoucherUsage->setUser($user);
        $discountVoucherUsage->setUsedAt(new DateTimeImmutable);

        $this->save($discountVoucherUsage, true);

        return $discountVoucherUsage;
    }
}
