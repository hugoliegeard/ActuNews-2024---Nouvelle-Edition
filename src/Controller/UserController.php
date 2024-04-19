<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Service\Mailjet\Email\UserEmail;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class UserController extends AbstractController
{
    /**
     * @throws RuntimeError
     * @throws SyntaxError
     * @throws LoaderError
     */
    #[Route('/inscription.html', name: 'user_register', methods: ['GET', 'POST'], priority: 10)]
    public function register(
        Request                     $request,
        EntityManagerInterface      $entityManager,
        UserEmail                   $userEmail,
        UserPasswordHasherInterface $passwordHasher): \Symfony\Component\HttpFoundation\Response
    {
        # 1. Création de mon utilisateur
        $user = new User();

        # 2. Création de mon formulaire
        $form = $this->createForm(UserType::class, $user);

        # A. Permet le traitement du formulaire
        $form->handleRequest($request);

        if ($form->isSubmitted()) {

            # Hasher le mot de passe
            $user->setPassword(
                $passwordHasher->hashPassword(
                    $user,
                    $user->getPassword()
                )
            );

            # Sauvegarder/Envoyer dans la BDD
            $entityManager->persist($user);
            $entityManager->flush();

            # Envoi d'un email de notification
            $userEmail->sendWelcomeUserEmail($user);

            # Notification & Redirection
            $this->addFlash('success',
                "Félicitation, vous pouvez maintenant vous connecter !");

            # Reidrection vers la page de connexion
            return $this->redirectToRoute('app_login');
        }

# 3. Passage de mon formulaire à la vue
        return $this->render('user/register.html.twig', [
            'form' => $form
        ]);
    }
}