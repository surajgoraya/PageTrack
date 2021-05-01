const chalk = require('chalk');
const notifier = require('node-notifier');
const {config, endpoints} = require('./lib');
const { emoji } = require('node-emoji');

const NC = new notifier.NotificationCenter({
    withFallback: false
});

console.log(chalk`{bold.dim.green ${emoji.wave} STARTED:} ${config.name} – {cyan ${config.version}}`);

endpoints.listen(config.port, () => {
    console.log(chalk`{bold.dim.green ${emoji.city_sunrise} STARTED:} UI, on http://localhost:${config.port}`);
});

