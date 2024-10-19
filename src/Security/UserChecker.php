<?php

namespace App\Security;

use App\Entity\User as AppUser;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user): void
    {
        // Vérifier si l'utilisateur est une instance de ton entité User
        // if (!$user instanceof AppUser) {
        //     return;
        // }

        // // Vérifier si l'utilisateur a vérifié son email
        // if (!$user->isVerified()) {
        //     throw new CustomUserMessageAccountStatusException('Please verify your email address before logging in.');
        // }
    }

    public function checkPostAuth(UserInterface $user): void
    {
        // Pas besoin de redirection ici, nous levons l'exception en PreAuth.
    }
}
