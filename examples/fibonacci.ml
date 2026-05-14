// Malayalam Fibonacci Example
// ഫിബോനാച്ചി ഉദാഹരണം

ഫങ്ക്ഷൻ fib(n) {
  എങ്കിൽ (n <= 1) {
    മടങ്ങി n
  }
  മടങ്ങി fib(n - 1) + fib(n - 2)
}

കാണിക്കുക("Fibonacci Sequence:")
എന്ത് (i = 0; i < 10; i = i + 1) {
  കാണിക്കുക(fib(i))
}
