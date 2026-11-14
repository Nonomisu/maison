# Maison — services du VPS

Deux services pm2, à côté de ceux qui tournent déjà (quiz-bot, journee-rp, iloh-*, s9-*), sans les toucher :

| Service | Rôle | Quand |
|---|---|---|
| `maison-notifs` | notifications push sur vos téléphones | en continu |
| `maison-sauvegarde` | copie de toute la base dans `~/sauvegardes/maison` (12 gardées) | chaque dimanche à 6 h |

Clés (jamais dans ce dépôt, droits 600) :
- `~/secrets/maison-cle.json` : clé de service Firebase du projet `maison-6b9f4` ;
- `~/secrets/maison-vapid.json` : clés des notifications, créées sur le VPS.

## Installation

```sh
git clone https://github.com/Nonomisu/maison.git ~/maison-depot
cp -r ~/maison-depot/vps/notifs ~/maison-notifs
cp -r ~/maison-depot/vps/sauvegarde ~/maison-sauvegarde
cd ~/maison-notifs && npm install --omit=dev && npm test
cd ~/maison-sauvegarde && npm install --omit=dev && npm test
cd ~/maison-notifs && npx web-push generate-vapid-keys --json > ~/secrets/maison-vapid.json && chmod 600 ~/secrets/maison-vapid.json
node -e "console.log(require(process.env.HOME+'/secrets/maison-vapid.json').publicKey)"   # clé publique à mettre dans app/vapid.js
pm2 start ~/maison-notifs/ecosystem.config.js
pm2 start ~/maison-sauvegarde/ecosystem.config.js
pm2 save
```

## Mise à jour

```sh
cd ~/maison-depot && git pull
cp ~/maison-depot/vps/notifs/*.js ~/maison-notifs/ && pm2 restart maison-notifs
```

## Vérifier

- `pm2 logs maison-notifs --lines 30`
- `node ~/maison-sauvegarde/verifier.js` (dernière sauvegarde)
