<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DefaultController extends AbstractController
{

    #[Route('/', name: 'default_home', methods: ['GET'])]
    public function home(PostRepository $postRepository): Response
    {
        #1. Récupération des derniers articles
        $posts = $postRepository->findAll();

        #2. Passer a la vue les informations reçues
        return $this->render('default/home.html.twig', [
            'posts' => $posts
        ]);
    }


    #[Route('/contact', name: 'default_contact', methods: ['GET'])]
    public function contact(): Response
    {
        return $this->render('default/contact.html.twig');
    }

    /**
     * Permet d'afficher les articles de la catégorie
     * ex. https://localhost:8000/politique
     * @param $slug
     * @return Response
     */
    #[Route('/{slug}', name: 'default_category', methods: ['GET'])]
    public function category(Category $category): Response
    {
        # Méthode 1
        # $category = $categoryRepository->findOneBy(['slug' => $slug]);

        # Méthode 2
        # $category = $categoryRepository->findOneBySlug($slug);
        # dd($category);

        return $this->render('default/category.html.twig', [
            'category' => $category
        ]);
    }

    /**
     * CONSIGNE : Créée la route permet d'afficher un article.
     * ex. https://localhost:8000/categorie/alias
     */
    #[Route('/{category}/{slug}', name: 'default_post', methods: ['GET'])]
    public function post($category, $slug): Response
    {
        return $this->render('default/home.html.twig');
    }
}
