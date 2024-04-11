<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class AppFixtures extends Fixture
{

    public function __construct(private readonly SluggerInterface            $slugger,
                                private readonly UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function load(ObjectManager $manager): void
    {
        # Chargement de Faker
        $faker = Factory::create('fr_FR');

        # Chargement des catégories
        for ($i = 1; $i <= 5; $i++) {

            $name = $faker->sentence(2);
            $slug = $this->slugger->slug($name);

            $category = new Category();
            $category->setName($faker->sentence(2));
            $category->setSlug($this->slugger->slug($faker->sentence(2)));

            $manager->persist($category);
        }

        # Chargement des utilisateurs
        # Email : admin@actu.news
        # Mot de passe : demo
        $admin = new User();
        $admin->setFirstName('Admin')
            ->setFamilyName('Test')
            ->setEmail('admin@actu.news')
            ->setRoles(['ROLE_ADMIN']);

        # Hashage du mot de passe
        $admin->setPassword(
            $this->passwordHasher->hashPassword(
                $admin, 'demo'
            )
        );
        $manager->persist($admin);

        # Email : reporter@actu.news
        # Mot de passe : demo

        $reporter = new User();
        $reporter->setFirstName('Reporter')
            ->setFamilyName('Test')
            ->setEmail('reporter@actu.news')
            ->setRoles(['ROLE_REPORTER']);

        # Hashage du mot de passe
        $reporter->setPassword(
            $this->passwordHasher->hashPassword(
                $reporter, 'demo'
            )
        );

        $manager->persist($reporter);

        # Email : user@actu.news
        # Mot de passe : demo

        $user = new User();
        $user->setFirstName('User')
            ->setFamilyName('Test')
            ->setEmail('user@actu.news')
            ->setRoles(['ROLE_USER']);

        # Hashage du mot de passe
        $user->setPassword(
            $this->passwordHasher->hashPassword(
                $user, 'demo'
            )
        );

        $manager->persist($user);

        # Création des articles
        for ($i = 1; $i <= 20; $i++) {

            $title = $faker->sentence(8);
            $slug = $this->slugger->slug($title);
            $currentDate = new \DateTimeImmutable();

            $post = new Post();
            $post->setTitle($title)
                ->setSlug($slug)
                ->setImage($faker->imageUrl)
                ->setContent($faker->randomHtml)
                ->setCreatedAt($currentDate)
                ->setUpdatedAt($currentDate)
                ->setPublishedAt($currentDate)
                ->addCategory($category)
                ->setUser($reporter);

            $manager->persist($post);
        }

        $manager->flush();
    }
}
