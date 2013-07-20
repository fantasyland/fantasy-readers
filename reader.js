var daggy = require('daggy'),
    Reader = daggy.tagged('run');

// Methods
Reader.of = function(a) {
    return Reader(function(e) {
        return a;
    });
};
Reader.prototype.chain = function(f) {
    var reader = this;
    return Reader(function(e) {
        return f(reader.run(e)).run(e);
    });
};
Reader.ask = Reader(function(e) {
    return e;
});

// Derived
Reader.prototype.map = function(f) {
    return this.chain(function(a) {
        return Reader.of(f(a));
    });
};
Reader.prototype.ap = function(a) {
    return this.chain(function(f) {
        return a.map(f);
    });
};

// Transformer
Reader.ReaderT = function(M) {
    var ReaderT = daggy.tagged('run');
    ReaderT.lift = function(m) {
        return ReaderT(function(b) {
            return m;
        });
    };
    ReaderT.of = function(a) {
        return ReaderT(function(e) {
            return M.of(a);
        });
    };
    ReaderT.prototype.chain = function(f) {
        var reader = this;
        return ReaderT(function(e) {
            return reader.run(e).chain(function(a) {
                return f(a).run(e);
            });
        });
    };
    ReaderT.ask = ReaderT(function(e) {
        return M.of(e);
    });
    return ReaderT;
};

// Export
if(typeof module != 'undefined')
    module.exports = Reader;
