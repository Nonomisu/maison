// pm2 : lancer avec « pm2 start ecosystem.config.js » depuis ~/maison-notifs.
module.exports = { apps: [{
  name: 'maison-notifs',
  script: 'notifs.js',
  cwd: __dirname,
  env: {
    DST_KEY: process.env.HOME + '/secrets/maison-cle.json',
    VAPID_KEY: process.env.HOME + '/secrets/maison-vapid.json',
    TZ: 'Europe/Paris',
  },
  max_memory_restart: '150M',
  restart_delay: 10000,
}] };
