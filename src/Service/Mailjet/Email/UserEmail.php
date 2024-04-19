<?php

namespace App\Service\Mailjet\Email;

use App\Entity\User;
use App\Service\Mailjet\AbstractMailjet;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

class UserEmail extends AbstractMailjet
{
    /**
     * Envoi un email de bienvenue à l'utilisateur
     * passé en paramètre.
     * @param User $user
     * @return void
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function sendWelcomeUserEmail(User $user): void
    {
        $subject = "Bienvenue {$user->getFirstName()} sur ActuNews !";
        $message = $this->getTwig()->render('emails/user/welcome.html.twig', [
            'user' => $user
        ]);

        # Génération du $body
        $body = $this->generateBody($subject, $user->getEmail(), $user->getFirstName(), $message);

        # Envoi de l'email
        $this->send($body);
    }
}