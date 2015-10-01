'use strict';

app.factory('Local', function () {

    var user = false;
    var token = false;
    var songs = {
        playlist: [],
        offset: 0
    };

    return {
        user: user,
        token: token,
        songs: songs
    };
});

app.factory('Queue', function () {

    var queue = [];

    return {
        create: function (newQueue) {
            queue = newQueue
        },
        add: function (songs, next) {
            if (next) {

            } else {
                queue = queue.concat(songs);
            }
        }
    }
});

app.factory('Player', function ($rootScope) {

    var player;
    var options = {
        onload: function() {
            console.log('loaded');
        },
        onfinish: function () {
            console.log('finished');
        }
    }

    var init = function (song_id, autoplay) {

        if (player) {
            $rootScope.$broadcast('playerStop', player);
            player.stop();
        }

        SC.stream('/tracks/' + song_id, options, function (sound){
            player = sound;
            player.song_id = song_id;
            if (autoplay) {
                player.play();
                $rootScope.$broadcast('playerStatusChange', player);
            }
        });
    };

    var toggle = function (song_id) {
        if (player && player.song_id == song_id) {
            player.togglePause(song_id);
            $rootScope.$broadcast('playerStatusChange', player);
        } else {
            init(song_id, true);   
        }
    }

    var progress = function () {
        return (player.position / player.duration * 100);
    }

    return {
        init: init,
        toggle, toggle,
        progress: progress
    };
});