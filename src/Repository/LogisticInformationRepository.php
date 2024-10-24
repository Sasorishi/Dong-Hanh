<?php

namespace App\Repository;

use App\Entity\LogisticInformation;
use App\Entity\Participant;
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
        dump($data);
        $logisticInformation = new LogisticInformation();
        $logisticInformation->setParticipant($participant);
        $logisticInformation->setArrivalTransport($data['arrivalTransportType']);
        $logisticInformation->setArrivalDatetime(!empty($data['arrivalDatetime']) ? DateTime::createFromFormat('Y-m-d\TH:i', $data['arrivalDatetime']) : null);
        $logisticInformation->setArrivalAirline($data['arrivalAirline']);
        $logisticInformation->setArrivalFlightNumber($data['arrivalFlightNumber']);
        $logisticInformation->setDepartureTransport($data['departureTransportType']);
        $logisticInformation->setDepartureDatetime(!empty($data['departureDatetime']) ? DateTime::createFromFormat('Y-m-d\TH:i', $data['departureDatetime']) : null);
        $logisticInformation->setDepartureAirline($data['departureAirline']);
        $logisticInformation->setDepartureFlightNumber($data['departureFlightNumber']);
        $logisticInformation->setComments($data['comments']);
        $logisticInformation->setCreateAt(new \DateTimeImmutable());

        $this->getEntityManager()->persist($logisticInformation);
        $this->getEntityManager()->flush();

        return $logisticInformation;
    }


    /**
     * @param string $userId
     * @param int $eventId
     * @return LogisticInformation[]
     */
    public function findGroupedTicketsByUserAndEvent(string $userId, int $eventId): array
    {
        $binaryUserId = hex2bin(str_replace('-', '', $userId));
        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT 
        logistic_information.id, logistic_information.participant_id, arrival_transport, arrival_datetime, 
        arrival_airline, arrival_flight_number, departure_transport,
        departure_datetime, departure_airline, departure_flight_number, comments,
        firstname, lastname, need_logistic
        FROM logistic_information 
        LEFT JOIN participant 
        ON logistic_information.participant_id = participant.id
        LEFT JOIN event
        on participant.event_id = event.id
        LEFT JOIN ticket
        on event.id = ticket.event_id
        LEFT JOIN user
        on ticket.user_id = user.id
        WHERE user.id = :userId AND event.id = :eventId
        GROUP BY logistic_information.id';

        $resultSet = $conn->executeQuery($sql, ['userId' => $binaryUserId, 'eventId' => $eventId]);

        $results = $resultSet->fetchAllAssociative();

        foreach ($results as &$row) {
            $row['participant_id'] = $this->convertBinaryUuidToString($row['participant_id']);
        }
    
        return $results;
    }

    private function convertBinaryUuidToString(string $binaryUuid): string
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
