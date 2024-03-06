<?php

namespace App\Controller;

use App\Repository\EventCategoriesRepository;
use App\Repository\EventRepository;
use Carbon\Carbon;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EventsCategoriesController extends AbstractController
{
    #[Route('/events/categories', name: 'app_events_categories')]
    public function index(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'EventsCategoriesController',
        ]);
    }

    #[Route('/api/events/getCategories', methods: 'GET')]
    public function getEventsCategories(EventCategoriesRepository $eventCategoriesRepository): JsonResponse
    {
        $eventsCategories = $eventCategoriesRepository->findAll();

        $data = [];
        foreach ($eventsCategories as $category) {
            $data[] = [
                'id' => $category->getId(),
                'label' => $category->getLabel(),
            ];
        }

        return new JsonResponse(['categories' =>  $data]);
    }
}
