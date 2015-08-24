# single-key

[![Build Status](https://travis-ci.org/eddieantonio/single-key.svg?branch=master)](https://travis-ci.org/eddieantonio/single-key)

Utilities for key-tagged values ([tagged unions][tu]).

[tu]: https://en.wikipedia.org/wiki/Tagged_union

# API

**NOTE**: All functions throw `NonConformingError`, a subtype of
[TypeError][] when the argument is not a key-tagged value.

[TypeError]: http://www.ecma-international.org/ecma-262/6.0/#sec-native-error-types-used-in-this-standard-typeerror

## isKeyTaggedValue

> `isKeyTaggedValue(val: ?): Boolean`

Returns true if the value conforms to the key-tagged value protocol.
That is, it returns true if `val`:

 * is an object (note, an array counts as an object)
 * contains exactly *one* enumerable property name according to
   `Object.keys()` (note: symbols don't count as names, even if they are
   enumerable)

Otherwise, returns false.

```javascript
let obj = { foo: 'bar' };
assert(isKeyTaggedValue(obj);
```

## `match`

> `match(obj: Object, callbacks: Object): ?`

Like a switch statement on the key. Given a key-tagged value and an
object of callbacks, calls the callback whose name matches the key.
`match()` returns the result of the matching callback.

Throws `MatchError` when no callback is matched.


```javascript
let obj = { sypha: 'belnades' };
let value = onKey(obj, {
  trevor: () => 'vampire killer',
  sypha: () => 'magic',
  grant: () => 'daggers'
});

assert(value === 'magic');

try {
  onKey(obj, {
    alucard: () => 'turning into a flippin bat'
  });
} catch (err) {
  assert(err instanceof MatchError);
}
```

## `unpack`

> `unpack(obj: Object): [key: String, value: ?]`

Returns an array of two elements: the key and the value from the
key-tagged value.

```javascript
let [key, value] = unpack({ content: 42 });

assert(key === 'content');
assert(value === 42);
```


## `unpackObject`

> `unpackObject(obj: Object): {key: String, value: ?}`

Same as [unpack](#unpack), but returns an object with keys, `key` and
`value`:

```javascript
let {key, value} = unpackObject({ content: 42 });

assert(key === 'content');
assert(value === 42);
```

