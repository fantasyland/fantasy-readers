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

const ReaderT = Reader.ReaderT(Identity)

exports.readerT = {
    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(ReaderT, run),
    'Identity (Applicative)': applicative.identity(λ)(ReaderT, run),
    'Composition (Applicative)': applicative.composition(λ)(ReaderT, run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(ReaderT, run),
    'Interchange (Applicative)': applicative.interchange(λ)(ReaderT, run),

    // Functor tests
    'All (Functor)': functor.laws(λ)(ReaderT.of, run),
    'Identity (Functor)': functor.identity(λ)(ReaderT.of, run),
    'Composition (Functor)': functor.composition(λ)(ReaderT.of, run),
    
    // Monad tests
    'All (Monad)': monad.laws(λ)(ReaderT, run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(ReaderT, run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(ReaderT, run),
    'Associativity (Monad)': monad.associativity(λ)(ReaderT, run)
};
