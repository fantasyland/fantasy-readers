var Reader = require('./reader');

exports.testConstructor = function(test) {
    test.equal(
        5,
        Reader(function(env) {
            return env.length;
        }).run("Hello")
    );
    test.done();
};

exports.testOf = function(test) {
    test.equal(
        5,
        Reader.of(5).run({})
    );
    test.done();
};

exports.testChain = function(test) {
    test.equal(
        8,
        Reader.ask.chain(function(s) {
            return Reader.of(s.length + 3);
        }).run("Hello")
    );
    test.done();
};
