<?php

namespace App\Service;

use App\Entity\Event;
use App\Repository\EventRepository;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class EventExportService
{
    private EventRepository $eventRepository;

    public function __construct(EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function exportEventsToCsv(): StreamedResponse {
        try {
            $events = $this->eventRepository->findAll();

            $response = new StreamedResponse();
            $response->setCallback(function() use ($events) {
                $handle = fopen('php://output', 'w+');

                fputcsv($handle, ['ID', 'Category', 'Label', 'Place', 'Location', 'Year', 'Currency', 'Features', 'Checklists', 'Description', 'Start at', 'End at', 'Refund expire at']);

                foreach ($events as $event) {
                    $featuresFormatted = $event->getFeatures() ? implode(', ', $event->getFeatures()) : '';
                    $checklistsFormatted = $event->getChecklist() ? implode(', ', $event->getChecklist()) : '';

                    fputcsv($handle, [
                        $event->getId() ?? null,
                        $event->getEventCategory()->getLabel() ?? null,
                        $event->getLabel() ?? null,
                        $event->getPlace() ?? null,
                        $event->getLocation() ?? null,
                        $event->getYear() ?? null,
                        $event->getCurrency() ?? null,
                        $featuresFormatted,
                        $checklistsFormatted,
                        $event->getDescription() ?? null,
                        $event->getDateStart()?->format('Y-m-d'),
                        $event->getDateEnd()?->format('Y-m-d'),
                        $event->getRefundExpireAt()?->format('Y-m-d')
                    ]);
                }

                fclose($handle);
            });

            $response->setStatusCode(200);
            $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
            $response->headers->set('Content-Disposition', 'attachment; filename="participants.csv"');

            return $response;
        } catch (\Exception $e) {
            throw new \RuntimeException('Error during the export of participants.', 0, $e);
        }
    }

    public function exportEventsToXlsx(): Response|null {
        $events = $this->eventRepository->findAll();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('A1', 'ID');
        $sheet->setCellValue('B1', 'Category');
        $sheet->setCellValue('C1', 'Label');
        $sheet->setCellValue('D1', 'Place');
        $sheet->setCellValue('E1', 'Location');
        $sheet->setCellValue('F1', 'Year');
        $sheet->setCellValue('G1', 'Currency');
        $sheet->setCellValue('H1', 'Features');
        $sheet->setCellValue('I1', 'Checklists');
        $sheet->setCellValue('J1', 'Descriptions');
        $sheet->setCellValue('K1', 'Start at');
        $sheet->setCellValue('L1', 'End at');
        $sheet->setCellValue('M1', 'Refund expire at');

        $row = 2;
        foreach ($events as $event) {
            $featuresFormatted = $event->getFeatures() ? implode(', ', $event->getFeatures()) : '';
            $checklistsFormatted = $event->getChecklist() ? implode(', ', $event->getChecklist()) : '';

            $sheet->setCellValue('A' . $row, $event->getId() ?? null);
            $sheet->setCellValue('B' . $row, $event->getEventCategory()->getLabel() ?? null);
            $sheet->setCellValue('C' . $row, $event->getLabel() ?? null);
            $sheet->setCellValue('D' . $row, $event->getPlace() ?? null);
            $sheet->setCellValue('E' . $row, $event->getLocation() ?? null);
            $sheet->setCellValue('F' . $row, $event->getYear() ?? null);
            $sheet->setCellValue('G' . $row, $event->getCurrency() ?? null);
            $sheet->setCellValue('H' . $row, $featuresFormatted);
            $sheet->setCellValue('I' . $row, $checklistsFormatted);
            $sheet->setCellValue('J' . $row, $event->getDescription() ?? null);
            $sheet->setCellValue('K' . $row, $event->getDateStart()?->format('Y-m-d'));
            $sheet->setCellValue('L' . $row, $event->getDateEnd()?->format('Y-m-d'));
            $sheet->setCellValue('M' . $row, $event->getRefundExpireAt()?->format('Y-m-d'));
            $row++;
        }
        
        $writer = new Xlsx($spreadsheet);
        $filePath = tempnam(sys_get_temp_dir(), 'events') . '.xlsx';
        $writer->save($filePath);

        return new Response(file_get_contents($filePath), 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="events.xlsx"',
        ]);
    }
}
