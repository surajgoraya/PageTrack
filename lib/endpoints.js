const express = require('express');
const {config} = require('./config');
const app = express();
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
    if(req.body && req.body.site){
        
        db.get('trackedSites').push(req.body.site).write();

        return res.status(200).json({
            trackedSites: db.get('trackedSites')
        });
    } else {
        return res.status(400);
    }
});

module.exports = app;