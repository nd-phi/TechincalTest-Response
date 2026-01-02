
const string Fizz = "Fizz";
const string Buzz = "Buzz";

Console.Write("Input: ");
var input = Console.ReadLine();

if (int.TryParse(input.ToString(), out int number))
{
    for (int i = 1; i <= number; i++)
    {
        Console.WriteLine(FizzBuzzResoler(i));
    }
}
else
{
    Console.WriteLine("Invalid input!");
}

string FizzBuzzResoler(int numb)
{
    // Fizz and Buzz appear in once only when the number is a common multiple of 3 and 5
    if (numb % 3 == 0 && numb % 5 == 0)
    {
        return string.Concat(Fizz, Buzz);
    }

    if (numb % 3 == 0)
    {
        return Fizz;
    }

    if (numb % 5 == 0)
    {
        return Buzz;
    }

    return numb.ToString();
}