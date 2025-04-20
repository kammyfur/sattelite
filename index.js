/*
 * MIT License
 *
 * Copyright (c) 2022- Minteck
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

// 2025 hotfix
const fs = require('fs');
if (!fs.existsSync(".git")) fs.mkdirSync(".git");
if (!fs.existsSync(".git/HEAD")) fs.writeFileSync(".git/HEAD", "______");
if (!fs.existsSync(".git/_")) fs.writeFileSync(".git/_", "0000000000000000000000000000000000000000");
// Rest of the code is unchanged

const cluster = require('cluster');
global.mpws = require('./server/version');

if (cluster.isMaster) {
    console.log("")
    console.log("Minteck Satellite Server");
    console.log("version " + mpws.version);
    console.log("");
    console.log("Copyright (c) " + mpws.copyright + " Minteck");
    console.log("All Rights Reserved");
    console.log("");

    for (let i = 0; i < require('os').cpus().length; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log("[" + worker.id + "] " + "Process " + worker.process.pid + " died");
        cluster.fork();
    });
} else {
    require('./server/core');
}
