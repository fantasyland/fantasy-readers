'use strict';

const λ = require('./lib/test');
const applicative = λ.applicative;
const functor = λ.functor;
const monad = λ.monad;
const identity = λ.identity;
const Reader = λ.Reader;
const Identity = λ.Identity;

function run(a) {
    return a.run();
}

exports.reader = {

    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(Reader, run),
    'Identity (Applicative)': applicative.identity(λ)(Reader, run),
    'Composition (Applicative)': applicative.composition(λ)(Reader, run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(Reader, run),
    'Interchange (Applicative)': applicative.interchange(λ)(Reader, run),

    // Functor tests
    'All (Functor)': functor.laws(λ)(Reader.of, run),
    'Identity (Functor)': functor.identity(λ)(Reader.of, run),
    'Composition (Functor)': functor.composition(λ)(Reader.of, run),

    // Monad tests
    'All (Monad)': monad.laws(λ)(Reader, run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Reader, run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Reader, run),
    'Associativity (Monad)': monad.associativity(λ)(Reader, run)
};

exports.readerT = {

    // Monad tests
    'All (Monad)': monad.laws(λ)(Reader.ReaderT(Identity), run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Reader.ReaderT(Identity), run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Reader.ReaderT(Identity), run),
    'Associativity (Monad)': monad.associativity(λ)(Reader.ReaderT(Identity), run)
};
