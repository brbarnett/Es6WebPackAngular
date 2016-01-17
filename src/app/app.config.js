'use strict';

var angular = require('angular');

angular
    .module('app',
        [
            'ui.router',
            require('oclazyload'),
            require('./home/home.routes').name
        ]);

//require('./app.routes');