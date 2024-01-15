<?php

namespace App\Controller;

use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
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

        if (!$event) {
            return new JsonResponse(['error' => 'Event not found'], 404);
        }

        $event = [
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

        // // Use serialization groups or MaxDepth to handle circular references
        // $data = $serializer->serialize(
        //     $event,
        //     'json',
        //     [
        //         AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object) {
        //             return $object->getId();
        //         },
        //         // You can also use serialization groups:
        //         // 'groups' => ['your_serialization_group']
        //     ]
        // );

        // You can also decode the JSON string to ensure it's valid
        // $decodedData = json_decode($data, true);

        return new JsonResponse(['event' => $event]);
    }
}
