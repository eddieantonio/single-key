# single-key

[![Build Status](https://travis-ci.org/eddieantonio/single-key.svg?branch=master)](https://travis-ci.org/eddieantonio/single-key)

Utilities for key-tagged values ([tagged unions][tu]).

[tu]: https://en.wikipedia.org/wiki/Tagged_union

# API

**NOTE**: All functions (except `isKeyTaggedValue`) throw
`NonConformingError`—a subtype of [TypeError][]—when the argument is not
a key-tagged value.

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
assert(isKeyTaggedValue(obj));

let obj = { foo: 'bar', 'herp': 'derp'};
assert(isKeyTaggedValue(obj) === false);

let obj = { [Symbol.iterator]: function*() { yield 'foo'; } };
assert(isKeyTaggedValue(obj) === false);
```

## `match`

> `match(obj: Object, cases: Object, otherwise: function|undefined): ?`

Similar to a switch statement on the key. Given a key-tagged value and
an object of function, calls the function whose name matches the key.
`match()` returns the result of the called function. An optional third
parameter is called when no match can be made.

The provided functions (including the third parameter) are called with
the value of the key-tagged value, and the key, respectively.

Throws `MatchError` when no callback is matched and no third parameter
is given.

```javascript
/* Standard match. */
let obj = { sypha: 'belnades' };
let value = match(obj, {
  trevor: () => 'vampire killer',
  sypha: () => 'magic',
  grant: () => 'daggers'
});

assert(value === 'magic');

/* No match found for the object. */
try {
  match(obj, {
    alucard: (val, key) => 'turning into a flippin bat'
  });
} catch (err) {
  assert(err instanceof MatchError);
}


/* Default provided to suppress MatchError. */
let value = match(obj,
  {
    alucard: (val, key) => 'turning into a flippin bat'
  },
  (val, key) => {
    return "No one knows.";
  }
);

assert(value === "No one knows.");
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

