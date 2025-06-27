<?php

namespace App\Repository;

use App\Entity\Event;
use App\Entity\StaffMember;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StaffMember>
 */
class StaffMemberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StaffMember::class);
    }

    /**
     * Create a new staff member
     *
     * @param array $data
     * @param Event $event
     * @return StaffMember
     */
    public function createStaff(Array $data, Event $event): StaffMember {
        $staff = new StaffMember();
        
        $staff->setFirstname($data['firstName']);
        $staff->setLastname($data['lastName']);
        $staff->setGender($data['gender']);
        $staff->setAge($data['age']);
        $staff->setEmail($data['email']);
        $staff->setPhone($data['phone']);
        $staff->setCountry($data['country']);
        $staff->setPayment($data['payment']);
        $staff->setEvent($event);
        $staff->setCreatedAt(new DateTimeImmutable());
        
        $entityManager = $this->getEntityManager();
        $entityManager->persist($staff);
        $entityManager->flush();

        return $staff;
    }
}
