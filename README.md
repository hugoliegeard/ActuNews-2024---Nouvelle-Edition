# ActuNews 2024

Toutes les commandes listées dans ce document s'exécutent à la racine du projet.

## Configuration de la BDD

- Renommer le fichier `.env.local.dist` en `.env.local`
- Mettre à jour les paramètres de connexion :

```bash
DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7"
```

## Installation

L'installation se fait à l'aide de la commande :

```bash
composer install
php bin/console d:d:c
php bin/console d:s:u -f --complete
```

et la mise à jour (suite à un changement de branche par exemple) via cette commande :

```bash
composer update
php bin/console d:s:u -f --complete
```

## Fixtures

L'installation est automatique. \
Vous pouvez relancer les fixtures via la commande :

```bash
php bin/console d:f:l -q
```

Pour la génération des fixtures :

### Identifiants de test

Connexion en tant qu'`administrateur` :

> Email : admin@actu.news \
> Mot de passe : demo

Connexion en tant que `reporter` :

> Email : reporter@actu.news \
> Mot de passe : demo

Connexion en tant qu'`utilisateur` :

> Email : user@actu.news \
> Mot de passe : demo

## Lancer le serveur

Depuis la racine de votre projet, lancez la commande :

```bash
symfony serve -d
```