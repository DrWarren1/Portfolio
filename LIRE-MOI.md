# Portfolio Warren Comuce

## Ouvrir le site

Double-cliquez sur **index.html**. Gardez ce fichier, les quatre fichiers JavaScript, la feuille de style et le dossier `assets` ensemble. Le site est autonome : les photos, les logos, les polices et Three.js sont embarqués.

L’aperçu local de la session utilise http://127.0.0.1:8765. Cette adresse fonctionne sur cet ordinateur tant que le serveur reste actif. Il ne s’agit pas d’une publication sur Internet.

## Ce qui a changé

- Palette noir, or, blanc et violet, typographie et composition refaites.
- Sculpture mécanique originale en WebGL : rotation par glissement ou flèches du clavier, remise à zéro avec la touche Début, vue éclatée et réassemblage.
- Tracé doré à la souris, navigation flottante placée en haut, animations d’apparition.
- Sélecteur FR / EN dans la navigation. Tous les contenus, les projets, les fiches détaillées et les libellés d’interface sont traduits.
- Mise en page élargie sur grand écran pour mieux occuper l’espace disponible.
- Pause des animations et respect du réglage système de réduction des mouvements. Aperçu statique si WebGL est indisponible.
- Douze projets, filtres par domaine, fiches avec galeries et indications de provenance.
- Logos du CNAM, de Mécavenir, de l’IUT de Saint-Denis / Sorbonne Paris Nord et de BOUMA.
- Nouvelle alternance chez BOUMA à Buc à partir du 21 septembre 2026, sans inventer d’intitulé de poste.
- Présentation du stage EDF de juillet–août 2026.

## Modifier le contenu

**data.js** : liste des projets en français. Chaque entrée contient titre, catégorie, contexte, présentation, démarche, résultat et galerie. Pour ajouter une photographie, placez-la dans `assets`, puis renseignez son nom dans `image` et/ou `gallery`. Les couvertures schématiques sont indiquées comme illustrations.

**i18n.js** : traductions anglaises du site et des projets.

**index.html** : présentation, parcours, formations et liens de contact. C’est ici qu’ajouter l’intitulé de poste BOUMA lorsqu’il sera connu.

**style.css** : couleurs en début de fichier (`--gold`, `--violet`, `--bg`), espacements et adaptations mobiles.

**scene.js** : sculpture 3D de présentation. C’est une création graphique, pas un modèle technique d’une réalisation de Warren.

## Contenu à compléter

La sélection couvre douze projets et expériences documentés. Elle ne prétend pas être un inventaire exhaustif de tous les travaux depuis le BUT. Certains TP incomplets ont été écartés. Les dates de fin chez GOGRY restent à préciser : le CV retrouvé mentionnait une échéance en 2027, devenue incohérente avec le changement d’entreprise.

Le prototype WaterFountain est présenté comme une étude avec des éléments mécaniques réalisés, conformément au rapport. Aucun résultat d’essai complet n’est annoncé. Les images de veille technologique de produits tiers n’ont pas été présentées comme des réalisations personnelles.

Le CV retrouvé n’a pas été ajouté au téléchargement car il indique encore une recherche d’alternance et des dates GOGRY à mettre à jour. Les rapports de travail et les programmes sources ne sont pas distribués avec le site.

## Publication

Le dossier est prêt pour un hébergement statique sur GitHub Pages.

## Vérifications effectuées

- Syntaxe des quatre fichiers JavaScript.
- Basculement complet français / anglais et mémorisation du choix.
- Chargement de la scène WebGL dans le navigateur.
- Vue éclatée, réassemblage et bouton de pause.
- Filtre Qualité : deux projets affichés.
- Ouverture de fiche, fermeture avec Échap et retour du focus.
- Chargement des logos et des images contrôlées.
- Navigation en haut et absence de débordement horizontal aux largeurs CSS testées : 390 et 1440 pixels.

Tests effectués dans le navigateur intégré, pas sur des téléphones physiques. Les sources sont répertoriées dans `SOURCES.md`.
