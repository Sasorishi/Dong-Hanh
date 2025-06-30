<?php

namespace App\Controller\Api;

use App\Repository\DiscountVoucherRepository;
use App\Repository\DiscountVoucherUsageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DiscountVoucherController extends AbstractController
{
    #[Route('/api/discount/{code}', methods: 'GET')]
    public function getDiscountVoucher(Request $request, DiscountVoucherRepository $discountVoucherRepository, DiscountVoucherUsageRepository $discountVoucherUsageRepository, string $code): JsonResponse
    {
        try {
            $eventId = $request->query->get('eventId');
            $discount = $discountVoucherRepository->findOneBy(['code' => $code]);
            
            if (!$discount) {
                return new JsonResponse(Response::HTTP_NOT_FOUND);
            }
            
            if (!$discount->isUsable()) {
                return new JsonResponse(['message' =>  "Code is not usable"], Response::HTTP_BAD_REQUEST);
            }
            
            if ($discount->getEvent()->getId() != $eventId) {
                return new JsonResponse(['message' =>  "Code can't be use for this event"], Response::HTTP_BAD_REQUEST);
            }

            if ($discount->getUsageLimits() !== null && $discount->getDiscountVoucherUsages()->count() >= $discount->getUsageLimits()) {
                return new JsonResponse(['message' =>  "Code can't be use anymore"], Response::HTTP_BAD_REQUEST);
            }

            $data = [
                'id' => $discount->getId(),
                'code' => $discount->getCode(),
                'discount' => $discount->getDiscountPercentage()
            ];
        } catch (\Throwable $th) {
            throw $th;
        }


        return new JsonResponse(['voucher' =>  $data], Response::HTTP_OK);
    }
}
