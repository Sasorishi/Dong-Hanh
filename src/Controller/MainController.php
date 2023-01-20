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
use App\Entity\Participant;
use App\Service\StripePaymentService;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index()
    {
        return $this->render('home.html.twig');
    }

    #[Route('/register_form', name: 'app_register')]
    public function register(Request $request, ManagerRegistry $doctrine, StripePaymentService $stripe)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        if ($request->isMethod('POST')) {
            $participant = new Participant;
            $participant
            ->setFirstname($request->request->get("firstname"))
            ->setLastname($request->request->get("lastname"))
            ->setEmail($request->request->get("email"))
            ->setPhone($request->request->get("phone"))
            ->setAddress($request->request->get("address"))
            ->setState($request->request->get("state"))
            ->setGender($request->request->get("gender"))
            ->setAge($request->request->get("age"))
            ->setExpectations($request->request->get("expectations"))
            ->setAware($request->request->get("aware"))
            ->setHealthcare($request->request->get("healthcare"))
            ->setWaiver($request->request->get("waiver"))
            ->setGuardian($request->request->get("guardian"));

            $sessionCreated = $stripe->checkout();
            if(filter_var($sessionCreated, FILTER_VALIDATE_URL) !== FALSE) {
                $entityManager = $doctrine->getManager();
                $entityManager->persist($participant);
                $entityManager->flush();
                return $this->redirect($sessionCreated);
            } else {
                $this->redirectToRoute('app_cancel');
            }
        }
        
        return $this->render('register.html.twig');
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

    #[Route('/success', name: 'app_success')]
    public function success()
    {
        return $this->render('success.html.twig');
    }

    #[Route('/cancel', name: 'app_cancel')]
    public function cancel()
    {
        return $this->render('cancel.html.twig');
    }
}
