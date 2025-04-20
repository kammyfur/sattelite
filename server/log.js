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

time = 0
const cluster = require('cluster');

function fix(number) {
    return "0000000000".substr(0, 10 - Math.round(number * 100000).toString().length) + Math.round(number * 100000).toString()
}

function fix2(number) {
    return "000".substr(0, 3 - number.toString().length) + number.toString();
}

if (cluster.worker) {
    cid = fix2(cluster.worker.id);
} else if (process.argv[2]) {
    cid = fix2(process.argv[2] - 1 + 1);
} else {
    cid = "---";
}

module.exports.info = function (logel) {
    time = fix(process.uptime());
    console.log("[" + cid + "] " + "[" + time + "] [info] " + logel);
}

module.exports.verbose = function (logel) {
    time = fix(process.uptime());
    if (config.verbose) {
        console.log("[" + cid + "] " + "[" + time + "] [verbose] " + logel);
    }
}

module.exports.warn = function (logel) {
    time = fix(process.uptime());
    console.log("[" + cid + "] " + "[" + time + "] [warn] " + logel);
}

module.exports.error = function (logel) {
    time = fix(process.uptime());
    console.log("[" + cid + "] " + "[" + time + "] [error] " + logel);
    process.exit()
}