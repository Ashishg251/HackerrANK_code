'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function isPfoundinG(g, p, i, j) {
    let pm = p.length, pn = p[0].length;
    for(let k=0;k<pm;k++) {
        let gString = g[i+k].slice(j, j+pn);
        console.log("p = ", JSON.stringify(p[k]));
        console.log("g = ", JSON.stringify(gString));
        if(JSON.stringify(p[k]) !== JSON.stringify(gString)) return false;
    }
    return true;
}

// Complete the gridSearch function below.
function gridSearch(G, P) {
    let gm = G.length, gn = G[0].length ;
    let pm = P.length, pn = P[0].length;
    for(let i=0;i<=gm-pm;i++) {
        for(let j=0;j<=gn-pn;j++) {
            if(G[i][j] === P[0][0] && isPfoundinG(G, P, i, j)) {
                return 'YES';
            }
        }
    }
    return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const RC = readLine().split(' ');

        const R = parseInt(RC[0], 10);

        const C = parseInt(RC[1], 10);

        let G = [];

        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const rc = readLine().split(' ');

        const r = parseInt(rc[0], 10);

        const c = parseInt(rc[1], 10);

        let P = [];

        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        let result = gridSearch(G, P);

        ws.write(result + "\n");
    }

    ws.end();
}
