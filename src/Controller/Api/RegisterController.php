<?php

namespace App\Controller\Api;

use App\Repository\DiscountVoucherRepository;
use App\Repository\EventRepository;
use App\Repository\LogisticInformationRepository;
use App\Repository\ParticipantRepository;
use App\Repository\TicketRepository;
use App\Repository\UserRepository;
use App\Service\MailerService;
use App\Service\QrcodeService;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    private $entityManager;
    private $mailerService;
    private $params;
    private $qrcodeService;

    public function __construct(EntityManagerInterface $entityManager, MailerService $mailerService, ParameterBagInterface $params,  QrcodeService $qrcodeService) {
        $this->entityManager = $entityManager;
        $this->mailerService = $mailerService;
        $this->params = $params;
        $this->qrcodeService = $qrcodeService;
    }

    #[Route('api/register/private', name: 'api_registration_private', methods: ['POST'])]
    public function setRegisterPrivate(Request $request, EventRepository $eventRepository, ParticipantRepository $participantRepository, TicketRepository $ticketRepository, UserRepository $userRepository, DiscountVoucherRepository $discountVoucherRepository, LogisticInformationRepository $logisticInformationRepository): JsonResponse
    {
        $mail = $this->params->get("app.mail_address");
        $participantsTickets = [];

        try {
            $data = json_decode($request->getContent(), true);
        
            if (!isset($data['eventId']) || !isset($data['participants']) || !isset($data['details']) || !isset($data['captureId'])) {
                throw new \InvalidArgumentException("Données invalides");
            }

            $participants = $data['participants'];
            $logisticsInformations = $data['logisticsInformations'] ?? [];
            $logisticCase = $data['logisticCase'];
            $details = $data['details'];
            $captureId = $data['captureId'];
            $event = $eventRepository->find($data['eventId']);
            $user = $userRepository->find($this->getUser()->getId());
            $price = $data['price'];
            
            $this->entityManager->getConnection()->beginTransaction();

            foreach ($participants as $participantKey => $participantData) {
                $newParticipant = $participantRepository->createParticipant($participantData, $event, $logisticCase);

                if ($logisticCase == "logisticInformation" && !empty($logisticsInformations)) {
                    foreach ($logisticsInformations as $logisticKey => $logisticInformation) {
                        if ($logisticKey == $participantKey) {
                            $logisticInformationRepository->createLogisticInformation($logisticInformation, $newParticipant);
                        }
                    }
                }

                $newTicket = $ticketRepository->createTicket($event, $details, $captureId, $newParticipant, $user, $price);
                $newParticipantTicket = [
                    'participant_id' => $newParticipant->getId(),
                    'participant_name' => $newParticipant->getFirstname() . ' ' . $newParticipant->getLastname(),
                    'ticket_price' => $price,
                    'qrcode' => $this->qrcodeService->generate($newTicket->getId(), $newParticipant->getId(), $event->getId()),
                ];
                array_push($participantsTickets, $newParticipantTicket);
            }

            $this->entityManager->getConnection()->commit();

            $context = [
                'user_id' => $user->getId(),
                'user_email' => $user->getEmail(),
                'event_name' => $event->getLabel(),
                'currency' => $event->getCurrency(),
                'order_id' => $details['id'],
                'tickets' => $participantsTickets,
                'amount' => $price * count($participants),
                'date' => new \DateTime(),
                'current_year' => new \DateTime('Y')
            ];
            $this->mailerService->sendTemplateEmail($mail, $user->getEmail(), "Thank you for your payment", 'emails/payment.html.twig', $context);

            return new JsonResponse(['message' => 'Enregistrement réussi !'], Response::HTTP_OK);
        } catch (Exception $e) {
            if ($this->entityManager->getConnection()->isTransactionActive()) {
                $this->entityManager->getConnection()->rollback();
            }
            error_log("Error on create participants : " . $e->getMessage());
            return new JsonResponse(['error' => 'Error on create participants. Try again.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('api/register/public', name: 'api_registration_public', methods: ['POST'])]
    public function setRegisterPublic(Request $request, EventRepository $eventRepository, ParticipantRepository $participantRepository, TicketRepository $ticketRepository, UserRepository $userRepository): JsonResponse
    {
        $mail = $this->params->get("app.mail_address");
        $participantsTickets = [];

        try {
            $data = json_decode($request->getContent(), true);
        
            if (!isset($data['eventId']) || !isset($data['participants'])) {
                throw new \InvalidArgumentException("Données invalides");
            }

            $participants = $data['participants'];
            $event = $eventRepository->find($data['eventId']);
            $user = $userRepository->find($this->getUser()->getId());
            
            $this->entityManager->getConnection()->beginTransaction();

            foreach ($participants as $participantKey => $participantData) {
                $newParticipant = $participantRepository->createParticipant($participantData, $event, "notBooked");
                $newParticipantTicket = [
                    'participant_id' => $newParticipant->getId(),
                    'participant_name' => $newParticipant->getFirstname() . ' ' . $newParticipant->getLastname(),
                ];
                array_push($participantsTickets, $newParticipantTicket);
            }

            $this->entityManager->getConnection()->commit();

            $context = [
                'user_id' => $user->getId(),
                'user_email' => $user->getEmail(),
                'event_name' => $event->getLabel(),
                'tickets' => $participantsTickets,
                'date' => new \DateTime(),
                'current_year' => new \DateTime('Y')
            ];
            $test = $this->mailerService->sendTemplateEmail($mail, $user->getEmail(), "Thank you for your registration", 'emails/registration_public.html.twig', $context);
            dump($test);

            return new JsonResponse(['message' => 'Enregistrement réussi !'], Response::HTTP_OK);
        } catch (Exception $e) {
            if ($this->entityManager->getConnection()->isTransactionActive()) {
                $this->entityManager->getConnection()->rollback();
            }
            error_log("Error on create participants : " . $e->getMessage());
            return new JsonResponse(['error' => 'Error on create participants. Try again.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
