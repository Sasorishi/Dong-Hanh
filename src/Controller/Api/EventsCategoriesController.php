<?php

namespace App\Controller\Api;

use App\Repository\EventCategoriesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class EventsCategoriesController extends AbstractController
{
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
