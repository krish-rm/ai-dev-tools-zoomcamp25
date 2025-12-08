# Sample Code for Testing

This file contains sample code snippets for both JavaScript and Python to test the coding interview platform.

## Quick Test Code (Copy & Paste)

### JavaScript - Quick Test
```javascript
console.log("✅ Frontend is working!");
console.log("Testing code execution...");
let x = 10;
let y = 20;
console.log(`${x} + ${y} = ${x + y}`);
console.log("Code execution successful!");
```

### Python - Quick Test
```python
print("✅ Frontend is working!")
print("Testing code execution...")
x = 10
y = 20
print(f"{x} + {y} = {x + y}")
print("Code execution successful!")
```

---

## JavaScript Sample Code

### Sample 1: Basic Hello World
```javascript
console.log("Hello, World!");
console.log("Welcome to the Coding Interview Platform!");
```

### Sample 2: Variables and Operations
```javascript
let name = "Interview Candidate";
let age = 25;
let greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(greeting);
```

### Sample 3: Functions and Logic
```javascript
function calculateSum(a, b) {
    return a + b;
}

function isEven(number) {
    return number % 2 === 0;
}

let result1 = calculateSum(10, 20);
let result2 = isEven(15);

console.log("Sum of 10 and 20:", result1);
console.log("Is 15 even?", result2);
console.log("Is 16 even?", isEven(16));
```

### Sample 4: Array Operations
```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let doubled = numbers.map(n => n * 2);
let evens = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((acc, n) => acc + n, 0);

console.log("Original array:", numbers);
console.log("Doubled:", doubled);
console.log("Even numbers:", evens);
console.log("Sum of all numbers:", sum);
```

### Sample 5: Object Manipulation
```javascript
let person = {
    name: "John Doe",
    age: 30,
    skills: ["JavaScript", "Python", "React"]
};

console.log("Person:", person);
console.log("Name:", person.name);
console.log("Number of skills:", person.skills.length);
console.log("Skills:", person.skills.join(", "));
```

### Sample 6: Algorithm - Find Maximum
```javascript
function findMax(numbers) {
    if (numbers.length === 0) return null;
    
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

let testArray = [3, 7, 2, 9, 1, 5, 8];
let maximum = findMax(testArray);

console.log("Array:", testArray);
console.log("Maximum value:", maximum);
```

### Sample 7: FizzBuzz (Classic Interview Question)
```javascript
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

console.log("FizzBuzz for numbers 1-20:");
fizzBuzz(20);
```

### Sample 8: Palindrome Checker
```javascript
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

let testWords = ["racecar", "hello", "A man a plan a canal Panama", "level"];

testWords.forEach(word => {
    console.log(`"${word}" is ${isPalindrome(word) ? 'a palindrome' : 'not a palindrome'}`);
});
```

### Sample 9: Async Operations (Promise)
```javascript
function simulateAsyncOperation(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Processed: ${data}`);
        }, 100);
    });
}

async function runAsync() {
    console.log("Starting async operations...");
    let result1 = await simulateAsyncOperation("Task 1");
    console.log(result1);
    let result2 = await simulateAsyncOperation("Task 2");
    console.log(result2);
    console.log("All operations completed!");
}

runAsync();
```

### Sample 10: Simple Calculator
```javascript
class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
    
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        if (b === 0) throw new Error("Cannot divide by zero");
        return a / b;
    }
}

let calc = new Calculator();
console.log("10 + 5 =", calc.add(10, 5));
console.log("10 - 5 =", calc.subtract(10, 5));
console.log("10 * 5 =", calc.multiply(10, 5));
console.log("10 / 5 =", calc.divide(10, 5));
```

---

## Python Sample Code

### Sample 1: Basic Hello World
```python
print("Hello, World!")
print("Welcome to the Coding Interview Platform!")
```

### Sample 2: Variables and String Formatting
```python
name = "Interview Candidate"
age = 25
city = "San Francisco"
greeting = f"Hello, my name is {name}, I'm {age} years old, and I live in {city}."
print(greeting)
```

### Sample 3: Functions and Logic
```python
def calculate_sum(a, b):
    return a + b

def is_even(number):
    return number % 2 == 0

def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Test the functions
print(f"Sum of 15 and 27: {calculate_sum(15, 27)}")
print(f"Is 42 even? {is_even(42)}")
print(f"Is 43 even? {is_even(43)}")
print(f"Factorial of 5: {factorial(5)}")
```

### Sample 4: List Operations
```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# List comprehensions
doubled = [n * 2 for n in numbers]
evens = [n for n in numbers if n % 2 == 0]
squares = [n ** 2 for n in numbers]

print(f"Original: {numbers}")
print(f"Doubled: {doubled}")
print(f"Even numbers: {evens}")
print(f"Squares: {squares}")
print(f"Sum: {sum(numbers)}")
print(f"Max: {max(numbers)}")
print(f"Min: {min(numbers)}")
```

### Sample 5: Dictionary Operations
```python
person = {
    "name": "John Doe",
    "age": 30,
    "skills": ["JavaScript", "Python", "React", "Node.js"],
    "location": "New York"
}

print(f"Name: {person['name']}")
print(f"Age: {person['age']}")
print(f"Skills: {', '.join(person['skills'])}")
print(f"Number of skills: {len(person['skills'])}")
print(f"Location: {person['location']}")
```

### Sample 6: Algorithm - Find Maximum in List
```python
def find_max(numbers):
    if not numbers:
        return None
    max_val = numbers[0]
    for num in numbers[1:]:
        if num > max_val:
            max_val = num
    return max_val

test_array = [3, 7, 2, 9, 1, 5, 8, 4, 6]
maximum = find_max(test_array)

print(f"Array: {test_array}")
print(f"Maximum value: {maximum}")
print(f"Using built-in max(): {max(test_array)}")
```

### Sample 7: FizzBuzz (Classic Interview Question)
```python
def fizz_buzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

print("FizzBuzz for numbers 1-20:")
fizz_buzz(20)
```

### Sample 8: Palindrome Checker
```python
def is_palindrome(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

test_words = [
    "racecar",
    "hello",
    "A man a plan a canal Panama",
    "level",
    "python",
    "madam"
]

for word in test_words:
    result = "✓ palindrome" if is_palindrome(word) else "✗ not a palindrome"
    print(f'"{word}" is {result}')
```

### Sample 9: Fibonacci Sequence
```python
def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

print("First 10 Fibonacci numbers:")
fib_sequence = fibonacci(10)
for i, num in enumerate(fib_sequence, 1):
    print(f"F({i-1}) = {num}")
```

### Sample 10: Prime Number Checker
```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

def find_primes(limit):
    return [n for n in range(2, limit + 1) if is_prime(n)]

print("Prime numbers up to 50:")
primes = find_primes(50)
print(primes)
print(f"\nTotal primes found: {len(primes)}")
```

### Sample 11: String Manipulation
```python
text = "Hello World from Python!"

print(f"Original: {text}")
print(f"Uppercase: {text.upper()}")
print(f"Lowercase: {text.lower()}")
print(f"Title case: {text.title()}")
print(f"Reversed: {text[::-1]}")
print(f"Word count: {len(text.split())}")
print(f"Character count: {len(text)}")
```

### Sample 12: Simple Calculator Class
```python
class Calculator:
    def __init__(self):
        self.history = []
    
    def add(self, a, b):
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a, b):
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a, b):
        result = a * b
        self.history.append(f"{a} * {b} = {result}")
        return result
    
    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        result = a / b
        self.history.append(f"{a} / {b} = {result}")
        return result
    
    def show_history(self):
        return self.history

calc = Calculator()
print(f"10 + 5 = {calc.add(10, 5)}")
print(f"10 - 5 = {calc.subtract(10, 5)}")
print(f"10 * 5 = {calc.multiply(10, 5)}")
print(f"10 / 5 = {calc.divide(10, 5)}")
print("\nCalculation history:")
for entry in calc.show_history():
    print(f"  {entry}")
```

### Sample 13: List Sorting and Searching
```python
numbers = [64, 34, 25, 12, 22, 11, 90, 5]

print(f"Original list: {numbers}")

# Built-in sort
sorted_numbers = sorted(numbers)
print(f"Sorted (ascending): {sorted_numbers}")

# Reverse sort
reverse_sorted = sorted(numbers, reverse=True)
print(f"Sorted (descending): {reverse_sorted}")

# Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

target = 25
index = binary_search(sorted_numbers, target)
if index != -1:
    print(f"Found {target} at index {index}")
else:
    print(f"{target} not found")
```

### Sample 14: Working with Tuples and Sets
```python
# Tuples
coordinates = [(1, 2), (3, 4), (5, 6), (7, 8)]
print("Coordinates:")
for x, y in coordinates:
    print(f"  ({x}, {y})")

# Sets
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

print(f"\nSet 1: {set1}")
print(f"Set 2: {set2}")
print(f"Union: {set1 | set2}")
print(f"Intersection: {set1 & set2}")
print(f"Difference (1 - 2): {set1 - set2}")
print(f"Symmetric difference: {set1 ^ set2}")
```

### Sample 15: Error Handling
```python
def safe_divide(a, b):
    try:
        result = a / b
        return f"{a} / {b} = {result}"
    except ZeroDivisionError:
        return "Error: Cannot divide by zero!"
    except TypeError:
        return "Error: Invalid input types!"

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, "2"))
```

### Sample 16: List Comprehensions (Advanced)
```python
# Generate list of squares
squares = [x**2 for x in range(1, 11)]
print(f"Squares 1-10: {squares}")

# Filter even numbers
evens = [x for x in range(1, 21) if x % 2 == 0]
print(f"Even numbers 1-20: {evens}")

# Nested list comprehension
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
print(f"3x3 Multiplication table:")
for row in matrix:
    print(f"  {row}")
```

### Sample 17: Dictionary Comprehensions
```python
# Create dictionary from list
names = ["Alice", "Bob", "Charlie", "Diana"]
name_lengths = {name: len(name) for name in names}
print("Name lengths:")
for name, length in name_lengths.items():
    print(f"  {name}: {length} characters")

# Filter dictionary
long_names = {k: v for k, v in name_lengths.items() if v > 4}
print(f"\nNames longer than 4 characters: {long_names}")
```

### Sample 18: Lambda Functions
```python
# Lambda with map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(f"Numbers: {numbers}")
print(f"Squared: {squared}")

# Lambda with filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Even numbers: {evens}")

# Lambda with sorted
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 35}
]
sorted_by_age = sorted(people, key=lambda p: p["age"])
print("\nPeople sorted by age:")
for person in sorted_by_age:
    print(f"  {person['name']}: {person['age']}")
```

### Sample 19: Generator Functions
```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1
    yield "Blast off!"

print("Countdown:")
for value in countdown(5):
    print(f"  {value}")

# Generator expression
squares_gen = (x**2 for x in range(1, 6))
print(f"\nSquares (generator): {list(squares_gen)}")
```

### Sample 20: File-like String Processing
```python
data = """Alice,25,Engineer
Bob,30,Designer
Charlie,28,Developer
Diana,32,Manager"""

print("Processing employee data:")
employees = []
for line in data.strip().split('\n'):
    name, age, role = line.split(',')
    employees.append({
        'name': name,
        'age': int(age),
        'role': role
    })

for emp in employees:
    print(f"{emp['name']} ({emp['age']}) - {emp['role']}")

print(f"\nTotal employees: {len(employees)}")
avg_age = sum(emp['age'] for emp in employees) / len(employees)
print(f"Average age: {avg_age:.1f}")
```

---

## Testing Tips

### General Tips
1. **Start Simple**: Begin with the quick test code to ensure code execution is working
2. **Test Output**: Make sure output statements (`console.log` for JS, `print()` for Python) show in the output panel
3. **Test Errors**: Try code with errors to see error handling
4. **Test Performance**: Try larger loops to test performance

### JavaScript Specific
- Use `console.log()` for all output
- Async operations work normally
- All modern JavaScript features are supported

### Python Specific
- **Pyodide Loading**: First Python execution may take a few seconds as Pyodide loads from CDN
- **Import Limitations**: Some Python standard library modules may not be available in Pyodide
- **Output Formatting**: Use `print()` for all output - it will appear in the output panel
- **Performance**: Pyodide runs in the browser, so very large computations may be slower than native Python

---

## How to Use

1. Start the application: `npm run dev`
2. Open `http://localhost:5173` in your browser
3. Click "Create Session" to create a new coding session
4. Select your language (JavaScript or Python) from the dropdown
5. Copy and paste any sample code from this file
6. Click "Run Code" to execute
7. View the output in the output panel on the right

---

## Common Issues

### JavaScript
- Make sure to use `console.log()` for output
- Check browser console for any errors

### Python
- **First Load Delay**: Pyodide takes a few seconds to load on first execution
- **Module Imports**: Not all Python standard library modules are available
- **Output**: Always use `print()` - output appears in the output panel
