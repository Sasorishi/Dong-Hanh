<?php

namespace App\Controller;

use App\Repository\EventRepository;
use Carbon\Carbon;
use DateTime;
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

        $data = [];
        foreach ($events as $event) {
            $data[] = [
                'id' => $event->getId(),
                'name' => $event->getLabel(),
                'description' => $event->getDescription(),
                'dateStart' => Carbon::parse($event->getDateStart())->format('F jS'),
                'dateEnd' => Carbon::parse($event->getDateEnd())->format('F jS'),
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

    #[Route('/api/events/getEventsNotExpired', methods: 'GET')]
    public function getEventsNotExpired(EventRepository $eventRepository): JsonResponse
    {
        $events = $eventRepository->getEventsNotExpired();

        $data = [];
        foreach ($events as $event) {
            $data[] = [
                'id' => $event->getId(),
                'name' => $event->getLabel(),
                'description' => $event->getDescription(),
                'dateStart' => Carbon::parse($event->getDateStart())->format('F jS'),
                'dateEnd' => Carbon::parse($event->getDateEnd())->format('F jS'),
                'year' => $event->getYear(),
                'price' => $event->getPrice(),
                'currency' => $event->getCurrency(),
                'place' => $event->getPlace(),
                'location' => $event->getLocation(),
                'features' => $event->getFeatures(),
                'eventCategory' => $event->getEventCategory()->getLabel(),
                'isRegistrable' => $event->isRegister(),
            ];
        }

        return new JsonResponse(['events' =>  $data]);
    }
}
