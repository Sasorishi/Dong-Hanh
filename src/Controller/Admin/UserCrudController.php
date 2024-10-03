<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Service\TicketExportService;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;

class UserCrudController extends AbstractCrudController
{
    private TicketExportService $ticketExportService;

    public function __construct(TicketExportService $ticketExportService)
    {
        $this->ticketExportService = $ticketExportService;
    }

    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureActions(Actions $actions): Actions
    {
        $exportTicketsAction = Action::new('exportTicketsExcel', 'Export tickets', 'fa fa-file-excel')
        ->linkToCrudAction('exportTicketsXlsx')
        ->setCssClass('btn btn-success');

        return $actions
        ->add(Crud::PAGE_INDEX, Action::DETAIL)
        ->add(Crud::PAGE_DETAIL, $exportTicketsAction)
        ->add(Crud::PAGE_EDIT, Action::SAVE_AND_ADD_ANOTHER)
        ->setPermission(Action::NEW, 'ROLE_ADMIN')
        ->setPermission(Action::DETAIL, 'ROLE_ADMIN')
        ->setPermission(Action::EDIT, 'ROLE_ADMIN')
        ->setPermission(Action::SAVE_AND_ADD_ANOTHER, 'ROLE_ADMIN')
        ->setPermission(Action::DELETE, 'ROLE_ADMIN');
    }

    public function configureFields(string $pageName): iterable
    {
        $fields = parent::configureFields($pageName);
        $fields[] = ChoiceField::new('roles', 'Roles')
        ->setChoices([
            'Admin' => 'ROLE_ADMIN',
            'Member' => 'ROLE_MEMBER',
            'User' => 'ROLE_USER',
        ])
        ->allowMultipleChoices(true);

        $fields[] = CollectionField::new('tickets', "Ticket ID")->onlyOnDetail()->setTemplatePath('admin/fields/tickets.html.twig');
        return $fields;
    }

    public function exportTicketsXlsx()
    {
        $user = $this->getContext()->getEntity()->getInstance();
        $userId = $user->getId();
        $userTickets = $user->getTickets();
        return $this->ticketExportService->exportUserTicketsToXlsx($userTickets, $userId);
    }
}
