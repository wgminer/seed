'use strict';

app.filter('duration', function ($timeout, $location, $interval) {
    return function (duration) {

        var hours = Math.floor(duration / 3600000);
        var minutes = Math.floor((duration % 3600000) / 60000);
        var seconds = Math.round(((duration % 3600000) % 60000) / 1000); 

        if (hours == 0) {
            hours = '';
        } else {
            hours = hours + ':';
        }

        if (minutes == 0 && hours == 0) {
            minutes = '';
        } else if (hours != '' && minutes < 10) {
            minutes = '0' + minutes + ':';
        } else {
            minutes = minutes + ':';
        }

        if (minutes != '' && seconds < 10) {
            seconds = '0' + seconds;
        }

        return hours + minutes + seconds;

    };
});