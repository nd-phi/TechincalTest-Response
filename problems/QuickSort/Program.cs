/*
- Divide and conquer strategy requires a pivot to be selected, this pivot will be used to split up the 1 array into smaller arrays
- We define the 'left' will be the index of the element less than pivot, and so on for the 'right | arr[left] < pivot < arr[right] (1)
*/

int[] arr = { 9, 5, 7, 1, 0, 1, 3, 4 };
QuickSort(arr);

void QuickSort(int[] arr)
{
    // print out the array when there is zero or one element
    if (arr.Length <= 1)
    {
        PrintResult(arr);
        Console.ReadLine();
        return;
    }

    Console.WriteLine("Starting sorting...");
    Conquer(arr, 0, arr.Length - 1);

    PrintResult(arr);
    Console.ReadLine();
}

void Conquer(int[] arr, int left, int right)
{
    // Nothing to do here since the index reaches the end of the array
    if (left >= right)
        return;
    
    // for everytime we conquer (sorting) the arr, we need to find the pivot index 
    // and from ther, we split up the arr into smaller ones
    var pivotIndex = Divide(arr, left, right);

    // sort the left side of pivot
    Conquer(arr, left, pivotIndex - 1);

    // sort the right side of pivot
    Conquer(arr, pivotIndex + 1, right);
}

int Divide(int[] arr, int left, int right)
{
    var pivot = arr[right];

    // this acts like a fence, any element in the left side of the fence is already less than the pivot
    var i = left - 1; 

    for (int j = left; j < right; j++)
    {
        if (arr[j] >= pivot)
            continue;

        // everytime we find the element that is less than the pivot, the fence shifts to the right by 1
        // then swap the arr[j] with arr[i]
        i += 1;
        Swap(arr, i, j);
    }

    // now we relocate the pivot, gurantee the rule (1) above
    var pivotIndex = i + 1;
    Swap(arr, pivotIndex, right);
    return pivotIndex;
}

void Swap(int[] arr, int left, int right)
{
    var temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
}

void PrintResult(int[] arr)
{
    foreach(int n in arr)
        Console.Write("{0}, ", n);
}