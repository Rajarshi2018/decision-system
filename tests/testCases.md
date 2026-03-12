Test Cases

1 Happy Path
Input: {score:85}
Expected: approve

2 Reject Case
Input: {score:30}
Expected: reject

3 Manual Review
Input: {score:60}

4 Invalid Input
Input: {score:"abc"}

5 Duplicate Request
Same request twice

6 External Failure
Simulated API failure

7 Retry Flow
External service fails then succeeds