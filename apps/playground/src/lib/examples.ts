export interface Example {
  id: string;
  label: string;
  description: string;
  code: string;
  icon: string;
}

export const EXAMPLES: Example[] = [
  {
    id: 'hello-world',
    label: 'Hello World',
    description: 'ഹലോ ലോകം – first program',
    icon: '👋',
    code: `// ഹലോ, ലോകം! – Hello, World!
കാണിക്കുക("ഹലോ, ലോകം!")
കാണിക്കുക("Hello from MalayalamLang!")
`,
  },
  {
    id: 'variables',
    label: 'Variables',
    description: 'Variable declarations and operations',
    icon: '📦',
    code: `// വേരിയബിൾ ഉദാഹരണം – Variables Example
പേര് = "അർജുൻ"
പ്രായം = 25
ഗ്രേഡ് = "A"

കാണിക്കുക("പേര്:")
കാണിക്കുക(പേര്)

കാണിക്കുക("പ്രായം:")
കാണിക്കുക(പ്രായം)

// Arithmetic / ഗണിതം
x = 10
y = 20
കാണിക്കുക("x + y =")
കാണിക്കുക(x + y)
കാണിക്കുക("x * y =")
കാണിക്കുക(x * y)
`,
  },
  {
    id: 'conditionals',
    label: 'Conditionals',
    description: 'if/else statements',
    icon: '🔀',
    code: `// ഉപാധി ഉദാഹരണം – Conditionals Example
എണ്ണം = 10

എങ്കിൽ (എണ്ണം > 5) {
  കാണിക്കുക("വലിയ സംഖ്യ!")
} അല്ലെങ്കിൽ {
  കാണിക്കുക("ചെറിയ സംഖ്യ!")
}

grade = 85

എങ്കിൽ (grade >= 90) {
  കാണിക്കുക("A ഗ്രേഡ്")
} അല്ലെങ്കിൽ {
  എങ്കിൽ (grade >= 80) {
    കാണിക്കുക("B ഗ്രേഡ്")
  } അല്ലെങ്കിൽ {
    കാണിക്കുക("C ഗ്രേഡ്")
  }
}
`,
  },
  {
    id: 'loops',
    label: 'Loops',
    description: 'while and for loops',
    icon: '🔄',
    code: `// ആവർത്തനം – Loops Example
കാണിക്കുക("1 മുതൽ 5 വരെ:")

// for loop
എതിരായ (i = 1; i <= 5; i++) {
  കാണിക്കുക(i)
}

// while loop
കാണിക്കുക("While ഉദാഹരണം:")
count = 1
എന്ത് (count <= 3) {
  കാണിക്കുക(count)
  count = count + 1
}
`,
  },
  {
    id: 'functions',
    label: 'Functions',
    description: 'Function declarations and calls',
    icon: '⚙️',
    code: `// ഫങ്ക്ഷൻ ഉദാഹരണം – Functions Example
ഫങ്ക്ഷൻ greet(name) {
  കാണിക്കുക("നമസ്കാരം,")
  കാണിക്കുക(name)
}

ഫങ്ക്ഷൻ add(a, b) {
  മടങ്ങി a + b
}

ഫങ്ക്ഷൻ square(n) {
  മടങ്ങി n * n
}

greet("ലക്ഷ്മി")
കാണിക്കുക("5 + 3 =")
കാണിക്കുക(add(5, 3))
കാണിക്കുക("7² =")
കാണിക്കുക(square(7))
`,
  },
  {
    id: 'factorial',
    label: 'Factorial',
    description: 'Recursive factorial computation',
    icon: '🔢',
    code: `// ഫാക്ടോറിയൽ – Factorial (Recursive)
ഫങ്ക്ഷൻ factorial(n) {
  എങ്കിൽ (n <= 1) {
    മടങ്ങി 1
  }
  മടങ്ങി n * factorial(n - 1)
}

കാണിക്കുക("Factorial Results:")
കാണിക്കുക("5! =")
കാണിക്കുക(factorial(5))
കാണിക്കുക("10! =")
കാണിക്കുക(factorial(10))
`,
  },
  {
    id: 'fibonacci',
    label: 'Fibonacci',
    description: 'Fibonacci sequence generation',
    icon: '🌀',
    code: `// ഫിബോനാച്ചി – Fibonacci Sequence
ഫങ്ക്ഷൻ fib(n) {
  എങ്കിൽ (n <= 1) {
    മടങ്ങി n
  }
  മടങ്ങി fib(n - 1) + fib(n - 2)
}

കാണിക്കുക("Fibonacci Sequence (0-9):")
എതിരായ (i = 0; i < 10; i++) {
  കാണിക്കുക(fib(i))
}
`,
  },
  {
    id: 'calculator',
    label: 'Calculator',
    description: 'A simple calculator with functions',
    icon: '🧮',
    code: `// കാൽക്കുലേറ്റർ – Calculator
ഫങ്ക്ഷൻ add(a, b) {
  മടങ്ങി a + b
}

ഫങ്ക്ഷൻ subtract(a, b) {
  മടങ്ങി a - b
}

ഫങ്ക്ഷൻ multiply(a, b) {
  മടങ്ങി a * b
}

ഫങ്ക്ഷൻ divide(a, b) {
  എങ്കിൽ (b == 0) {
    കാണിക്കുക("Error: Zero division!")
    മടങ്ങി 0
  }
  മടങ്ങി a / b
}

കാണിക്കുക("10 + 5 =")
കാണിക്കുക(add(10, 5))
കാണിക്കുക("10 - 5 =")
കാണിക്കുക(subtract(10, 5))
കാണിക്കുക("10 * 5 =")
കാണിക്കുക(multiply(10, 5))
കാണിക്കുക("10 / 5 =")
കാണിക്കുക(divide(10, 5))
`,
  },
];

export const getExampleById = (id: string): Example | undefined =>
  EXAMPLES.find((e) => e.id === id);

export const DEFAULT_EXAMPLE_ID = 'hello-world';
