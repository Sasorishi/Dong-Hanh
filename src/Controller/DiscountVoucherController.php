<?php

namespace App\Controller;

use App\Repository\DiscountVoucherRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DiscountVoucherController extends AbstractController
{
    #[Route('/discount/voucher', name: 'app_discount_voucher')]
    public function index(): Response
    {
        return $this->render('discount_voucher/index.html.twig', [
            'controller_name' => 'DiscountVoucherController',
        ]);
    }

    #[Route('/api/discount/{code}', methods: 'GET')]
    public function getDiscountVoucher(DiscountVoucherRepository $discountVoucherRepository, string $code): JsonResponse
    {
        $discount = $discountVoucherRepository->findOneBy(['code' => $code]);
        
        if (!$discount) {
            return new JsonResponse(Response::HTTP_NOT_FOUND);
        }
        
        if (!$discount->isUsable()) {
            return new JsonResponse(['message' =>  "Code can't be use"], Response::HTTP_BAD_REQUEST);
        }

        $data = [
            'id' => $discount->getId(),
            'code' => $discount->getCode(),
            'discount' => $discount->getDiscountPercentage()
        ];

        return new JsonResponse(['voucher' =>  $data], Response::HTTP_OK);
    }
}
