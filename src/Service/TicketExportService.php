<?php

namespace App\Service;

use App\Entity\Event;
use App\Repository\EventRepository;
use Doctrine\Common\Collections\Collection;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TicketExportService
{
    private EventRepository $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function exportUserTicketsToCsv(Collection $tickets, String $userId): StreamedResponse {
        try {
            $response = new StreamedResponse();
            $response->setCallback(function() use ($tickets) {
                $handle = fopen('php://output', 'w+');

                fputcsv($handle, ['ID', 'Category', 'Price', 'Currency', 'Order ID', 'Capture ID', 'Created at']);

                foreach ($tickets as $ticket) {
                    fputcsv($handle, [
                        $ticket->getId() ?? null,
                        $ticket->getEvent()->getLabel() ?? null,
                        $ticket->getPrice() ?? null,
                        $ticket->getCurrency() ?? null,
                        $ticket->getOrderId() ?? null,
                        $ticket->getCaptureId() ?? null,
                        $ticket->getCreatedAt()?->format('Y-m-d'),
                    ]);
                }

                fclose($handle);
            });

            $response->setStatusCode(200);
            $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
            $response->headers->set('Content-Disposition', 'attachment; filename="'.$userId.' - tickets.xlsx"');

            return $response;
        } catch (\Exception $e) {
            throw new \RuntimeException('Error during the export of participants.', 0, $e);
        }
    }

    public function exportUserTicketsToXlsx(Collection $tickets, String $userId): Response|null {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('A1', 'ID');
        $sheet->setCellValue('B1', 'Category');
        $sheet->setCellValue('C1', 'Price');
        $sheet->setCellValue('D1', 'Currency');
        $sheet->setCellValue('E1', 'Order ID');
        $sheet->setCellValue('F1', 'Capture ID');
        $sheet->setCellValue('G1', 'Created at');

        $row = 2;
        foreach ($tickets as $ticket) {
            $sheet->setCellValue('A' . $row, $ticket->getId() ?? null);
            $sheet->setCellValue('B' . $row, $ticket->getEvent()->getLabel() ?? null);
            $sheet->setCellValue('C' . $row, $ticket->getPrice() ?? null);
            $sheet->setCellValue('D' . $row, $ticket->getCurrency() ?? null);
            $sheet->setCellValue('E' . $row, $ticket->getOrderId() ?? null);
            $sheet->setCellValue('F' . $row, $ticket->getCaptureId() ?? null);
            $sheet->setCellValue('G' . $row, $ticket->getCreatedAt()?->format('Y-m-d'));
            $row++;
        }
        
        $writer = new Xlsx($spreadsheet);
        $filePath = tempnam(sys_get_temp_dir(), $userId.' - tickets') . '.xlsx';
        $writer->save($filePath);

        return new Response(file_get_contents($filePath), 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="'.$userId.' - tickets.xlsx"',
        ]);
    }
}
