<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class EnvController extends AbstractController
{
    #[Route('/api/env-data', name: 'api_env_data', methods: ['POST'])]
    public function getEnvData(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $varEnv = $this->getParameter($data['env']);

        return new JsonResponse(['varEnv' => $varEnv]);
    }
}
