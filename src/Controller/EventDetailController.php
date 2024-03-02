<?php

namespace App\Controller;

use App\Repository\EventCategoriesRepository;
use App\Repository\EventRepository;
use Carbon\Carbon;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
    public function getEventData(EventRepository $eventRepository, int $id): JsonResponse
    {
        $event = $eventRepository->find($id);

        if (!$event) {
            return new JsonResponse(['error' => 'Event not found'], 404);
        }

        $event = [
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
            'eventCategoryId' => $event->getEventCategory()->getId(),
            'eventCategory' => $event->getEventCategory()->getLabel(),
            'isRegistrable' => $event->isRegister(),
            'images' => $event->getImages(),
        ];

        return new JsonResponse(['event' => $event]);
    }

    #[Route('/api/eventCategories', name: 'api_event_categories')]
    public function getEventCategories(EventCategoriesRepository $eventCategoriesRepository): JsonResponse
    {
        $categories = $eventCategoriesRepository->findAll();

        $categoriesArray = [];

        foreach ($categories as $category) {
            $categoriesArray[] = [
                'id' => $category->getId(),
                'label' => $category->getLabel(),
            ];
        }

        return new JsonResponse(['categories' => $categoriesArray]);
    }

    #[Route('/api/events/{id}/edit', name: 'api_event_data_edit', methods: ['POST'])]
    public function editEventData(Request $request, EventRepository $eventRepository, EventCategoriesRepository $eventCategoriesRepository, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $event = $eventRepository->find($id);
        $category = $eventCategoriesRepository->findOneBy(["label" => $data['category']]);

        if (!$event) {
            return new JsonResponse(['error' => 'Event not found'], 404);
        }

        $eventRepository->editEventData($event, $category, $request);

        return new JsonResponse(['message' => 'Enregistrement réussi !']);
    }

    #[Route('/api/events/{id}/participants', name: 'api_event_data_participant', methods: ['GET'])]
    public function getEventParticipants(EventRepository $eventRepository, int $id): JsonResponse
    {
        $event = $eventRepository->find($id);

        if (!$event) {
            return new JsonResponse(['error' => 'Event not found'], 404);
        }

        $data = $eventRepository->getParticipants($event);
        $participants = [];

        foreach ($data as $participant) {
            $participants[] = [
                "lastname" => $participant->getLastname(),
                "firstname" => $participant->getFirstname(),
                "email" => $participant->getEmail(),
                "phone" => $participant->getPhone(),
                "gender" => $participant->getGender(),
                "country" => $participant->getCountry(),
                "payment" => $participant->isPayment(),
                "created_at" => Carbon::parse($participant->getCreatedAt())->format('d/m/Y'),
            ];
        }

        return new JsonResponse(['participants' => $participants]);
    }
}
