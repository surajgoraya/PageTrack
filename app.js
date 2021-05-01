const chalk = require('chalk');
const notifier = require('node-notifier');
const pjson = require('./package.json');

const NC = new notifier.NotificationCenter({
    withFallback: false
});

NC.notify({
    title: 'VacciTrack',
    message: 'Changes to webpage',
    sound: 'Funk',
});

console.log(chalk`{bold.dim.green STARTED:} VacciTrack – {cyan ${pjson.version}}`);