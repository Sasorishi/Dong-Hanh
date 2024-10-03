<?php

namespace App\Service;

use App\Entity\Event;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ParticipantExportService
{
    public function exportParticipantsToCsv(Event $event): StreamedResponse
    {
        try {
            $participants = $event->getCompletedParticipants();

            $response = new StreamedResponse();
            $response->setCallback(function() use ($participants) {
                $handle = fopen('php://output', 'w+');

                fputcsv($handle, ['ID', 'Lastname', 'Firstname', 'Gender', 'Age', 'Email', 'Phone', 'Country', 'Expectations', 'Healthcare', 'Created at']);

                foreach ($participants as $participant) {
                    fputcsv($handle, [
                        $participant->getId() ?? null,
                        $participant->getLastname() ?? null,
                        $participant->getFirstname() ?? null,
                        $participant->getGender() ?? null,
                        $participant->getAge() ?? null,
                        $participant->getEmail() ?? null,
                        $participant->getPhone() ?? null,
                        $participant->getCountry() ?? null,
                        $participant->getExpectations() ?? null,
                        $participant->getHealthcare() ?? null,
                        $participant->getCreatedAt()?->format('Y-m-d'),
                    ]);
                }

                fclose($handle);
            });

            $response->setStatusCode(200);
            $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
            $response->headers->set('Content-Disposition', 'attachment; filename="'.$event->getLabel().' - participants.xlsx"');

            return $response;
        } catch (\Exception $e) {
            throw new \RuntimeException('Error during the export of participants.', 0, $e);
        }
    }

    public function exportParticipantsToXlsx(Event $event): Response|null
    {
        try {
            $participants = $event->getCompletedParticipants();

            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();

            $sheet->setCellValue('A1', 'ID');
            $sheet->setCellValue('B1', 'Lastname');
            $sheet->setCellValue('C1', 'Firstname');
            $sheet->setCellValue('D1', 'Gender');
            $sheet->setCellValue('E1', 'Age');
            $sheet->setCellValue('F1', 'Email');
            $sheet->setCellValue('G1', 'Phone');
            $sheet->setCellValue('H1', 'Country');
            $sheet->setCellValue('I1', 'Expectations');
            $sheet->setCellValue('J1', 'Healthcare');
            $sheet->setCellValue('K1', 'Created at');

            $row = 2;
            foreach ($participants as $participant) {
                $sheet->setCellValue('A' . $row, $participant->getId() ?? null);
                $sheet->setCellValue('B' . $row, $participant->getLastname() ?? null);
                $sheet->setCellValue('C' . $row, $participant->getFirstname() ?? null);
                $sheet->setCellValue('D' . $row, $participant->getGender() ?? null);
                $sheet->setCellValue('E' . $row, $participant->getAge() ?? null);
                $sheet->setCellValue('F' . $row, $participant->getEmail() ?? null);
                $sheet->setCellValue('G' . $row, $participant->getPhone() ?? null);
                $sheet->setCellValue('H' . $row, $participant->getCountry() ?? null);
                $sheet->setCellValue('I' . $row, $participant->getExpectations() ?? null);
                $sheet->setCellValue('J' . $row, $participant->getHealthcare() ?? null);
                $sheet->setCellValue('K' . $row, $participant->getCreatedAt()?->format('Y-m-d'));
                $row++;
            }

            $writer = new Xlsx($spreadsheet);
            $filePath = tempnam(sys_get_temp_dir(), $event->getLabel().' - participants') . '.xlsx';
            $writer->save($filePath);

            return new Response(file_get_contents($filePath), 200, [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition' => 'attachment; filename="'.$event->getLabel().' - participants.xlsx"',
            ]);
        } catch (\Exception $e) {
            throw new \RuntimeException('Error during the export of participants.', 0, $e);
        }
    }
}
