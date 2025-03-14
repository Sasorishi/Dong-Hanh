<?php

namespace App\Controller\Routes;

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

    #[Route('/about', name: 'app_about')]
    public function about(): Response
    {
        return $this->render('index.html.twig');
    }

    #[Route('/privacy_policy', name: 'app_privacyPolicy')]
    public function privacyPolicy(): Response
    {
        return $this->render('index.html.twig');
    }

    #[Route('/terms_and_conditions_of_sale', name: 'app_termsAndConditionsOfSale')]
    public function termsAndConditionsOfSale(): Response
    {
        return $this->render('index.html.twig');
    }

    #[Route('/account-verify/{id}', name: 'app_account_verify')]
    public function accountVerify(): Response
    {
        return $this->render('index.html.twig');
    }

    #[Route('/events', name: 'app_events')]
    public function events(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'EventsController',
        ]);
    }

    #[Route('/events/{id}', name: 'app_event_detail')]
    public function eventDetails(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'EventDetailController',
        ]);
    }

    #[Route('/register/{eventId}/{tickets}', name: 'app_register_form')]
    public function registration(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_USER');
        return $this->render('index.html.twig', [
            'controller_name' => 'RegisterController',
        ]);
    }

    #[Route('/signup', name: 'app_signup')]
    public function signup(): Response
    {
        return $this->render('index.html.twig', [
            'controller_name' => 'SignupController',
        ]);
    }
}
