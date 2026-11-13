# Maison

L'appli du foyer de Co et Emie : courses, tâches, missions, soirées, repas, réserves et santé des chats,
dans une maison en pixel art où Nahla, Bao et Tsunky gagnent des niveaux avec vous.

En ligne : https://nonomisu.github.io/maison/

## Comment c'est fait

- `src/Main.dc.html` : la maquette, source unique de l'appli (gabarit + logique).
- `outils/build.py` : transforme la maquette en `app/template.js` et `app/logic.js` (à relancer après chaque modification de la maquette).
- `app/runtime.js` : fait tourner la logique de la maquette avec Preact.
- `app/store.js` : enregistrement partagé (fusion des modifications faites en même temps, passage des jours).
- `app/sync.js` : connexion Google et Firestore (projet `maison-6b9f4`).
- `a/` : images et musiques.

Les règles Firestore (accès réservé aux deux comptes du foyer) sont dans la console Firebase, pas dans ce dépôt.
Aucune adresse e-mail n'est écrite dans le code.

## Essayer sans connexion

- `?essai` : la maquette de démonstration (date figée au 13 novembre 2026).
- `?essai=reel&moi=C` (ou `moi=E`) : la vraie appli avec un faux serveur dans le navigateur ;
  deux onglets se partagent les données.

## Avancement

1. Maquette transformée en appli, connexion Google, enregistrement partagé — fait
2. Vraie date, compte connecté (Co ou Emie), réglages de démo masqués — fait
3. Notifications push (rappels J-7, J-2, jour J, soirées, petits mots) via un service du VPS — à faire
4. Photos de recettes HelloFresh — à faire
