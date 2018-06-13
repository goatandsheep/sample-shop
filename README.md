# sample-shop

Test for CoinSmart

## API 

Both endpoints should take only one parameter: an array of numbers called `unsortedNumbers`

### Edge cases

Many edge cases were eliminated before I ran the array through the sorting algorithm by scanning for incorrect inputs. Inputs had to be an array of all numbers with no null, empty or undefined values, including empty arrays. I even handled badly formed json input. I also had to make sure I didn't remove `0`. I parsed all numbers as floats so any numbers with precision that couldn't be handled get rounded up. This was picked up by testing the type of input and the array length, as well as checking each value in the array for arrays or non-numbers (strings representing numbers are still cool). At the beginning I checked to see if `BodyParser` threw a syntax error. I also timed out after 10 seconds.

### POST /bubbleSort

> This endpoint will take in an array of numbers and rearrange them using the bubble sort algorithm 

#### Time Complexity

I'm sure you have all the time and space complexities memorized

* **Worst**: O(n^2)
* **Average**: Θ(n^2)
* **Best**: Ω(n)



### POST /mergeSort

> This endpoint will take in an array of numbers and rearrange them using the merge sort algorithm
