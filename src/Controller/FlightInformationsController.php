<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FlightInformationsController extends AbstractController
{
    #[Route('/register/logistic_informations', name: 'app_register_logistic_informations')]
    public function index(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('/register/logistic_informations/flight_infomrations', name: 'app_register_flight_informations')]
    public function flightInformation(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }
}
