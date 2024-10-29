<?php

namespace App\Repository;

use App\Entity\LogisticInformation;
use App\Entity\Participant;
use App\Service\GlobalFunctionsService;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LogisticInformation>
 *
 * @method LogisticInformation|null find($id, $lockMode = null, $lockVersion = null)
 * @method LogisticInformation|null findOneBy(array $criteria, array $orderBy = null)
 * @method LogisticInformation[]    findAll()
 * @method LogisticInformation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LogisticInformationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, entityClass: LogisticInformation::class);
    }

//    /**
//     * @return LogisticInformation[] Returns an array of LogisticInformation objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?LogisticInformation
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    public function createLogisticInformation(array $data, Participant $participant): LogisticInformation
    {
        $logisticInformation = new LogisticInformation();
        $logisticInformation->setParticipant($participant);
        $logisticInformation->setArrivalTransport($data['arrivalTransportType']);
        $logisticInformation->setArrivalDatetime(!empty($data['arrivalDatetime']) ? DateTime::createFromFormat('Y-m-d\TH:i:s', $data['arrivalDatetime']) : null);
        $logisticInformation->setArrivalAirline($data['arrivalAirline']);
        $logisticInformation->setArrivalFlightNumber($data['arrivalFlightNumber']);
        $logisticInformation->setDepartureTransport($data['departureTransportType']);
        $logisticInformation->setDepartureDatetime(!empty($data['departureDatetime']) ? DateTime::createFromFormat('Y-m-d\TH:i:s', $data['departureDatetime']) : null);
        $logisticInformation->setDepartureAirline($data['departureAirline']);
        $logisticInformation->setDepartureFlightNumber($data['departureFlightNumber']);
        $logisticInformation->setComments($data['comments']);
        $logisticInformation->setCreateAt(new \DateTimeImmutable());
        $logisticInformation->setUpdatedAt(new DateTime());


        $this->getEntityManager()->persist($logisticInformation);
        $this->getEntityManager()->flush();

        return $logisticInformation;
    }

    public function updateLogisticInformation(LogisticInformation $logisticInformation, array $data): LogisticInformation
    {
        $logisticInformation->setArrivalTransport($data['arrival_transport']);
        $logisticInformation->setArrivalDatetime(!empty($data['arrival_datetime']) ? new DateTime($data['arrival_datetime']) : null);
        $logisticInformation->setArrivalAirline($data['arrival_airline']);
        $logisticInformation->setArrivalFlightNumber($data['arrival_flight_number']);
        $logisticInformation->setDepartureTransport($data['departure_transport']);
        $logisticInformation->setDepartureDatetime(!empty($data['departure_datetime']) ? new DateTime($data['departure_datetime']) : null);
        $logisticInformation->setDepartureAirline($data['departure_airline']);
        $logisticInformation->setDepartureFlightNumber($data['departure_flight_number']);
        $logisticInformation->setComments($data['comments']);
        $logisticInformation->setUpdatedAt(new DateTime());

        $this->getEntityManager()->persist($logisticInformation);
        $this->getEntityManager()->flush();

        return $logisticInformation;
    }


    /**
     * @param string $userId
     * @param int $eventId
     * @return LogisticInformation[]
     */
    public function findGroupedTicketsByUserAndEvent(string $userId, int $eventId, string $orderId): array
    {
        $globalFunctionsService = new GlobalFunctionsService();
        $binaryUserId = hex2bin(str_replace('-', '', $userId));
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT
        logistic_information.id, logistic_information.participant_id, arrival_transport, arrival_datetime, 
        arrival_airline, arrival_flight_number, departure_transport,
        departure_datetime, departure_airline, departure_flight_number, comments,
        firstname, lastname, need_logistic, ticket.order_id
        FROM logistic_information 
        LEFT JOIN participant 
        ON logistic_information.participant_id = participant.id
        LEFT JOIN ticket
        on participant.id = ticket.participant_id
        LEFT JOIN user
        on ticket.user_id = user.id
        WHERE ticket.event_id = :eventId and ticket.order_id = :orderId';

        $resultSet = $conn->executeQuery($sql, ['userId' => $binaryUserId, 'eventId' => $eventId, 'orderId' => $orderId]);

        $results = $resultSet->fetchAllAssociative();
        $resultsFormatted = [];

        foreach ($results as $row) {
            array_push($resultsFormatted, [
                'id' => $row['id'],
                'participant_id' => $globalFunctionsService->convertBinaryUuidToString($row['participant_id']),
                'arrival_transport' => $row['arrival_transport'],
                'arrival_datetime' => $row['arrival_datetime'],
                'arrival_airline' => $row['arrival_airline'],
                'arrival_flight_number' => $row['arrival_flight_number'],
                'departure_transport' => $row['departure_transport'],
                'departure_datetime' => $row['departure_datetime'],
                'departure_airline' => $row['departure_airline'],
                'departure_flight_number' => $row['departure_flight_number'],
                'comments' => $row['comments'],
                'firstname' => $row['firstname'],
                'lastname' => $row['lastname'],
                'need_logistic' => $row['need_logistic'],
                'order_id' => $row['order_id'],
            ]);
        }
    
        return $resultsFormatted;
    }
}
