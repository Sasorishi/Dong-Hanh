<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardRoutesController extends AbstractController
{
    #[Route('/admin/login')]
    public function login(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }

    #[Route('/admin/dashboard')]
    public function dashboard(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }

    #[Route('/admin/events')]
    public function events(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }

    #[Route('/admin/events/{id}')]
    public function event(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }

    #[Route('/admin/events/{id}/participants')]
    public function eventParticipants(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        return $this->render('index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }

    #[Route('/admin/tickets')]
    public function tickets(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }

    #[Route('/admin/users')]
    public function users(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }

    #[Route('/admin/tickets/create')]
    public function ticketCreate(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);
    }
}
