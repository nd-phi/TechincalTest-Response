using System.Text.RegularExpressions;

Console.Write("Input: ");
var input = Console.ReadLine();

if (string.IsNullOrEmpty(input))
{
    Console.WriteLine("Invalid input!");
    return;
}

var regexPattern = "[a-zA-Z0-9]";
var chars = input.ToCharArray();

var charsToBeChecked = new List<char>();

foreach(var c in chars)
{
    // ignore all but alphanumeric characters
    if (Regex.IsMatch(c.ToString(), regexPattern))
        charsToBeChecked.Add(c);
}

if (charsToBeChecked.Count() == 0)
{
    Console.WriteLine("Invalid input!");
    return;
}

Console.WriteLine(PalindromeCheck(charsToBeChecked).ToString());

bool PalindromeCheck(List<char> chars)
{
    int maxLength = chars.Count;
    int maxIndex = maxLength - 1;
    int end = maxIndex;
    int steps = maxLength / 2;
    bool checker = true;

    // stop the loop once either checker is false or nothing left to verify
    while (checker && steps > 0)
    {
        int start = maxIndex - end;

        // starting from both ends of the string
        var letterStart = chars[start];
        var letterEnd = chars[end];

        checker = char.ToLowerInvariant(letterStart) == char.ToLowerInvariant(letterEnd);
        end--;
        steps --;
    }

    return checker;
}