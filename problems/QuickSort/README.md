# Quick Sort (Divide and conquer strategy)

## Table of Contents
- [Overview](#overview)
- [Drawbacks and Edge Cases](#drawbacks-and-edge-cases)
- [Relevance](#relevance)

## Overview

what do you think of this algorithm?
Quick sort is one of the most must-known algorithm as a developer, it's complexity is not that hugh but it's also friendly for im-memory sorting against large dataset.

## Drawbacks and Edge Cases

Does it have drawbacks or edge cases?
Any algorithm does have its own procs and cons, it really repends on the purpose. Here is my thoughts:
- Even it's a good approach for large dataset, but the performance still remains the same when the list is partially sorted. This is because the strategy always requires a pivot to be chosen and recursion performs the same work until the whole list is sorted properly.
- Choosing a pivot subjectively may introduces problems, thinking of a given list is already sorted ascendingly and the pivot is the last element and vice versa. This will lead to unbalance partitions and deep recursion. Alternatively, we can chose the pivot randomly instead of using the first or last element, it helps balance the performance for most of situation.

## Relevance

Is it relevant to implement in everyday projects?
- Due to its low stability, I believe the QuickSort may not be in-use for in modern development. Some of programing langugaes are using its enhanced version (2-pivot). Any frameword or library already provides built-in sorting methods, which shows better performance than hand-writing code.
- Though you may still implement it on your own but mostly for learing or education