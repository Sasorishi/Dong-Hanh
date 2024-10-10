<?php

namespace App\Controller\Admin;

use App\Entity\AccountCodeVerify;
use App\Entity\DiscountVoucher;
use App\Entity\Event;
use App\Entity\EventCategories;
use App\Entity\FlightInformation;
use App\Entity\Participant;
use App\Entity\ResetsPasswords;
use App\Entity\Ticket;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(EventCategoriesCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Dong Hanh : Dashboard')
            ->setFaviconPath('images/vietnam.png');
    }

    public function configureMenuItems(): iterable
    {
        return [
            MenuItem::linkToDashboard('Dashboard', 'fa fa-home'),
            MenuItem::section('Events'),
            MenuItem::linkToCrud('Categories', 'fa fa-tag', EventCategories::class),
            MenuItem::linkToCrud('Events', 'fa fa-calendar', Event::class),
            MenuItem::linkToCrud('Participants', 'fa fa-list-alt', Participant::class),
            MenuItem::linkToCrud('Flights informations', 'fas fa-list', FlightInformation::class),
            MenuItem::section('Tickets'),
            MenuItem::linkToCrud('Tickets', 'fa fa-ticket', Ticket::class),
            MenuItem::linkToCrud('Discounts', 'fas fa-list', DiscountVoucher::class),
            MenuItem::section('Monitoring'),
            MenuItem::linkToCrud('Users', 'fa fa-users', User::class),
            MenuItem::linkToCrud('Code Verify', 'fa fa-list-ol', AccountCodeVerify::class),
            MenuItem::linkToCrud('Resets passwords', 'fa fa-key', ResetsPasswords::class),
        ];
    }
}
