<?php

namespace App\Controller;

use App\Repository\DiscountVoucherRepository;
use App\Repository\EventRepository;
use App\Repository\ParticipantRepository;
use App\Repository\TicketRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
    }

    #[Route('/register/{eventId}/{tickets}', name: 'app_register_form')]
    public function index(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('api/register', name: 'api_registration', methods: ['POST'])]
    public function setRegister(Request $request, EventRepository $eventRepository, ParticipantRepository $participantRepository, TicketRepository $ticketRepository, UserRepository $userRepository, DiscountVoucherRepository $discountVoucherRepository): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
        
            if (!isset($data['eventId']) || !isset($data['participants']) || !isset($data['details']) || !isset($data['captureId'])) {
                throw new \InvalidArgumentException("Données invalides");
            }
            
            $participants = $data['participants'];
            $details = $data['details'];
            $captureId = $data['captureId'];
            $event = $eventRepository->find($data['eventId']);
            $user = $userRepository->find($this->getUser()->getId());
            $discountCode = $data['discountCode'];
            $priceAfterDiscount = $data['discountCode'];
            
            $this->entityManager->getConnection()->beginTransaction();

            $vouche = $discountVoucherRepository->findOneBy(['code' => $discountCode]);
            dump($vouche);
            $discountVoucherRepository->setUsed($vouche, $user);
            
            foreach ($participants as $key => $participantData) {
                $newParticipant = $participantRepository->createParticipant($participantData, $event);
                $ticketRepository->createTicket($event, $details, $captureId, $newParticipant, $user, $priceAfterDiscount);
            }

            $this->entityManager->getConnection()->commit();
    
            return new JsonResponse(['message' => 'Enregistrement réussi !'], Response::HTTP_OK);
        } catch (Exception $e) {
            $this->entityManager->getConnection()->rollback();
            error_log("Error on create participants : " . $e->getMessage());
            return new JsonResponse(['error' => 'Error on create participants. Try again.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
