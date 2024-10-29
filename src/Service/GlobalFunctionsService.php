<?php

namespace App\Service;

class GlobalFunctionsService
{
    public function convertBinaryUuidToString(string $binaryUuid): string
    {
        $hex = bin2hex($binaryUuid);
        
        // Ajouter des tirets pour reformater l'UUID
        return sprintf('%08s-%04s-%04s-%04s-%12s',
            substr($hex, 0, 8),
            substr($hex, 8, 4),
            substr($hex, 12, 4),
            substr($hex, 16, 4),
            substr($hex, 20, 12)
        );
    }
}