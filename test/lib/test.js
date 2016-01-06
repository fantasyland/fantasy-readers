'use strict';

const λ = require('fantasy-check/src/adapters/nodeunit');
const applicative = require('fantasy-check/src/laws/applicative');
const functor = require('fantasy-check/src/laws/functor');
const monad = require('fantasy-check/src/laws/monad');
    
const daggy = require('daggy');

const {isInstanceOf} = require('fantasy-helpers');
const {constant, identity} = require('fantasy-combinators');

const Identity = require('fantasy-identities');
const Reader = require('../../fantasy-readers');

const isIdentity = isInstanceOf(Identity);
const isReader = isInstanceOf(Reader);
const isIdentityOf = isInstanceOf(identityOf);

Identity.prototype.traverse = function(f, p) {
    return p.of(f(this.x));
};

function identityOf(type) {
    const self = this.getInstance(this, identityOf);
    self.type = type;
    return self;
}

const λʹ = λ
    .property('applicative', applicative)
    .property('functor', functor)
    .property('monad', monad)
    .property('Reader', Reader)
    .property('Identity', Identity)
    .property('isIdentity', isIdentity)
    .property('identityOf', identityOf)
    .method('arb', isIdentityOf, function(a, b) {
        return Identity.of(this.arb(a.type, b - 1));
    });

// Export
if(typeof module != 'undefined')
    module.exports = λʹ;
