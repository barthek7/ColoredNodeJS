var os = require('os');

function timeFormat(time){
    var formattedTime;
    if(time < 60){
        formattedTime = time + 's';
    }else if (time > 60 && time < 3600){
        var minutes = Math.floor((time/60));
        var seconds = time % 60;
        formattedTime = minutes + 'min ' + seconds + 's';
    } else if (time > 3600){
        var hours = Math.floor((time/3600));
        var minutes = Math.floor((time%3600)/60);
        var seconds = Math.floor((time%3600)%60);

        formattedTime = '' + hours + 'h ' + minutes + 'min ' + seconds + 's';
    }
    return formattedTime;
}

exports.print = timeFormat;