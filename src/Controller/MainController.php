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

    #[Route('/test', name: 'test')]
    public function test(): Response
    {

        return $this->render('emails/verification_code.html.twig', [
            'user_id' => "14567456",
            'user_email' => "matteo.baldinetti@gmail.com",
            'code' => [1, 3, 5, 4, 8, 6],
            'current_year' => new \DateTime('Y')
        ]);
    }
}
