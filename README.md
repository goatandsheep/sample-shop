# sample-shop

Test for CoinSmart

## API 

Both endpoints should take only one parameter: an array of numbers called `unsortedNumbers`

### Edge cases

Many edge cases were eliminated before I ran the array through the sorting algorithm by scanning for incorrect inputs. Inputs had to be an array of all numbers with no null, empty or undefined values, including empty arrays. I even handled badly formed json input. I also had to make sure I didn't remove `0`. I parsed all numbers as floats so any numbers with precision that couldn't be handled get rounded up. This was picked up by testing the type of input and the array length, as well as checking each value in the array for arrays or non-numbers (strings representing numbers are still cool). At the beginning I checked to see if `BodyParser` threw a syntax error. I also timed out after 10 seconds.

If the array is empty, I just send the array back.

Both algorithms support negative, large, 0s, and big arrays. I error if there are more than 2^32 elements, but it's likely it will simple send a JSON error instead of a size error.

### POST /bubbleSort

> This endpoint will take in an array of numbers and rearrange them using the bubble sort algorithm 

#### Time Complexity

* **Worst**: O(n^2)
* **Average**: Θ(n^2)
* **Best**: Ω(n)

To reduce the time, I went through the entire array each time as opposed to stopping and restarting. Otherwise, the algorithm would have to check the entire beginning even if the only out of order section was at the end. Multiple changes can be made per pass.

The sorted flag allows us to only have to pass once for an already sorted array.

#### Space Complexity

`O(1)`: To reduce this, I made sure I was always modifying the same array.

### POST /mergeSort

> This endpoint will take in an array of numbers and rearrange them using the merge sort algorithm

#### Time Complexity

* **Worst**: O(n log(n))
* **Average**: Θ(n log(n))
* **Best**: Ω(n log(n))

It is generally the same complexity across all cases, but merging is pretty much the same. I made sure to reduce the number of loops to a single while loop per recursive iteration.

#### Space Complexity

`O(n)`: this was difficult because the recursive nature of merge sort. I suppose I could have kept a single copy of the array and kept track of the middles of each segment, but it was faster to implement this way and the space complexity is only `O(n)`.
