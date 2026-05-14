// Malayalam Factorial Example
// ഫാക്ടോറിയൽ ഉദാഹരണം

ഫങ്ക്ഷൻ factorial(n) {
  എങ്കിൽ (n <= 1) {
    മടങ്ങി 1
  }
  മടങ്ങി n * factorial(n - 1)
}

കാണിക്കുക("Factorial Numbers:")
കാണിക്കുക("factorial(5) = ")
കാണിക്കുക(factorial(5))

കാണിക്കുക("factorial(10) = ")
കാണിക്കുക(factorial(10))
