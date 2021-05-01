const chalk = require('chalk');
const notifier = require('node-notifier');
const {Arguments, config} = require('./lib');
const fs = require('fs');
const track = require('./track.json');
const { emoji } = require('node-emoji');
const arguments = Arguments.processArgument(process.argv);

console.log('\n');

if (arguments.length && arguments.includes('add')){
    const webpageToWatch = arguments[arguments.indexOf('add') + 1];
    track.websites.push(webpageToWatch);
    fs.writeFileSync('track.json', JSON.stringify(track), {
        encoding: 'utf8'
    });

    console.log(chalk`{bold.dim.cyan ${emoji.ok_hand} ADDED:} ${webpageToWatch} to watch list`);
    console.log(chalk`{bold.dim.white ${emoji.sparkles} INFO:} Run with no arguments to start the app ${emoji.sparkles}`);
    process.exit(0);
}

const NC = new notifier.NotificationCenter({
    withFallback: false
});

console.log(chalk`{bold.dim.green ${emoji.wave} STARTED:} ${config.name} – {cyan ${config.version}}`);

