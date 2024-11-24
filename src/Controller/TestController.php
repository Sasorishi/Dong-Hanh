<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    #[Route('/tests/template_email')]
    public function testTemplateEmail()
    {
        $context = ([
            'user_id' => "0x01935e2f84db73cdabfd5d5db1bbea1c",
            'user_email' => "test@gmail.com",
            'code' => implode("", [1, 2, 3, 4, 5, 6]),
            'current_year' => new \DateTime('Y')
        ]);

        return $this->render('emails/verification_code.html.twig', $context);
    }
}
