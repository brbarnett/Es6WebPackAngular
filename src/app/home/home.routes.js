'use strict';

var angular = require('angular');

angular
    .module('home.routes', [])
    .config(homeRoutes);

homeRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

function homeRoutes($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      template: require('html!./views/home.html'),
      controller: 'HomeController as vm',
      resolve: {
        loadHomeController: ($q, $ocLazyLoad) => {
          return $q((resolve) => {
            require.ensure([], () => {
              // load whole module
              let module = require('./home');
              $ocLazyLoad.load({name: 'home'});
              resolve(module.controller);
            });
          });
        }
      }
    })
}