"use strict";

exports.index = function(req, res) {
    res.type('text/html');

    var assetRoot = "/";
    if(process.env.NODE_ENV === 'dev'){
        assetRoot = 'http://localhost:7000/';
    }
    console.log("assetRoot: ", assetRoot);
    res.render('main', {
        pageTitle: 'WebPack+React+Redux Test',
        assetRoot: assetRoot
    });
};
