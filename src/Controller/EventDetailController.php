<?php

namespace App\Controller;

use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class EventDetailController extends AbstractController
{
    #[Route('/events/{id}', name: 'app_event_detail')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'EventDetailController',
        ]);
    }

    #[Route('/api/events/{id}/getData', name: 'api_event_data')]
    public function getEventData(EventRepository $eventRepository, SerializerInterface $serializer, int $id): JsonResponse
    {
        $event = $eventRepository->find($id);
        $data = $serializer->serialize($event, 'json');
        return new JsonResponse(['event' => $data]);
    }
}
