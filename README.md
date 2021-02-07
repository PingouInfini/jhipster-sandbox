# Table des matières

- [Table des matières](#table-des-matières)
- [Prérequis](#prérequis)
  - [Jhipster - Java - Node](#jhipster---java---node)
  - [PostgreSQL](#postgresql)
- [Créer une nouvelle app](#créer-une-nouvelle-app)
  - [Initialisation par jhipster](#initialisation-par-jhipster)
  - [Modélisation conceptuelle de données](#modélisation-conceptuelle-de-données)
  - [Créer une image docker](#créer-une-image-docker)
- [Tests en local](#tests-en-local)
  - [Préparation de la base de données](#préparation-de-la-base-de-données)
  - [Adapter la configuration](#adapter-la-configuration)
  - [Lancer l application](#lancer-l-application)

# Prérequis

## Jhipster - Java - Node

1. Suivre les instructions:
   [https://www.jhipster.tech/installation/](https://www.jhipster.tech/installation/)
   Voir paragraphe : `Local installation with NPM (recommended for normal users)]`

## PostgreSQL

1. Téléchargement de `postgres v12`
   -> [https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

1. Installation via `postgresql-12.5-1-windows-x64.exe`
   -> _retenez le mot de passe postgres spécifié à l'installation (ie: postgres)_

1. Création/Modification de deux variables d'environnement
   -> `PG_HOME` = `C:\Program Files\PostgreSQL\12\bin`
   -> `PATH` -> ajouter `";%PG_HOME%\bin"`

1. Vérifier l'installation en vous connectant à postgres
   ```sql
   psql -U postgres
   ```

# Créer une nouvelle app

## Initialisation par jhipster

```
? Which *type* of application would you like to create? Monolithic application (recommended for simple projects)
? [Beta] Do you want to make it reactive with Spring WebFlux? No
? What is the base name of your application? sandbox
? What is your default Java package name? com.capgemini
? Do you want to use the JHipster Registry to configure, monitor and scale your application? No
? Which *type* of authentication would you like to use? JWT authentication (stateless, with a token)
? Which *type* of database would you like to use? SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle, MSSQL)
? Which *production* database would you like to use? PostgreSQL
? Which *development* database would you like to use? PostgreSQL
? Do you want to use the Spring cache abstraction? Yes, with the Ehcache implementation (local cache, for a single node)


? Do you want to use Hibernate 2nd level cache? Yes
? Would you like to use Maven or Gradle for building the backend? Maven
? Which other technologies would you like to use?
? Which *Framework* would you like to use for the client? Angular
? Would you like to use a Bootswatch theme (https://bootswatch.com/)? [cf https://bootswatch.com/ pour choisir]
? Choose a Bootswatch variant navbar theme (https://bootswatch.com/)? [cf https://bootswatch.com/ pour choisir]
? Would you like to enable internationalization support? Yes
? Please choose the native language of the application French
? Please choose additional languages to install
? Besides JUnit and Jest, which testing frameworks would you like to use?
? Would you like to install other generators from the JHipster Marketplace? No
```

## Modélisation conceptuelle de données

Via le site `https://start.jhipster.tech/jdl-studio/` générer le modèle de données.

_exemple:_

```
entity Personne {
    nom String required,
    prenom String,
    dateDeNaissance Instant required,
    taille Integer
    couleurYeux Couleur
}

entity Organisation {
    appellation String required,
    description String,
    dateCreation Instant
}

enum Couleur {
    BLEU, VERT, MARRON
}

relationship ManyToMany {
    Organisation{personne(nom)} to Personne{organisation}
}

// Set pagination options
paginate Personne, Organisation  with pagination

// Use Data Transfer Objects (DTO)
// dto * with mapstruct

// Set service options to all except few
service all with serviceImpl
```

Enregistrer le résultat de la modélisation dans un fichier `jhipster-jdl.jh` à stocker dans le répertoire du projet.
Ouvrir un terminal et se positionner dans le répertoire projet, puis lancer la commande

```
jhipster import-jdl jhipster-jdl.jh
```

## Créer une image docker

# Tests en local

Tests de l'application en local, via IDE Intellij.

## Préparation de la base de données

1. Connexion à postgres
   ```sql
   psql -U postgres
   ```
1. Création d'une base de données
   ```sql
   postgres=# create database connecteur;
   CREATE DATABASE
   ```
1. Autres commandes utiles
   1. Vider les données d'une table
      ```sql
      postgres=# TRUNCATE TABLE `table`
      ```
   1. Suppression/création d'une base de données
      ```
      postgres=# SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = ‘connecteur’;
      postgres=# drop database connecteur;
      postgres=# create database connecteur;
      ```

## Adapter la configuration

Mofidier le fichier `.\src\main\resources\config\application-dev.yml` et modifier `datasource` et `port` afin d'obtenir:

```
datasource:
  type: com.zaxxer.hikari.HikariDataSource
  url: jdbc:postgresql://localhost:5432/connecteur
  username: postgres
  password: postgres
[...]
server:
  port: 8087
```

## Lancer l application

Cliquer droit sur le ficher "package.json" > `Show npm Scripts`

### Lancer le back

Démarrer la `Sprint boot application` avec la main class `com.capgemini.SandboxApp`

### Lancer le front

Lancer le script npm `start`

### Vérifier que l'application fonctionne

http://localhost:8087/
