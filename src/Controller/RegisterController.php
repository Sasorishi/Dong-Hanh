<?php

namespace App\Controller;

use App\Repository\EventRepository;
use App\Repository\ParticipantRepository;
use App\Repository\TicketRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('api/register', name: 'api_registration', methods: ['POST'])]
    public function setRegister(Request $request, EventRepository $eventRepository, ParticipantRepository $participantRepository, TicketRepository $ticketRepository, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $participants = $data['participants'];
        $details = $data['details'];
        $captureId = $data['captureId'];
        $event = $eventRepository->find($data['eventId']);
        $user = $userRepository->find($this->getUser()->getId());

        foreach ($participants as $key => $participantData) {
            if ($key === "eventId" || $key === "numTickets") {
                continue;
            }

            $newParticipant = $participantRepository->createParticipant($participantData, $event);
            $ticketRepository->createTicket($event, $details, $captureId, $newParticipant, $user);
        }

        return new JsonResponse(['message' => 'Enregistrement réussi !']);
    }
}
