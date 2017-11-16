const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    glob = require('glob'),
    routes = glob.sync('./routes/*.js');

app.use(bodyParser.json({ limit: '20mb' }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Expose-Headers', 'token');
    next();
});


routes.forEach(route => {
    require(route)(app);
});

app.use(express.static(path.join(__dirname, './FrontEnd')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './FrontEnd/app/index.html'));
});

http.listen(3000, () => {
    console.log('App listening on port ' + 3000);
});
