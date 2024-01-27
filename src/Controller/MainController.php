<?php

namespace App\Controller;


// use App\Service\StripePaymentService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    #[Route('/', name: 'app_main')]
    public function index(): Response
    {
        // if ($request->isMethod('GET') && $request->query->get('response') !== null) {
        //     $response = $request->query->get('response');
        //     return $this->render('index.html.twig', [
        //         'recaptcha_key' => $recaptcha->getKey(),
        //         'error' => $response
        //     ]);
        // }
        
        return $this->render('index.html.twig');
    }

    #[Route('/introduction', name: 'app_introduction')]
    public function introduction(): Response
    {
        return $this->render('index.html.twig');
    }
}
