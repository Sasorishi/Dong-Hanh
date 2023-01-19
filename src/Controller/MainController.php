<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
// use Symfony\Component\Uid\Ulid;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index()
    {
        return $this->render('home.html.twig');
    }

    #[Route('/register_form', name: 'app_register')]
    public function register(Request $request, ManagerRegistry $doctrine)
    {
        return $this->render('register.html.twig');
    }

    #[Route('/accident_waiver_and_release_of_liability_form', name: 'app_waiver')]
    public function waiver(Request $request, ManagerRegistry $doctrine)
    {
        return $this->render('terms_and_conditions/waiver.html.twig');
    }

    #[Route('/signin', name: 'app_signin')]
    public function signin(Request $request, UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine)
    {
        if ($request->isMethod('POST')) {
            // $ulid = new Ulid();
            $user = new User;
            $user->setEmail($request->request->get("email"));
            $plaintextPassword = $request->request->get("password");
            // hash the password (based on the security.yaml config for the $user class)
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $plaintextPassword
            );
            $user->setPassword($hashedPassword);
            $user->setRoles(['user']);

            $entityManager = $doctrine->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
        }

        return $this->render('signin.html.twig');
    }
}
