'use strict';

const daggy = require('daggy');
const {constant, identity} = require('fantasy-combinators');

const Reader = daggy.tagged('run');


// Methods
Reader.of = (a) => Reader(constant(a));

Reader.ask = Reader(identity);

Reader.prototype.chain = function(f) {
    return Reader((e) => f(this.run(e)).run(e));
};

// Derived
Reader.prototype.map = function(f) {
    return this.chain((a) => Reader.of(f(a)));
};

Reader.prototype.ap = function(a) {
    return this.chain((f) => a.map(f));
};

// Transformer
Reader.ReaderT = (M) => {
    const ReaderT = daggy.tagged('run');

    ReaderT.lift = (m) => ReaderT(constant(m));

    ReaderT.of = (a) => {
        return ReaderT((e) => M.of(a));
    };

    ReaderT.ask = ReaderT((e) => M.of(e));

    ReaderT.prototype.chain = function(f) {
        return ReaderT((e) => {
            return this.run(e).chain((a) => f(a).run(e));
        });
    };

    return ReaderT;
};

// Export
if(typeof module != 'undefined')
    module.exports = Reader;
