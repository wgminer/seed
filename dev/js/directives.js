'use strict';

app.directive('body', function ($timeout, $location, $interval) {
    return {
        restrict: 'AEC',
        link: function link(scope, element, attrs) {}
    };
});

app.directive('connect', function ($cookies, $location, Local) {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {

            $(element).click(function () {
                SC.connect(function () {
                    SC.get('/me', function (me) {
                        Local.user = me;
                        $cookies.put('token', SC.accessToken());
                        $location.path('/' + Local.user.permalink);
                        scope.$apply();
                    });
                });
            });
        }
    };
});

app.directive('song', function ($cookies, $interval, Local, Player) {
    return {
        restrict: 'E',
        link: function link(scope, element, attrs) {

            scope.song.playing = false;
            var progress;

            scope.$on('playerStatusChange', function(event, data) {

                // Oh shit it's talking about me...better doing something about it...
                if (data.song_id == scope.song.id) {
                    scope.song.playing = !data.paused;

                    if (scope.song.playing) {
                        progress = $interval(function() {
                            scope.song.progress = Player.progress();
                        }, 333);
                    } else {
                        $interval.cancel(progress);
                    }

                    scope.$apply();
                }
            });

            scope.$on('playerStop', function(event, data) {

                // Ok, I should stop now...
                if (data.song_id == scope.song.id) {
                    $interval.cancel(progress);
                    scope.song.playing = false;
                    scope.song.progress = 0;
                    scope.$apply();
                }
            });

            $(element).dblclick(function () {
                Player.init(scope.song.id, true);
            });

            $(element).find('.song__play').click(function () {
                Player.toggle(scope.song.id);
            });

        }
    };
});