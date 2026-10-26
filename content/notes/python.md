---
title: Python
url: /notes/python.html
---


A run through the [Python Tutorial](https://docs.python.org/3/tutorial/index.html#tutorial-index), focusing on things less familiar.

### calculating

``` python
# floor division
print(15 // 6)
# modulo
print(15 % 6)
```

    2
    3

### text

-   escaping: `'doesn\'t'`
-   `print()` interpretes special characters, e.g. `\n`

``` python
# auto concat
print('Gen' 'etics')
txt = ('Gen'
       'etics')
print(txt)
```

    Genetics
    Genetics

-   `s[:i] + s[i:]` is always equal to `s`
-   slice indices point *between* characters

<!-- -->

    +---+---+---+---+---+---+
     | P | y | t | h | o | n |
     +---+---+---+---+---+---+
     0   1   2   3   4   5   6
    -6  -5  -4  -3  -2  -1

``` python
# out of range slicing is handled
word = "tree"; word[1:1123234]
```

    'ree'

### lists

-   lists, like strings are [sequence](https://docs.python.org/3/glossary.html#term-sequence) types - they can do slicing, len etc.
-   unlike strings, they are mutable

``` python
ltrs = ['a', 'b', 'c', 'd', 'e']
# remove elements 
ltrs[1:3] = []
ltrs
```

    ['a', 'd', 'e']

### programming basics

-   any non-zero integer is true, zero is false
-   any sequence with with non-zero length is true, empty sequences are false

### control flows

-   pointing to the same list

``` python
l1 = ['a', 'b', 'c']
l2 = l1
l2[1] = 'z'
print(l1)
```

    ['a', 'z', 'c']

-   when modifiying a colleciton, it's good to use a *copy* or create a *new* collection

``` python
pkm = {'pikachu': 'yellow', 'snorlax': 'grey-blue', 'scyther': 'green'}

# copy
for pk, col in pkm.copy().items():
    if pk == 'yellow':
        del pkm[pk]
```

> **copys**
>
> copys can be **shallow** or **deep**, the difference only matters for compound objects. A shallow copy creates a new compound object, and then inserts *references* to the objects found in the original. A deep copy creates a new compound object, and then recursively insert copies of the objects found in the original. The latter is best done using `deepcopy()`.

### range

``` python
print(range(42))
sum(range(17))
```

    range(0, 42)

    136

-   `range()` creates an *iterable*, something to loop over. It's like a lazy list.

### for-else

``` python
for i in range(16, 32):
    for x in range(3, i):
        if i % x == 0:
            print(i, x, i%x)
            break
    else:
        print('naaa')
```

    16 4 0
    naaa
    18 3 0
    naaa
    20 4 0
    21 3 0
    22 11 0
    naaa
    24 3 0
    25 5 0
    26 13 0
    27 3 0
    28 4 0
    naaa
    30 3 0
    naaa

### `match`

-\> TODO: come back to this.

Only the first pattern that matches gets executed!

``` python
def clothes(weather):
    match weather:
        case "rain":
            return "hardshell"
        case "sun":
            return "shorts"
        case "hail":
            return "woolhat"
        case "cloudy" | "foggy" | "humid":
            return "merino baselayer"
        case _: # wildcard
            return "Adidas Spezial"
```

### functions

``` python
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end =' ')
        a, b = b, a+b
fib(2000)
```

    0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 
