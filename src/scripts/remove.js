const
    fs = require('fs'),
    readFile = fs.readFile,
    writeFile = fs.writeFile,
    process = require('process'),
    argv = process.argv,
    stdin = process.stdin,
    opts = {
        timestamp: 0,
        locale:'en'
    },
    argFn = {
        help() {
            console.log([
                'Help:',
                '    functions: help shows this help;',
                '    timestamp=<timestamp> : Required',
                '    locale=<your locale>',
                '    ',
            ].join('\n'));
            process.exit(0);
        }
    };

stdin.setEncoding('utf-8');

let functions = argv.filter((item) => item.match('help'))
if (functions.length > 0) {
    functions.forEach((fn) => argFn[fn]());
}

argv
    .filter((item) => item.match("=") != null)
    .map((item) => item.split('='))
    .map((item) => opts[item[0]] = item[1]);

if (opts.timestamp === '') {
    throw new Error('Timestamp is required: timestamp=1561587413125');
}

readFile('src/assets/post.json', (err, data) => {
    if (err == null) {
        let json = JSON.parse(data);
        if (opts.locale) {
            const selected = Object.keys(json)
                .filter((key) => key === opts.timestamp)
                .filter((key) => json[key].locale === opts.locale)[0];
            if (selected) {delete json[selected];}
        } else {
            delete json[opts.timestamp];
        }
        writeFile('src/assets/post.json', JSON.stringify(json), (err) => console.log(err));
    }
});
