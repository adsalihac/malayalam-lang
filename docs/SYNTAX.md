# MalayalamLang Language Syntax Guide

## Table of Contents
1. [Variables](#variables)
2. [Data Types](#data-types)
3. [Operators](#operators)
4. [Control Flow](#control-flow)
5. [Functions](#functions)
6. [Loops](#loops)
7. [Built-in Functions](#built-in-functions)

## Variables

Variables store data values. Use assignment syntax:

### Malayalam Unicode

```ml
പേര് = "നാരായണൻ"
പ്രായം = 25
ഉയരം = 5.8
```

### Manglish

```ml
pera = "narayanan"
prayam = 25
uyaram = 5.8
```

Variables don't need explicit type declarations. Types are inferred from values.

## Data Types

### Strings
```ml
വാർത്ത = "ഹലോ"
വാർത്ത = "Hello"
```

### Numbers
```ml
സംഖ്യ = 42
ദശാംശം = 3.14
```

### Booleans
```ml
സത്യം = സത്യം        // true
തെറ്റ് = തെറ്റ്        // false
```

### Null
```ml
കാലി = നൾ            // null
```

## Operators

### Arithmetic
```ml
കൂടുക = 5 + 3        // Addition
കുറയ്ക = 5 - 3        // Subtraction
ഗുണ = 5 * 3          // Multiplication
ഭാഗ = 6 / 2          // Division
ശിഷ്ടം = 10 % 3       // Modulo
```

### Comparison
```ml
a = 5
b = 10

a == b                // Equal
a != b                // Not equal
a < b                 // Less than
a > b                 // Greater than
a <= b                // Less than or equal
a >= b                // Greater than or equal
```

### Logical
```ml
കൂടെ (and)
അല്ലെങ്കിൽ (or)
അല്ല (not)

a കൂടെ b             // a and b
a അല്ലെങ്കിൽ b          // a or b
അല്ല a               // not a
```

### Assignment
```ml
x = 5                 // Basic assignment
x += 3                // x = x + 3
x -= 2                // x = x - 2
```

## Control Flow

### If Statement

#### Malayalam
```ml
എങ്കിൽ (വയസ് > 18) {
  കാണിക്കുക("വയസ്കൻ")
}
```

#### Manglish
```ml
enkil (vayas > 18) {
  kanikkuka("vayaskaan")
}
```

### If-Else Statement

```ml
എങ്കിൽ (വയസ് >= 18) {
  കാണിക്കുക("വയസ്കൻ")
} അല്ലെങ്കിൽ {
  കാണിക്കുക("ബാലൻ")
}
```

### If-Else If-Else

```ml
എങ്കിൽ (സ്കോർ >= 90) {
  കാണിക്കുക("എ+")
} അല്ലെങ്കിൽ എങ്കിൽ (സ്കോർ >= 80) {
  കാണിക്കുക("എ")
} അല്ലെങ്കിൽ എങ്കിൽ (സ്കോർ >= 70) {
  കാണിക്കുക("ബി")
} അല്ലെങ്കിൽ {
  കാണിക്കുക("സി")
}
```

## Functions

### Function Declaration

```ml
ഫങ്ക്ഷൻ പ്രിന്റ(വാർത്ത) {
  കാണിക്കുക(വാർത്ത)
}
```

### Function with Return

```ml
ഫങ്ക്ഷൻ കൂട്ടുക(a, b) {
  മടങ്ങി a + b
}

ഫലം = കൂട്ടുക(5, 3)
കാണിക്കുക(ഫലം)        // 8
```

### Function Examples

```ml
// Calculate square
ഫങ്ക്ഷൻ ചതുരം(x) {
  മടങ്ങി x * x
}

// Calculate area of circle
ഫങ്ക്ഷൻ വൃത്തത്തിന്റെ ഏരിയ(r) {
  മടങ്ങി 3.14 * r * r
}

കാണിക്കുക(ചതുരം(5))              // 25
കാണിക്കുക(വൃത്തത്തിന്റെ ഏരിയ(5))  // 78.5
```

## Loops

### While Loop

```ml
i = 0
എന്ത് (i < 5) {
  കാണിക്കുക(i)
  i = i + 1
}
```

### For Loop

```ml
എതിരായ (i = 0; i < 5; i = i + 1) {
  കാണിക്കുക(i)
}
```

### Loop Examples

Print numbers 1 to 10:
```ml
എതിരായ (i = 1; i <= 10; i = i + 1) {
  കാണിക്കുക(i)
}
```

Calculate sum:
```ml
ആകെ = 0
എതിരായ (i = 1; i <= 10; i = i + 1) {
  ആകെ = ആകെ + i
}
കാണിക്കുക(ആകെ)  // 55
```

## Built-in Functions

### Console Output

```ml
കാണിക്കുക("ഹലോ")
കാണിക്കുക(42)
കാണിക്കുക("a = ", 5)
```

### Type Checking

```ml
വാർത്ത = "നാരായണൻ"
കാണിക്കുക(typeof വാർത്ത)  // string
```

### String Functions

```ml
വാർത്ത = "മലയാളം"

// Length
കാണിക്കുക(length(വാർത്ത))

// Substring
കാണിക്കുക(substring(വാർത്ത, 0, 2))

// Uppercase
കാണിക്കുക(toUpperCase(വാർത്ത))

// Lowercase
കാണിക്കുക(toLowerCase(വാർത്ത))
```

### Math Functions

```ml
കാണിക്കുക(abs(-5))           // 5
കാണിക്കുക(sqrt(16))          // 4
കാണിക്കുക(pow(2, 3))         // 8
കാണിക്കുക(round(3.7))        // 4
കാണിക്കുക(floor(3.7))        // 3
കാണിക്കുക(ceil(3.2))         // 4
കാണിക്കുക(max(5, 10))        // 10
കാണിക്കുക(min(5, 10))        // 5
```

## Complete Examples

### Example 1: Simple Program

```ml
നാമം = "മലയാളം"
കാണിക്കുക("ഭാഷ: ")
കാണിക്കുക(നാമം)
```

### Example 2: Factorial

```ml
ഫങ്ക്ഷൻ factorial(n) {
  എങ്കിൽ (n <= 1) {
    മടങ്ങി 1
  }
  മടങ്ങി n * factorial(n - 1)
}

കാണിക്കുക(factorial(5))  // 120
```

### Example 3: FizzBuzz

```ml
എതിരായ (i = 1; i <= 15; i = i + 1) {
  എങ്കിൽ (i % 15 == 0) {
    കാണിക്കുക("FizzBuzz")
  } അല്ലെങ്കിൽ എങ്കിൽ (i % 3 == 0) {
    കാണിക്കുക("Fizz")
  } അല്ലെങ്കിൽ എങ്കിൽ (i % 5 == 0) {
    കാണിക്കുക("Buzz")
  } അല്ലെങ്കിൽ {
    കാണിക്കുക(i)
  }
}
```

## Comments

Use `//` for single-line comments:

```ml
// This is a comment
കാണിക്കുക("Hello")  // Output
```
