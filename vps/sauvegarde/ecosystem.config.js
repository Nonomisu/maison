// pm2 : « pm2 start ecosystem.config.js » depuis ~/maison-sauvegarde. Une sauvegarde part tout de suite,
// puis chaque dimanche à 6 h (après S9 à 5 h). Entre deux, le service apparaît « stopped » : c'est normal.
module.exports = { apps: [{
  name: 'maison-sauvegarde',
  script: 'sauvegarde.js',
  cwd: __dirname,
  env: { DST_KEY: process.env.HOME + '/secrets/maison-cle.json', TZ: 'Europe/Paris' },
  cron_restart: '0 6 * * 0',
  autorestart: false,
}] };
