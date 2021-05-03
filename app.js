const chalk = require('chalk');
const notifier = require('node-notifier');
const {config, endpoints} = require('./lib');
const { emoji } = require('node-emoji');
const cheerio = require('cheerio');
const axios = require('axios').default;
const schedule = require('node-schedule');
const db = require('./lib/db');


const NC = new notifier.NotificationCenter({
    withFallback: false
});

console.log(chalk`{bold.dim.green ${emoji.wave} STARTED:} ${config.name} – {cyan ${config.version}}`);

endpoints.listen(config.port, () => {
    console.log(chalk`{bold.dim.green ${emoji.city_sunrise} STARTED:} UI, on http://localhost:${config.port}`);
});

schedule.scheduleJob(config.job, '*/30 * * * *', function(date){
    const dbEntries = db.get('trackedSites').value();

    dbEntries.forEach(async entry => {
        const entryCompare = db.get('compare').value().find(f => f.name === entry.url);
        const webpage = await axios.get(entry.url);

        if (webpage.status === 200) {
            console.log(chalk`{bold.dim.yellow ${emoji.sun_small_cloud} ${config.name}:} Checked ${entry.url}`);
            const htmlEl = cheerio.load(webpage.data)(entry.tag);

            if (entryCompare && entryCompare.old && htmlEl.html().toString() !== entryCompare.old) {
                console.log(chalk`{bold.dim.blue ${emoji.sparkles} ${config.name}:} ${entry.url} has changes! ${emoji.sparkles}`);
                notify(entry);
                db.get('compare').find({ name: entry.url }).assign({ old: htmlEl.html() }).write();
            } else if (!entryCompare) {
                console.log(chalk`{bold.dim.yellow ${emoji.champagne} ${config.name}:} First time running ${entry.url}!`);
                notify(entry, { firstTime: true });
                db.get('compare').push({ name: entry.url, old: htmlEl.html() }).write();
            }
        } else {
            notify(entry, { error: true });
            console.log(chalk`{bold.dim.red ${emoji.anguished} ${config.name}:} Error getting ${entry.url}, returned status code ${webpage.status}!`);
        }
    });
});


function notify(entry, options){
    if(options && options.firstTime){
        NC.notify({
            title: `${entry.url} ran for the first time!`,
            message: `Will check again in 30 mins, tap to open!`,
            sound: 'Funk',
            open: entry.url,
            timeout: 'Never'
        });
    } else if (options && options.error){
        NC.notify({
            title: `${entry.url} Couldn't load!`,
            message: `Check console, something went wrong.`,
            sound: 'Funk',
            open: entry.url,
            timeout: 'Never'
        });
    } else{
        NC.notify({
            title: `${entry.url} has changes!`,
            message: `This webpage has changes, tap to open!`,
            sound: 'Funk',
            open: entry.url,
            timeout: 'Never'
        });
    }
  
}

