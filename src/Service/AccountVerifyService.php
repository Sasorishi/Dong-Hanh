<?php

namespace App\Service;

class AccountVerifyService
{
    public function codeGenerator(): array
    {
        $code = [];
        for ($i = 0; $i < 6; $i++) {
            array_push($code, random_int(0, 9));
        }
        return $code;
    }

    public function arrayToString(array $array): string
    {
        $string = "";
        foreach ($array as $key => $value) {
            $string .= $value;
        }
        return $string;
    }

    public function setTimeExpired(string $value): \DateTime
    {
        $dateTime = new \DateTime();
        $dateTime->modify($value);
        return $dateTime;
    }
}