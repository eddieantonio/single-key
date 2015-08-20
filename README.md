# single-key

[![Build Status](https://travis-ci.org/eddieantonio/single-key.svg?branch=v0.1.0)](https://travis-ci.org/eddieantonio/single-key)

Utilities for key-tagged values ([tagged unions][tu]).

[tu]: https://en.wikipedia.org/wiki/Tagged_union

# API

**NOTE**: All functions throw `NonConformingError`, a subtype of
[TypeError][] when the argument is not a key-tagged value.

[TypeError]: http://www.ecma-international.org/ecma-262/6.0/#sec-native-error-types-used-in-this-standard-typeerror

## `unpack`

> `unpack(obj: Object): [key: String|Symbol, value: ?]`

Returns an array of two elements: the key and the value from the
key-tagged value.

```javascript
let [key, value] = unpack({ content: 42 });

assert(key === 'content');
assert(value === 42);
```


## `unpackObject`

> `unpackObject(obj: Object): {key: String|Symbol, value: ?}`

Same as [unpack](#unpack), but returns an object with keys, `key` and
`value`:

```javascript
let {key, value} = unpackObject({ content: 42 });

assert(key === 'content');
assert(value === 42);
```

## `onKey`

> `onKey(obj: Object, callbacks: Object): ?`

Like a switch statement on the key. Given a key-tagged value and an
object of callbacks, calls the callback associated with the key,
returning the callback's return value.

Throws `MatchError` when no callback is matched.


```javascript
let obj = { sypha: 'belnades' };
let value = onKey(obj, {
  trevor: () => 'vampire killer',
  sypha: () => 'magic',
  grant: () => 'daggers'
});

assert(value === 'magic');
```
