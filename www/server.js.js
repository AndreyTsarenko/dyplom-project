(function() {
    'use strict';

    var http        = require('http'),
        fs          = require('fs'),
        async       = require('async'),
        archiver    = require('archiver'),
        archive     = archiver('tar'),
        express     = require('express'),
        app         = express(),

        log         = console.log.bind(console),

        PORT        = 80;

    archive.on('error', log);

    app.get('/', function(req, res){
        res.send('<a href="/download.tar">download</a>');
    });

    app.get('/download.tar', download);

    app.listen(PORT);

    function download(mainReq, mainRes) {

        async.parallel([
            function(callback){
                request('/images/srpr/logo11w.png', function(data) {
                    callback(null, data)
                });
            },

            function(callback){
                request('/images/srpr/logo11w.png', function(data) {
                    callback(null, data);
                })
            }],

            function(error, results){
                var i, n, stream;

                log(error);
                log(results);

                n = results.length;

                for (i = 0; i < n; i++) {
                    stream  = results[i];
                    archive.append(stream, { name: 'logo' + i + '.png' });
                }

                archive.pipe(mainRes);
                archive.finalize(log);
            });
    }

    function request(path, callback) {
        var options = {
                hostname: 'www.google.com.ua',
                path: path
            },

            req = http.request(options, callback);

        req.on('error', log);
        req.end();
    }
})();