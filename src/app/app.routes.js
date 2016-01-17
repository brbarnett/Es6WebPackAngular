'use strict';

var angular = require('angular');

angular
    .module('app')
    .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('default', {
            url: '/',
            onEnter: () => {
                console.log('default');
            }
        });
}