const
    fs = require('fs'),
    readFile = fs.readFile,
    writeFile = fs.writeFile,
    process = require('process'),
    argv = process.argv,
    stdin = process.stdin,
    fname = {
        date: new Date().getTime(),
        author:'barbatchov',
        title:'',
        locale:'en'
    },
    argFn = {
        help() {
            console.log([
                'Help:',
                '    functions: help shows this help;',
                '    author=<Author name> : Required',
                '    title=<Title> : Required',
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
    .map((item) => fname[item[0]] = item[1]);

if (fname.author === '') {
    throw new Error('Author is required: author="My title"');
}
if (fname.title === '') {
    throw new Error('Title is required: title="My title"');
}

function dash(str) {
    return str.toLowerCase()
    .replace(/[áàãâª]+/g, 'a').replace(/[éê]+/g, 'e').replace(/[í]+/g, 'i')
    .replace(/[óôõº]+/g, 'o').replace(/[úü]+/g, 'u').replace(/[ç]+/g, 'c')
    .replace(/[$]+/g, 's').replace(/[%]+/g, 'pct').replace(/\W+/g, '_')
}

let newFileName = [fname.date, dash(fname.author), dash(fname.title), fname.locale].join('-') + '.md',
    textBase = [
        '# ' + fname.title,
    ].join('\n');

writeFile('src/assets/' + newFileName, textBase, (err) => console.log(err));
readFile('src/assets/post.json', (err, data) => {
    if (err == null) {
        let json = JSON.parse(data);
        json[fname.date] = {author:fname.author, title:fname.title, text:newFileName};
        
        writeFile('src/assets/post.json', JSON.stringify(json), (err) => console.log(err));
    }
});