<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    #[Route('/register/{eventId}/{tickets}', name: 'app_register_form')]
    public function index(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('api/register/{eventId}/{tickets}', name: 'app_register', methods: 'POST')]
    public function setRegister(): Response
    {

        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('/register_form', name: 'app_register')]
    public function register(Request $request, ManagerRegistry $doctrine)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        $participantRepository = $doctrine->getRepository(Participant::class);
        $participant = $participantRepository->findOneBy(['user' => $this->getUser()->getId()]);
        $eventRepository = $doctrine->getRepository(Event::class);
        $event = $eventRepository->findOneBy(['id' => "1"]);

        if ($event->isRegister()) {
            if (!$participant) {
                $participant = NULL;
                
                if ($request->isMethod('POST')) {
                    $participant = new Participant;
                    $participant
                    ->setFirstname($request->request->get("firstname"))
                    ->setLastname($request->request->get("lastname"))
                    ->setEmail($request->request->get("email"))
                    ->setPhone($request->request->get("phone"))
                    ->setAddress($request->request->get("address"))
                    ->setCity($request->request->get("city"))
                    ->setState($request->request->get("state"))
                    ->setGender($request->request->get("gender"))
                    ->setAge($request->request->get("age"))
                    ->setExpectations($request->request->get("expectations"))
                    ->setAware($request->request->get("aware"))
                    ->setHealthcare($request->request->get("healthcare"))
                    ->setWaiver($request->request->get("waiver"))
                    ->setGuardian($request->request->get("guardian"))
                    ->setUser($this->getUser()->getId())
                    ->setDate(new \DateTime());
    
                    $entityManager = $doctrine->getManager();
                    $entityManager->persist($participant);
                    $entityManager->flush();

                    return $this->redirectToRoute('app_order');
                }
            } else {
                $ticketRepository = $doctrine->getRepository(Ticket::class);
                $ticket = $ticketRepository->findOneBy(['participant' => $participant->getId()]);

                if ($request->isMethod('POST')) {
                    $participant
                    ->setFirstname($request->request->get("firstname"))
                    ->setLastname($request->request->get("lastname"))
                    ->setEmail($request->request->get("email"))
                    ->setPhone($request->request->get("phone"))
                    ->setAddress($request->request->get("address"))
                    ->setCity($request->request->get("city"))
                    ->setState($request->request->get("state"))
                    ->setGender($request->request->get("gender"))
                    ->setAge($request->request->get("age"))
                    ->setExpectations($request->request->get("expectations"))
                    ->setAware($request->request->get("aware"))
                    ->setHealthcare($request->request->get("healthcare"))
                    ->setWaiver($request->request->get("waiver"))
                    ->setGuardian($request->request->get("guardian"));
    
                    $entityManager = $doctrine->getManager();
                    $entityManager->persist($participant);
                    $entityManager->flush();
                    
                    if ($ticket && $ticket->getStatus() == "COMPLETED") {
                        return $this->redirectToRoute('app_account');
                    } else {
                        return $this->redirectToRoute('app_order');
                    }
                }
            }
        } else {
            return $this->redirectToRoute('app_cancel', array('error' => 'register'));
        }

        
        return $this->render('payment/register.html.twig', [
            'participant' => $participant
        ]);
    }
}
