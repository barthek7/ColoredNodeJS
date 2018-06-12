var EventEmitter = require('events').EventEmitter;
var OSinfo = require('./modules/OSinfo');

var emitter = new EventEmitter();

emitter.on('beforeCommand', function(instruction){
    console.log('You wrote: ' + instruction + ' trying to run commnad.');

});

emitter.on('afterCommand', function(){
    console.log('Finished command.');
});

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function(){
    var input = process.stdin.read();
    if(input !== null){
        var instruction = input.toString().trim();
        emitter.emit('beforeCommand', instruction);
        switch(instruction){
            case '/exit':
                process.stdout.write('Quitting app!\n');
                process.exit();
                break;

            case '/showenv':
                var version = process.versions['node'];
                process.stdout.write('Node version: ' + version +'\n');
                if('LANG' in process.env){
                    var language = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;
                    process.stdout.write('Language: ' + language + '\n');
                }
                break;

            case '/getOSinfo':
                OSinfo.print();
                break;

            default:
                process.stderr.write('Wrong instruction!\n');
        }
        emitter.emit('afterCommand');
    }

});