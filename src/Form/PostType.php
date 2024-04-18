<?php

namespace App\Form;

use App\Entity\Category;
use App\Entity\Post;
use App\Entity\Tag;
use App\Entity\User;
use FOS\CKEditorBundle\Form\Type\CKEditorType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class PostType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'Titre',
                'attr' => [
                    'placeholder' => '-- Saisissez votre titre --'
                ]
            ])
            ->add('slug', TextType::class, [
                'label' => 'Alias',
                'attr' => [
                    'placeholder' => '-- Saisissez un alias --'
                ]
            ])
            ->add('categories', EntityType::class, [
                'class' => Category::class,
                'choice_label' => 'name',
                'multiple' => true,
                'placeholder' => '-- Choisissez une catégorie --'
            ])
            ->add('image', FileType::class, [
                'label' => 'Choisissez une illustration',
                'constraints' => [
                    new File([
                        //'maxSize' => '1024k',
                        'mimeTypes' => [
                            'image/*',
                        ],
                        'mimeTypesMessage' => 'Vérifiez le format de votre image.',
                    ])
                ],
            ])
            ->add('content', TextareaType::class, [
                'label' => false
            ])
            ->add('publishedAt', DateTimeType::class, [
                'widget' => 'single_text',
                'label' => 'Date de publication ?'
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Enregistrer mon article',
                'attr' => [
                    'class' => 'w-100'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Post::class,
        ]);
    }
}
