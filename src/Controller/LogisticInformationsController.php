<?php

namespace App\Controller;

use App\Entity\LogisticInformation;
use App\Repository\LogisticInformationRepository;
use App\Repository\ParticipantRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogisticInformationsController extends AbstractController
{
    private $logisticInformationRepository;
    private $participantRepository;

    public function __construct(LogisticInformationRepository $logisticInformationRepository, ParticipantRepository $participantRepository)
    {
        $this->logisticInformationRepository = $logisticInformationRepository;
        $this->participantRepository = $participantRepository;
    }

    #[Route('/register/logistic')]
    public function registerLogisticCases(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('/register/logistic_informations')]
    public function registerLogisticInformations(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('/account/events/{eventId}/logistics_informations/{orderId}')]
    public function userLogisticsInformations(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('/api/user/events/{eventId}/getLogisticsInformations/{orderId}', methods: ['GET'])]
    public function getLogisticsData(int $eventId, string $orderId): JsonResponse
    {
        $userId = $this->getUser()->getId();
        $logisticData = $this->logisticInformationRepository->findGroupedTicketsByUserAndEvent($userId, $eventId, $orderId);

        if (empty($logisticData)) {
            return new JsonResponse(['logisticData' =>  null], Response::HTTP_OK);
        }

        return new JsonResponse(['logisticData' => $logisticData], Response::HTTP_OK);
    }

    #[Route('/api/user/events/{eventId}/updateLogisticsInformations', methods: ['POST'])]
    public function updateLogisticsData(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['logisticsData'])) {
            return new JsonResponse(['error' => "No update"], Response::HTTP_NOT_FOUND);
        }

        foreach ($data['logisticsData'] as $logisticData) {
            $id = $logisticData['id'];
            $logisticInformation = $this->logisticInformationRepository->find(["id" => $id]);

            if (!$logisticInformation) {
                throw $this->createNotFoundException(
                    'No logistic information found for id '.$logisticData->id
                );
            }

            $this->logisticInformationRepository->updateLogisticInformation($logisticInformation, $logisticData);
        }

        return new JsonResponse(['logisticData' => "Logistics updated"], Response::HTTP_OK);
    }

    #[Route('/api/user/events/{eventId}/createLogisticsInformations', methods: ['POST'])]
    public function createLogisticsData(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        dump($data);

        if (empty($data['logisticsData'])) {
            return new JsonResponse(['error' => "No update"], Response::HTTP_NOT_FOUND);
        }

        foreach ($data['logisticsData'] as $key => $logisticData) {
            dump($key);
            $participant = $this->participantRepository->find(["id" => $data['ticketsData'][$key]['participant_id']]);

            $dataFormatted = [
                'arrivalTransportType' => $logisticData['arrival_transport'],
                'arrivalDatetime' => $logisticData['arrival_datetime'],
                'arrivalAirline' => $logisticData['arrival_airline'],
                'arrivalFlightNumber' => $logisticData['arrival_flight_number'],
                'departureTransportType' => $logisticData['departure_transport'],
                'departureDatetime' => $logisticData['departure_datetime'],
                'departureAirline' => $logisticData['departure_airline'],
                'departureFlightNumber' => $logisticData['departure_flight_number'],
                'comments' => $logisticData['comments'],
            ];

            $this->logisticInformationRepository->createLogisticInformation($dataFormatted, $participant);
        }

        return new JsonResponse(['logisticData' => "Logistics updated"], Response::HTTP_OK);
    }
}
