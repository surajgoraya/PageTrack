const express = require('express');
const {config} = require('./config');
const app = express();
const schedule = require('node-schedule');
const db = require('./db');



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', express.static('./ui'));

app.get('/api/version', function(req, res){
    return res.json({
        version: config.version,
    });
});

app.get('/api/tracked', function(req, res){
    return res.json({
        trackedSites: db.get('trackedSites')
    });
});

app.post('/api/add', function(req, res){
    if(req.body && req.body.site !== '' && req.body.tag !==''){
        
        db.get('trackedSites').push({url: req.body.site, tag: req.body.tag}).write();
        schedule.rescheduleJob(config.job, '*/30 * * * *');
        return res.status(200).json({
            trackedSites: db.get('trackedSites')
        });
    } else {
        return res.status(400).json('Bad Request');
    }
});

module.exports = app;