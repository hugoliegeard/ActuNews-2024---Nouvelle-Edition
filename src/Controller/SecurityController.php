<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/connexion.html', name: 'app_login', priority: 10)]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
         # $this->getUser() permet de récupérer l'utilisateur connecté.
         # Si "null" pas d'utilisateur connecté en session.
         if ($this->getUser()) {
             return $this->redirectToRoute('default_home');
         }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route(path: '/deconnexion.html', name: 'app_logout', priority: 10)]
    public function logout(): void
    {
    }
}
