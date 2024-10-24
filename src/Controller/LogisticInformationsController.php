<?php

namespace App\Controller;

use App\Repository\LogisticInformationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LogisticInformationsController extends AbstractController
{
    private $logisticInformationRepository;

    public function __construct(LogisticInformationRepository $logisticInformationRepository)
    {
        $this->logisticInformationRepository = $logisticInformationRepository;
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

    #[Route('/account/events/{eventId}/logistics_informations')]
    public function userLogisticsInformations(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('/api/user/events/{eventId}/getLogisticsInformations', methods: ['GET'])]
    public function getEventData(int $eventId): JsonResponse
    {
        $userId = $this->getUser()->getId();
        $logisticData = $this->logisticInformationRepository->findGroupedTicketsByUserAndEvent($userId, $eventId);

        if (empty($logisticData)) {
            return new JsonResponse(['logisticData' =>  null], Response::HTTP_OK);
        }

        return new JsonResponse(['logisticData' => $logisticData], Response::HTTP_OK);
    }
}
