<?php

namespace App\Service\Mailjet;

use Mailjet\Resources;
use Twig\Environment;

abstract class AbstractMailjet
{
    public function __construct(private readonly Environment $twig,
                                private readonly string      $mailjetApiKey,
                                private readonly string      $mailjetApiKeyPrivate)
    {
    }

    protected function generateBody(string $subject, string $email, string $name, string $message): array
    {
        return [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "formation@biynlearning.academy",
                        'Name' => "Actunews"
                    ],
                    'To' => [
                        [
                            'Email' => $email,
                            'Name' => $name
                        ]
                    ],
                    'TemplateID' => 5893554,
                    'TemplateLanguage' => true,
                    'Subject' => $subject,
                    'Variables' => [
                        'titre' => $subject,
                        'content' => $message,
                    ]
                ]
            ]
        ];
    }

    protected function getTwig(): Environment
    {
        return $this->twig;
    }

    protected function send(array $body): void
    {
        $mj = new \Mailjet\Client($this->mailjetApiKey, $this->mailjetApiKeyPrivate,true,['version' => 'v3.1']);
        $mj->post(Resources::$Email, ['body' => $body]);
    }

}