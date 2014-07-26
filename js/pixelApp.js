/**
 * Created by Lae on 7/14/2014.
 */

'use strict';

var pixelApp = angular.module('pixelApp',['ngRoute','ui.utils', 'ui.bootstrap']);


pixelApp.config(function routing($routeProvider)
{
    $routeProvider.when('/',
        {
            templateUrl: '../directory/home.html',
            controller: 'homeController'
        }
    );

    $routeProvider.when('/portal',
        {
            templateUrl: '../directory/portal.html',
            controller: 'portalController'
        }
    );

    $routeProvider.otherwise(
        {
            redirectTo: '/'
        }
    );
});




