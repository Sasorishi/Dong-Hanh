<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}
