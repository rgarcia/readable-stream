// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var common = require('../common.js');
var assert = require('assert');
var Writable = require('../../writable');
var Readable = require('../../readable');

var util = require('util');

function TestWriter() {
    Writable.call(this);
}
util.inherits(TestWriter, Writable);

TestWriter.prototype._write = function (buffer, callback) {
    callback(null);
};

var dest = new TestWriter();

function TestReader() {
    Readable.call(this);
}
util.inherits(TestReader, Readable);

TestReader.prototype._read = function (size, callback) {
    callback(new Buffer('hallo'));
};

var src = new TestReader();

for (var i = 0; i < 10; i++) {
    src.pipe(dest);
    src.unpipe(dest);
}

assert.equal(src.listeners('end').length, 0);
assert.equal(src.listeners('readable').length, 0);

assert.equal(dest.listeners('unpipe').length, 0);
assert.equal(dest.listeners('drain').length, 0);
assert.equal(dest.listeners('error').length, 0);
assert.equal(dest.listeners('close').length, 0);
assert.equal(dest.listeners('finish').length, 0);
