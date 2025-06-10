/**
 * 'fizz'
 * fizzbuzz(3)
 * => 'buzz'
 * fizzbuzz(5)
 * => 'fizzbuzz'
 * fizzbuzz(15)
 * => 7
 * fizzbuzz(7)
 */
function fizzbuzz(n) {
    if (n % 5 === 0 && n % 3 === 0) {
      return "fizzbuzz";
    } else if (n % 3 === 0) {
      return "fizz";
    } else if (n % 5 === 0) {
      return "buzz";
    }
    return n;
  }