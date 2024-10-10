<?php

namespace App\Controller\Admin;

use App\Entity\Event;
use App\Service\EventExportService;
use App\Service\ParticipantExportService;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;

class EventCrudController extends AbstractCrudController
{
    private ParticipantExportService $participantExportService;
    private EventExportService $eventExportService;

    public function __construct(ParticipantExportService $participantExportService, EventExportService $eventExportService)
    {
        $this->participantExportService = $participantExportService;
        $this->eventExportService = $eventExportService;
    }
    
    public static function getEntityFqcn(): string
    {
        return Event::class;
    }

    // public function configureCrud(Crud $crud): Crud
    // {
    //     return $crud
    //         ->setEntityPermission('ROLE_MEMBER') // Add this to block the entity to the role
    //     ;
    // }

    public function configureActions(Actions $actions): Actions
    {
        $exportEventsAction = Action::new('exportEventsExcel', 'Export events', 'fa fa-file-excel')
        ->linkToCrudAction('exportEventsXlsx')
        ->setCssClass('btn btn-success')
        ->createAsGlobalAction();

        $exportParticipantsAction = Action::new('exportExcel', 'Export participants', 'fa fa-file-excel')
            ->linkToCrudAction('exportParticipantsXlsx')
            ->setCssClass('btn btn-success');

        return $actions
        ->add(Crud::PAGE_INDEX, Action::DETAIL)
        ->add(Crud::PAGE_INDEX, $exportEventsAction)
        ->add(Crud::PAGE_INDEX, $exportParticipantsAction)
        ->add(Crud::PAGE_DETAIL, $exportParticipantsAction)
        ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
        ->setPermission(Action::NEW, 'ROLE_ADMIN')
        ->setPermission(Action::EDIT, 'ROLE_ADMIN')
        ->setPermission(Action::SAVE_AND_ADD_ANOTHER, 'ROLE_ADMIN')
        ->setPermission(Action::DELETE, 'ROLE_ADMIN');
    }

    public function configureFields(string $pageName): iterable
    {
        $fields = parent::configureFields($pageName);
        $fields[] = NumberField::new('year', 'Year')->setFormTypeOptions(['constraints' => [
            new Assert\Positive(),
        ]]);
        $fields[] = AssociationField::new('eventCategory', 'Category');
        $fields[] = ArrayField::new('images', 'Images');
        $fields[] = ArrayField::new('features', 'Features')->setFormTypeOptions(['constraints' => [
            new Assert\Count([
                'max' => 4,
            ]),
        ]]);
        $fields[] = ArrayField::new('checklist', 'Checklist');
        $fields[] = CollectionField::new('getCompletedParticipants', "Participants")->onlyOnDetail()->setTemplatePath('admin/fields/participants.html.twig');
        return $fields;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setDefaultSort(['id' => 'DESC']);
    }

    public function exportParticipantsXlsx(): Response
    {
        $event = $this->getContext()->getEntity()->getInstance();
        return $this->participantExportService->exportParticipantsToXlsx($event);
    }

    public function exportEventsXlsx(): Response
    {
        return $this->eventExportService->exportEventsToXlsx();
    }
}
