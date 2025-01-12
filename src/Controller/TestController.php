<?php

namespace App\Controller;

use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    private $mailerService;
    private $params;

    public function __construct(MailerService $mailerService, ParameterBagInterface $params) {
        $this->mailerService = $mailerService;
        $this->params = $params;
    }

    #[Route('/tests/template_email')]
    public function testTemplateEmail()
    {
        $context = ([
            'user_id' => "0x01935e2f84db73cdabfd5d5db1bbea1c",
            'user_email' => "test@gmail.com",
            'user_name' => "testName",
            'user_firstname' => "testName",
            'amount' => "3000",
            'typeof_payment' => "card",
            'no_payment_method' => "2980980893",
            'logo_payment_method' => "img.png",
            'confirmation_code' => "29080983",
            'sales_code' => "29080983szas",
            'date' => "April 04, 2022",
            'currency' => "$",
            'no_command' => "09090921",
            "no_invoice" => "09090921AAZ",
            "first_product_image" => "https://www.ma-boutique-en-lean.fr/3436-large_default/smiley-carre-rouge-simple-face-magnetique.jpg",
            "first_product_name" => "img.png",
            "first_product_price" => "img.png",
            "first_product_description" => "img.png",
            "first_product_quantity" => "img.png",
            "first_product_color" => "img.png",
            "typeof_card" => "img.png",
            "no_card" => "img.png",
            "subtotal" => "img.png",
            "shipping" => "img.png",
            "total" => "img.png",
            "no_order" => "img.png",
            'code' => implode("", [1, 2, 3, 4, 5, 6]),
            'current_year' => new \DateTime('Y')
        ]);

        return $this->render('emails/payment.html.twig', $context);
    }

    #[Route('/tests/send_email')]
    public function testSendTemplateEmail() {
        $mail = $this->params->get("app.mail_address");
        $test = $this->mailerService->sendTemplateEmail($mail, "on_alban@yahoo.fr", "Verify your account", 'emails/welcome.html.twig');

        return $this->render('index.html.twig');
    }
}
