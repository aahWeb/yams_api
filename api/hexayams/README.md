# Migration vers l'Architecture Hexagonale

Ce document explique la transformation de notre application Node.js/Express de sa structure initiale vers une architecture hexagonale. Nous couvrirons les modifications clés, les avantages de l'architecture hexagonale, et la nouvelle organisation du code.

## Ancienne Architecture vs Architecture Hexagonale

### Ancienne Architecture

Dans la version initiale de l'application, le code était organisé de manière moins structurée, mélangeant la logique métier avec les détails d'implémentation comme l'accès aux données et la gestion des requêtes HTTP. Ce manque de séparation claire entre les différentes préoccupations du code rendait l'application moins modulaire, plus difficile à maintenir, et à tester.

### Architecture Hexagonale

L'architecture hexagonale, également connue sous le nom d'architecture orientée ports et adaptateurs, sépare nettement la logique métier des détails d'implémentation. Cela favorise une meilleure modularité, testabilité et flexibilité. Voici les points forts de cette approche :

- **Séparation des préoccupations** : Distinction claire entre la logique métier et l'infrastructure.
- **Flexibilité** : Facilité d'adaptation à de nouveaux outils ou frameworks.
- **Testabilité** : Facilité de tester la logique métier de manière isolée.

## Structure de Dossiers

L'application est organisée en plusieurs dossiers, chacun ayant un rôle spécifique :

### `src/domain/`

Cette partie de l'architecture hexagonale contient la logique métier pure de l'application. Elle est indépendante des détails techniques comme les bases de données ou les interfaces utilisateur.

#### **Entities**

Les entités sont des objets métier qui représentent les concepts clés de votre application. Elles encapsulent les données et le comportement associé à ces données.
On peut les comparer à des classes de modèles dans MVC, mais sans les détails d'implémentation. Les entités sont généralement des objets simples, avec des propriétés et des méthodes de base. Elles peuvent être utilisées dans toute l'application, et sont généralement partagées entre les services et les repositories, ils font office de types de données également

```ts
// src/domain/entities/Pastrie.ts
export interface Pastrie {
    id: string;
    name: string;
    // autres propriétés spécifiques à une pâtisserie
}
```

#### **Services**

Les services dans le domaine contiennent la logique métier centrale. Ils manipulent les entités et utilisent des repositories pour interagir avec la couche de données. Les services orchestrent le flux de données et assurent que les règles métier sont respectées.

Par exemple, un service de gestion des pâtisseries (`PastrieService`) peut offrir des fonctions pour ajouter, mettre à jour, supprimer ou récupérer des pâtisseries. Ces fonctions utilisent les entités `Pastrie` et peuvent faire appel à des repositories pour persister ces entités.

```ts
// src/domain/services/PastrieService.ts
import { Pastrie } from '../entities/Pastrie';
import pastrieRepository from '../../infrastructure/repositories/pastrieRepository';

export const PastrieService = {
    async getPastrieById(id: string): Promise<Pastrie | undefined> {
        // Logique métier pour récupérer une pâtisserie par son ID
    }

    // Autres méthodes métier...
}
```

En résumé, la section `src/domain/` de l'architecture hexagonale est cruciale pour isoler et gérer la logique métier de l'application. Elle comprend des entités qui représentent les concepts métier et des services qui contiennent les règles métier et la logique de manipulation de ces entités. Cette séparation claire favorise un code bien structuré, testable et facile à maintenir.

### `src/infrastructure/`

Cette couche d'infrastructure agit comme un adaptateur entre les détails techniques externes et la logique métier interne de l'application. Elle comprend tout ce qui est en rapport avec les interactions externes comme la base de données, les appels réseau, les systèmes de fichiers, etc.

#### **Repositories**

Les repositories dans `src/infrastructure/` sont responsables de la communication avec la base de données ou tout autre moyen de stockage de données. Ils implémentent les interfaces définies dans la couche du domaine pour accéder et manipuler les données, permettant ainsi à la logique métier de rester indépendante des détails de la base de données.

```ts
// src/infrastructure/repositories/UserRepository.ts

import { User } from '../../domain/entities/User';

export const UserRepository = {
    async readUsers(): Promise<User[]> {
        // Logique pour lire les utilisateurs depuis la base de données (le fichier JSON dans notre cas)
    },

    async writeUsers(users: User[]): Promise<void> {
        // Logique pour écrire les utilisateurs dans la base de données (le fichier JSON dans notre cas)
    },

    async getUserById(userId: string): Promise<User | undefined> {
        // Logique pour récupérer un utilisateur par son ID
    },

    filterSensitiveInfo(user: User): User {
        // pour des raisons de sécurité, on filtre les informations sensibles de l'utilisateur avant de le renvoyer
    }
};
```

#### **Controllers**

Les controllers dans `src/infrastructure/` gèrent les requêtes et réponses HTTP. Ils agissent comme des points d'entrée pour les requêtes entrantes de l'application. Les controllers utilisent les services du domaine pour exécuter la logique métier et renvoient les réponses appropriées au client.

```typescript
// src/infrastructure/web/controllers/PastrieController.ts

import { Request, Response } from 'express';
import pastriesService from '../../../domain/services/pastriesService';

export const PastrieController = {
    async getAll(req: Request, res: Response) {
        // Utiliser pastriesService pour obtenir et renvoyer les données
    }

    // Autres méthodes pour gérer différentes routes...
}
```

La couche `src/infrastructure/` est vitale pour séparer les détails techniques de la logique métier. En encapsulant les opérations spécifiques à l'infrastructure dans les repositories et les controllers, cette couche permet à l'application de rester flexible et adaptable à différents environnements ou technologies externes. Cela facilite les mises à jour, les tests et la maintenance de l'application.

### `src/config/`

Centralise la configuration et la gestion des variables d'environnement. Les variables d'environnement sont chargées dans un objet `Config` qui est exporté et utilisé dans toute l'application (utile pour les tests et la typesafety).

### `src/utils/`

Contient des fonctions utilitaires. Des fonctions utilisées dans plusieurs parties de l'application peuvent être placées ici pour éviter la duplication de code. Ca peut contenir un fichier `helper.ts` qui fait office de bibliothèque de fonctions utilitaires, ou alors des fichiers séparés pour chaque fonction.

## Conclusion

En passant à l'architecture hexagonale, notre application gagne en clarté, modularité et testabilité. Chaque composant a un rôle bien défini, rendant le code plus facile à comprendre et à maintenir. Cette architecture permet également une plus grande flexibilité pour des évolutions futures, comme le changement de la base de données ou l'intégration avec d'autres systèmes.
