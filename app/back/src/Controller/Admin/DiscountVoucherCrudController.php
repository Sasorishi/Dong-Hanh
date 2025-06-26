<?php

namespace App\Controller\Admin;

use App\Entity\DiscountVoucher;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Validator\Constraints as Assert;

class DiscountVoucherCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return DiscountVoucher::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */

    public function configureFields(string $pageName): iterable
    {
        $fields = parent::configureFields($pageName);
        $fields[] = IntegerField::new('discountPercentage', 'Discount (Percentage)')->setFormTypeOptions(['constraints' => [
            new Assert\Range([
                'min' => 0,
                'max' => 100,
            ]),
        ]]);
        $fields[] = TextField::new('code', 'Code')->setFormTypeOptions(['constraints' => [
            new Assert\Length([
                'min' => 12,
                'max' => 12,
            ]),
        ]]);
        $fields[] = BooleanField::new('isUsed', 'Is used')
            ->setFormTypeOptions([
                'data' => false,
            ])->hideOnDetail();
        $fields[] = DateTimeField::new('createdAt', 'Created At')
            ->setFormTypeOptions([
                'data' => new \DateTimeImmutable('now'),
            ]);
        $fields[] = TextField::new('user', 'User')->hideOnForm();
        return $fields;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
        ->setDefaultSort(['id' => 'DESC']);
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        parent::persistEntity($entityManager, $entityInstance);
        $this->addFlash('success', 'The entity has been created successfully!');
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        parent::updateEntity($entityManager, $entityInstance);
        $this->addFlash('success', 'The entity has been updated successfully!');
    }

    public function deleteEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        parent::deleteEntity($entityManager, $entityInstance);
        $this->addFlash('success', 'The entity has been deleted successfully!');
    }
}
