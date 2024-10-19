<?php

namespace App\EventListener;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

class CheckVerifiedUserListener
{
    private $router;
    private $security;

    public function __construct(RouterInterface $router, Security $security)
    {
        $this->router = $router;
        $this->security = $security;
    }

    public function onKernelRequest(RequestEvent $event)
    {
        $request = $event->getRequest();

        $excludedPaths = [
            '/api/auth/is-authenticated',
            '/api/auth/account-verify/',
            '/api/auth/account-verify/resend',
            '/admin',
            '/account-verify'
        ];

        $currentPath = $request->getPathInfo();

        foreach ($excludedPaths as $excludedPath) {
            if (strpos($currentPath, $excludedPath) === 0) {
                return;
            }
        }

        $user = $this->security->getUser();

        if ($user && method_exists($user, 'isVerified') && !$user->isVerified()) {
            if ($request->attributes->get('_route') !== 'app_account_verify') {
                $event->setResponse(new RedirectResponse($this->router->generate('app_account_verify', ['id' => $user->getId()])));
            }
        }
    }
}
