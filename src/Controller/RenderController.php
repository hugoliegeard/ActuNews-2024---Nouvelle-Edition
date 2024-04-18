<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Post;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RenderController extends AbstractController
{

    const MAX_POST = 3;

    public function __construct(private EntityManagerInterface $manager)
    {
    }

    public function renderSidebar(): Response
    {
        $posts = $this->manager->getRepository(Post::class)
            ->findBy([], ['publishedAt' => 'DESC'], self::MAX_POST);

        $categories = $this->manager->getRepository(Category::class)->findAll();

        return $this->render('components/_sidebar.html.twig', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }

    /**
     * Permet de déclencher le rendu de la navbar.
     */
    public function renderNavigation(): \Symfony\Component\HttpFoundation\Response
    {
        # Récupération des catégories de la BDD
        $categories = $this->manager->getRepository(Category::class)->findAll();

        # Rendu de la vue
        return $this->render('components/_nav.html.twig', [
            'categories' => $categories
        ]);
    }
}