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

module.exports.check = function () {
    log.verbose("Check init")
    var net = require('net');
    log.verbose("Net rq init ok")
    var server = net.createServer();
    log.verbose("net.createServer ok")

    server.once('error', function(err) {
        log.verbose("err: " + err.code)
        if (err.code === 'EADDRINUSE') {
            log.error("Port is busy, aborting.")
        } else {
            log.error("Cannot open port.")
        }
    });

    server.once('listening', function() {
        log.verbose("listening ok")
        log.info("Port is available")
        log.verbose("server close ok")
        server.close();
        server = undefined;
        log.verbose("http init start")
        log.info("Initialising HTTP module...")
        global.ws = require('./http.js')
        log.verbose("http init stop")
        ws.start()
        log.verbose("server start")
    });

    log.verbose("all ok")
    server.listen(config.port);
    log.verbose("listen ok")
}