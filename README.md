# Fantasy Readers

![](https://raw.github.com/puffnfresh/fantasy-land/master/logo.png)

## General

Reader represents a computation, which can read values from a shared environment, pass values 
from function to function, and execute sub-computations in a modified environment.

+ [Simple example](https://gist.github.com/dypsilon/883e878ca1c05a7c355e41fb28a2f3e3)
+ [Monad a day 1: Reader](https://vimeo.com/105300347): Short video by Brian Lonsdorf introducing the Reader Monad.

## Testing

### Library

Fantasy Readers uses [nodeunit](https://github.com/caolan/nodeunit) for 
all the tests and because of this there is currently an existing 
[adapter](test/lib/test.js) in the library to help with integration 
between nodeunit and Fantasy Check.

### Coverage

Currently Fantasy Check is using [Istanbul](https://github.com/gotwarlost/istanbul) 
for code coverage analysis; you can run the coverage via the following
command:

_This assumes that you have istanbul installed correctly._

```
istanbul cover nodeunit -- test/*.js
```
