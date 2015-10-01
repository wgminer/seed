'use strict';

app.controller('SplashCtrl', function ($scope, $location, $rootScope, $interval, $timeout, $routeParams) {

});

app.controller('PlaylistCtrl', function ($scope, $cookies, $location, $rootScope, $interval, $timeout, $routeParams, Local) {

    $scope.paginate = function (offset) {
        SC.get('/users/' + Local.user.id + '/favorites?offset=' + Local.songs.offset, function (callback) {
           
            Local.songs.playlist = Local.songs.playlist.concat(callback);
            Local.songs.offset += 50;

            $scope.playlist = Local.songs.playlist;            
            $scope.$apply();

        });
    }

    var init = function () {

        $scope.songs = Local.songs.playlist;

        if (Local.user && typeof Local.user.errors == 'undefined') {

            if (Local.songs.playlist.length == 0) {
                $scope.paginate();
            }

        } else {
            if ($cookies.get('token')) {
                SC.initialize({
                    client_id: 'a7aad5a5edff30939d765de438dd2184',
                    redirect_uri: 'http://localhost:3000/#/connect',
                    access_token: $cookies.get('token')
                }).get('/me', function (me, error) {
                    if (error) {
                        console.log('ERROR: ' + error);
                        $location.path('/')
                    } else {
                        Local.user = me;
                        $scope.paginate();
                    }                    
                });
            } else {
                $location.path('/');
            }
        }
    }
    
    init();


});