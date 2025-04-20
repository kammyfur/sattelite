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

global.mpws = require('./version');
global.log = require('./log')
global.serverRoot = __dirname + "/..";
global.fs = require('fs')
log.info("Reading configuration...")
global.config = require('../global/config.json')
log.info("Checking configuration integrity...")
log.verbose("Checking 'port'")
if (isNaN(config.port)) {
    log.error("'port' is invalid")
}
log.verbose("Checking 'document_root'")
if (typeof config.document_root == 'string') {
    log.info("Loading storage module...")
    if (config.document_root.startsWith(".")) {
        global.wwwdata = __dirname + "/../" + config.document_root
        global.private = __dirname + "/../" + config.document_root + "/../private";
    } else {
        global.wwwdata = config.document_root
        global.private = config.document_root + "/../private";
    }
    if (fs.existsSync(wwwdata)) {
        log.info("Will start Satellite at " + wwwdata)
        log.info("Checking for port availability...")
        log.verbose("Running server/check.js/check")
        require('./check.js').check()
    } else {
        log.error("'document_root' cannot be found")
    }
} else {
    log.error("'document_root' is invalid")
}