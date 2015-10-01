'use strict';

angular.module('pileus', ['ngRoute', 'ngCookies', 'angularMoment']);
var app = angular.module('pileus');

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/splash.html',
            controller: 'SplashCtrl'
        })
        .when('/:username', {
            templateUrl: 'views/playlist.html',
            controller: 'PlaylistCtrl'
        });
});

app.run(function ($rootScope, $location, $cookies, Local) {

    if ($cookies.get('token')) {
        
        SC.initialize({
            client_id: 'a7aad5a5edff30939d765de438dd2184',
            redirect_uri: 'http://localhost:3000/#/connect',
            access_token: $cookies.get('token')
        });

        SC.get('/me', function (me, error) {
            if (error) {
                console.log('ERROR: ' + error);
                $location.path('/')
            } else {
                Local.user = me;
                $location.path('/' + Local.user.permalink);
            }
        });
    } else {
        SC.initialize({
            client_id: 'a7aad5a5edff30939d765de438dd2184',
            redirect_uri: 'http://localhost:3000/#/connect'
        }).get('/me', function (me) {
            Local.user = me;
            $location.path('/' + Local.user.permalink);
        });
    }

});