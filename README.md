# Fanoron-Telo

## Section 1 : En-tête Institutionnel et Identification

- **Institut :** Institut Supérieur Polytechnique de Madagascar (ISPM)
- **Site web :** [www.ispm-edu.com](http://www.ispm-edu.com)
- **Projet :** Fanoron-Telo – Jeu Fanoron-Telo avec Intelligence Artificielle
- **Nom du groupe :** LastLights

### Membres du groupe

| Nom Complet                     | Numéro d'étudiant | Classe   | Rôle                                                             |
| ------------------------------- | ----------------: | -------- | ---------------------------------------------------------------- |
| HERMANCE Iangola Ny Aina Ashley |                17 | IMTICIA4 | Game Logic, Développeur IA                                       |
| RAZAKA Raharijao Johanna        |                18 | IMTICIA4 | Frontend : Interfaces du jeu, UI/UX                              |
| SETA Gaetanuo Moryantes         |                23 | IMTICIA4 | Project Manager : Intégration, Coordination et Gestion du projet |

---

## Section 2 : Description du Travail Réalisé

Le projet consiste à développer une version numérique du jeu traditionnel malgache **Fanoron-Telo** sous forme d'application web interactive.

### Fonctionnalités implémentées

- Plateau de jeu 3×3.
- Deux phases de jeu :
  - **Phase de placement** : chaque joueur place ses trois pions à tour de rôle.
  - **Phase de déplacement** : les joueurs déplacent leurs pions vers des intersections adjacentes libres.

- Détection automatique des victoires et des matchs nuls.
- Interface utilisateur moderne et responsive développée avec React et TypeScript.
- Fonctionnalités Undo / Redo.
- Chronomètre avec possibilité de pause.

### Modes de jeu

- **Humain vs Humain**
- **Humain vs IA**
  - IA Facile
  - IA Moyenne (Minimax)
  - IA Difficile (Alpha-Beta optimisé)

- **IA vs IA (Mode Démonstration)**
  - Facile
  - Moyen
  - Difficile

---

## Section 3 : Guide d'Installation Rapide

### 1. Cloner le dépôt

```bash
git clone <url_du_depot>
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application

```bash
npm run dev
```

---

## Section 4 : Outils d'Aide IA Utilisés

Les outils d'intelligence artificielle ont été utilisés comme assistants techniques afin d'accélérer certaines tâches de développement :

- Relecture et optimisation de code.
- Explication d'algorithmes d'intelligence artificielle.
- Support pour la résolution de problèmes techniques.

### Remarque importante

L'implémentation de l'intelligence artificielle du jeu a été réalisée par les membres du groupe dans le fichier :

```text
src/logic/ai.ts
```

---

## Section 5 : Modélisation et Algorithmes de l'IA

### Représentation de l'état du jeu

Le plateau est représenté sous forme d'un tableau de 9 cases :

```text
0 | 1 | 2
---------
3 | 4 | 5
---------
6 | 7 | 8
```

Chaque case peut contenir :

- `P1` : Joueur 1
- `P2` : Joueur 2
- `null` : case vide

Les connexions entre intersections sont représentées à l'aide d'une structure d'adjacence (`ADJACENCY`) permettant de gérer les déplacements durant la phase de mouvement.

### Algorithmes utilisés

#### IA Facile

L'IA choisit un coup valide de manière aléatoire parmi les coups disponibles.

#### IA Moyenne

L'IA utilise l'algorithme **Minimax**.

Principe :

- Simulation des coups possibles.
- Évaluation des états obtenus.
- Choix du coup maximisant les chances de victoire tout en supposant que l'adversaire joue de manière optimale.

#### IA Difficile

L'IA utilise **Minimax avec élagage Alpha-Beta**.

Cette optimisation permet :

- De réduire le nombre d'états explorés.
- D'améliorer les performances.
- D'obtenir le même résultat qu'un Minimax complet avec un temps de calcul plus faible.

### Fonction d'évaluation

La fonction d'évaluation attribue un score aux états du jeu :

- Victoire de l'IA : +100
- Victoire de l'adversaire : -100
- État neutre : 0

Des heuristiques complémentaires peuvent être ajoutées afin de valoriser :

- Les alignements partiels.
- Le contrôle du centre.
- Les opportunités de victoire futures.

---

## Section 6 : Analyses de Performances

### Temps de réponse

Les temps de calcul observés restent faibles grâce à la taille réduite du plateau :

| Niveau    | Algorithme | Temps moyen |
| --------- | ---------- | ----------- |
| Facile    | Aléatoire  | < 10 ms     |
| Moyen     | Minimax    | 10 à 50 ms  |
| Difficile | Alpha-Beta | 10 à 100 ms |

### Tests IA vs IA

Le mode démonstration permet de comparer automatiquement les comportements des différents niveaux d'intelligence artificielle.

Il constitue également un moyen efficace de :

- Vérifier la stabilité des algorithmes.
- Comparer les performances des niveaux.
- Observer le comportement stratégique des IA.

### Perspectives d'amélioration

- Tables de transposition (mémorisation des états déjà calculés).
- Iterative Deepening.
- Heuristiques avancées.
- Analyse statistique automatique des parties IA vs IA.

---

## Conclusion

Le projet Fanoron-Telo met en œuvre plusieurs concepts fondamentaux de l'intelligence artificielle appliquée aux jeux :

- Représentation d'état.
- Recherche dans un arbre de jeu.
- Algorithme Minimax.
- Élagage Alpha-Beta.
- Évaluation heuristique.

L'application propose plusieurs niveaux de difficulté ainsi qu'un mode démonstration IA contre IA permettant d'observer le comportement des algorithmes développés.
