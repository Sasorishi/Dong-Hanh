<?php

namespace App\Controller;

use App\Repository\TicketRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TicketController extends AbstractController
{
    private $ticketRepository;

    public function __construct(TicketRepository $ticketRepository)
    {
        $this->ticketRepository = $ticketRepository;
    }

    #[Route('/ticket', name: 'app_ticket')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'TicketController',
        ]);
    }

    #[Route('/api/user/tickets', name: 'api_tickets_user', methods: ['GET'])]
    public function getTicketsbyUser(): JsonResponse {
        $userId = $this->getUser()->getId();
        dump($userId);
        $tickets = $this->ticketRepository->findBy(["user" => $userId], ["created_at" => "DESC"]);
        dump($tickets);

        if (!$tickets) {
            return new JsonResponse(['tickets' =>  false]);
        }

        return new JsonResponse(['tickets' =>  $tickets]);
    }
}
