<?php

namespace App\Service;

class AccountVerifyService
{
    public function codeGenerator(): string
    {
        $code = "";
        for ($i = 0; $i < 6; $i++) {
            $randomNumber = strval(random_int(0, 9));
            $code = $code . $randomNumber;
        }
        return $code;
    }
}