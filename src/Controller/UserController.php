<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Carbon\Carbon;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/api/users/getUsers', methods: 'GET')]
    public function getEvents(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();

        $data = [];
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'password_request' => Carbon::parse($user->getPasswordRequestAt())->format('d/m/Y'),
                'created_at' => Carbon::parse($user->getCreateAt())->format('d/m/Y'),
            ];
        }

        return new JsonResponse(['users' =>  $data]);
    }
}
