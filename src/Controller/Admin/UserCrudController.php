<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Service\TicketExportService;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserCrudController extends AbstractCrudController
{
    private TicketExportService $ticketExportService;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(TicketExportService $ticketExportService, UserPasswordHasherInterface $passwordHasher)
    {
        $this->ticketExportService = $ticketExportService;
        $this->passwordHasher = $passwordHasher;
    }

    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof User) {
            $entityInstance->setPassword(
                password_hash($entityInstance->getPassword(), PASSWORD_BCRYPT)
            );
        }

        $entityManager->persist($entityInstance);
        $entityManager->flush();
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof User) {
            $newPassword = $entityInstance->getNewPassword();

            if ($newPassword) {
                $hashedPassword = $this->passwordHasher->hashPassword($entityInstance, $newPassword);
                $entityInstance->setPassword($hashedPassword);
            }
        }

        // Persister l'entité mise à jour
        $entityManager->persist($entityInstance);
        $entityManager->flush();
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

        // Input fields for new password
        if ($pageName === Crud::PAGE_EDIT) {
            $fields[] = TextField::new('newPassword')
                ->setLabel('New password')
                ->setFormTypeOption('required', false);
        }
        
        $fields[] = ChoiceField::new('roles', 'Roles')
        ->setChoices([
            'Admin' => 'ROLE_ADMIN',
            'Member' => 'ROLE_MEMBER',
            'User' => 'ROLE_USER',
        ])
        ->allowMultipleChoices(true);

        $fields[] = CollectionField::new('tickets', "Ticket ID")->onlyOnDetail()->setTemplatePath('admin/fields/tickets.html.twig');
        $fields[] = CollectionField::new('getResetsPasswords', "Resets passwords")->onlyOnDetail()->setTemplatePath('admin/fields/resetsPasswords.html.twig');
        return $fields;
    }

    public function exportTicketsXlsx()
    {
        $user = $this->getContext()->getEntity()->getInstance();
        $userId = $user->getId();
        $userTickets = $user->getTickets();
        return $this->ticketExportService->exportUserTicketsToXlsx($userTickets, $userId);
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setDefaultSort(['create_at' => 'DESC']);
    }
}
