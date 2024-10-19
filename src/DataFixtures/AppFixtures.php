<?php

namespace App\DataFixtures;

use App\Entity\EventCategories;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $this->createUserAdmin($manager);
        $this->createEventCatogories($manager);
    }

    public function createUserAdmin(ObjectManager $manager): void
    {
        $userRepository = $manager->getRepository(User::class);
        $userRepository->createUser('admin@dong-hanh.org', '123@', $this->passwordHasher, true);
    }

    public function createEventCatogories(ObjectManager $manager): void
    {
        $eventCategoryRepository = $manager->getRepository(EventCategories::class);
        $eventCategoryRepository->createEventCategory('Trai He');
        $eventCategoryRepository->createEventCategory('Formation');
        $eventCategoryRepository->createEventCategory('Human Rights Day');
        $eventCategoryRepository->createEventCategory('Social events');
    }
}
