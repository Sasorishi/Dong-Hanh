<?php

namespace App\Controller;

use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EventsController extends AbstractController
{
    #[Route('/events', name: 'app_events')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'EventsController',
        ]);
    }

    #[Route('/api/events/getEvents', methods: 'GET')]
    public function getEvents(EventRepository $eventRepository): JsonResponse
    {
        $events = $eventRepository->findAll();
        dump($events);

        $data = [];
        foreach ($events as $event) {
            $data[] = [
                'id' => $event->getId(),
                'name' => $event->getLabel(),
                'description' => $event->getDescription(),
                'dateStart' => $event->getDateStart(),
                'dateEnd' => $event->getDateEnd(),
                'year' => $event->getYear(),
                'price' => $event->getPrice(),
                'currency' => $event->getCurrency(),
                'place' => $event->getPlace(),
                'location' => $event->getLocation(),
                'features' => $event->getFeatures(),
                'eventCategory' => $event->getEventCategory()->getLabel(),
            ];
        }

        return new JsonResponse(['events' =>  $data]);
    }
}
