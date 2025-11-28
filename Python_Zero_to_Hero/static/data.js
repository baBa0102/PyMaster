(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    // This line creates the global variable accessed by script.js
    root.PythonZeroToHeroLevels = factory(); 
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const levels = [
    {
      id: 1,
      title: "Variables & Memory",
      theory: `
            <p>Think of a <strong>Variable</strong> as a labeled box where you can store information. In Python, you don't need to specify the type (size) of the box beforehand; Python figures it out for you through **dynamic typing**.</p>
            <p><strong>Syntax:</strong> A variable is created the moment you first assign a value to it using the assignment operator (<code>=</code>).</p>
            <pre class="code-snippet">
player_name = "Alex"  # String (str)
score = 100           # Integer (int)
is_alive = True       # Boolean (bool)
pi_value = 3.14       # Float (float)
            </pre>
            <p>Variables must start with a letter or an underscore and are case-sensitive.</p>
        `,
      diagram_alt:'<img src="static/assets/images/level1.png" alt="Conceptual diagram of variables in memory. Labeled boxes \'player_name\', \'score\', \'is_alive\', \'pi_value\' point to data types like String, Integer, Boolean, Float, illustrating dynamic typing in Python.">',
      real_life: "Imagine a warehouse. 'score' is a sticker on a box. Inside the box is the number 100. If you change the score, you take 100 out and put 200 in.",
      challenge: "Create a variable named <code>hero</code> and assign it the string value 'Batman'. Then create an integer variable <code>power</code> with value 99.",
      expected_keywords: ["hero", "batman", "power", "99"],
      hint: "Use the equals sign = to assign values."
    },
    {
      id: 2,
      title: "Control Flow (If/Else)",
      theory: `
            <p>Code needs to make decisions. We use <strong>If</strong> statements to branch logic based on a condition (which evaluates to True or False).</p>
            <p><strong>Syntax:</strong> Decisions use logical operators (<code>==</code>, <code>></code>, <code><</code>, <code>>=</code>, <code><=</code>, <code>!=</code>) and end with a colon (<code>:</code>). Indentation defines the code block to be executed.</p>
            <pre class="code-snippet">
if health < 10:
    print("Warning!")
elif health < 50:
    print("Getting weak")
else:
    print("Keep fighting")
            </pre>
            <p>The <code>elif</code> keyword allows you to check multiple conditions, and <code>else</code> is the fallback if none of the preceding conditions were True. 




[Image of a flowchart decision diamond]


</p>
        `,
      diagram_alt: '<img src="static/assets/images/level2.png" alt="Flowchart showing decision points in code logic.">',
      real_life: "Like a traffic light. IF light is Red: Stop. ELSE IF light is Yellow: Slow down. ELSE: Go.",
      challenge: "Write an if statement that checks if the variable <code>age</code> is greater than or equal to 18. If true, print the string 'Adult'.",
      expected_keywords: ["if", "age", ">=", "18", "print", "adult"],
      hint: "Don't forget the colon `:` at the end of the if line!"
    },
    {
      id: 3,
      title: "Loops (Repetition)",
      theory: `
            <p>Loops allow you to execute a block of code repeatedly. The two main types are **For loops** and **While loops**.</p>
            <p><strong>For Loops:</strong> Used for iterating over a sequence (like numbers in a range, or items in a list). The <code>range(N)</code> function generates numbers from 0 up to (but not including) N.</p>
            <pre class="code-snippet">
for i in range(5):
    print(i) # Prints 0, 1, 2, 3, 4
            </pre>
            <p><strong>While Loops:</strong> Repeat as long as a specified condition is true.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level3.png" alt="Visual representation of loop iterations.">',
      real_life: "Like a factory conveyor belt. The machine performs the exact same action on every item that passes through.",
      challenge: "Write a loop that prints the string 'Hello' 10 times using the <code>range</code> function.",
      expected_keywords: ["for", "in", "range", "10", "print", "hello"],
      hint: "The syntax is: `for x in range(number):`"
    },
    {
      id: 4,
      title: "Functions: The Code Reuser",
      theory: `
            <p>A <strong>Function</strong> is a reusable block of code that only runs when it is called. Functions help organize code, improve readability, and avoid repetition (DRY Principle).</p>
            <p><strong>Syntax:</strong> Functions are defined using the <code>def</code> keyword, followed by the function name, parameters in parentheses, and a colon. The <code>return</code> keyword sends a value back to the caller.</p>
            <pre class="code-snippet">
def greet(name):
    return "Hello, " + name

message = greet("Basit")
            </pre>
            <p>Functions that don't explicitly use <code>return</code> implicitly return <code>None</code>.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level4.png" alt="Diagram illustrating function calls and returns.">',
      real_life: "A function is like a kitchen appliance (a toaster). You give it an input (bread), it does a task (toasts), and gives you an output (toast).",
      challenge: "Define a function called <code>add_numbers</code> that takes two arguments, <code>a</code> and <code>b</code>, and returns their sum (<code>a + b</code>).",
      expected_keywords: ["def", "add_numbers", "a", "b", "return", "+"],
      hint: "Remember to use the <code>def</code> keyword and a colon `:`."
    },
    {
      id: 5,
      title: "Lists (Mutable Sequences)",
      theory: `
            <p>A <strong>List</strong> is a collection of items which is **ordered** and **changeable (mutable)**. This is Python's most versatile collection type, and items can be of different data types.</p>
            <p><strong>Syntax & Methods:</strong> Lists are defined by square brackets <code>[]</code>. Items are accessed by index (starting at 0). Use the <code>.append()</code> method to add items to the end.</p>
            <pre class="code-snippet">
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits[0]) # Output: apple
            </pre>
        `,
      diagram_alt: '<img src="static/assets/images/level5.png" alt="Visual representation of a list and its elements.">',
      real_life: "A grocery list. It's ordered (you know the first item) and changeable (you can add or cross off items).",
      challenge: "Create a list named <code>scores</code> with the values <code>[80, 90, 75]</code>. Then, use a method to append the number <code>95</code> to the end of the list.",
      expected_keywords: ["scores", "[", "]", "80", "append", "95"],
      hint: "Use the `scores.append()` method to add the new value."
    },
    {
      id: 6,
      title: "Tuples (Immutable Sequences)",
      theory: `
            <p>A <strong>Tuple</strong> is a collection which is **ordered** but **unchangeable (immutable)**. This makes them faster and safer for fixed data, like coordinates or configuration settings.</p>
            <p><strong>Syntax:</strong> Tuples are defined by round brackets <code>()</code>. Once created, you cannot change, add, or remove items. Attempting to change an element raises a <code>TypeError</code>.</p>
            <pre class="code-snippet">
coordinates = (10.0, 20.5)
# coordinates[0] = 5  # This causes an ERROR!
print(coordinates[0])
            </pre>
        `,
      diagram_alt: '<img src="static/assets/images/level6.png" alt="Image comparing python list vs tuple structure with emphasis on mutability">',
      real_life: "A compass direction. Once set, the coordinates (Latitude, Longitude) of a point should never change, ideal for a tuple.",
      challenge: "Create a tuple named <code>rgb_color</code> representing the color red: <code>(255, 0, 0)</code>. Print the element at index 0.",
      expected_keywords: ["rgb_color", "(", ")", "255", "0", "print", "rgb_color[0]"],
      hint: "A tuple is defined using parentheses: `(item1, item2, ...)`"
    },
    {
      id: 7,
      title: "Dictionaries (Key-Value Pairs)",
      theory: `
            <p>A <strong>Dictionary</strong> is a collection of data stored as **key-value pairs**, optimized for extremely fast retrieval by key. Dictionaries are **changeable** and **unordered** (in Python versions before 3.7, after which they are insertion-ordered).</p>
            <p><strong>Syntax:</strong> Dictionaries use curly braces <code>{}</code>. Keys must be unique and immutable (like strings or numbers); values can be any data type.</p>
            <pre class="code-snippet">
user = {
    "name": "Tina",
    "level": 7
}
print(user["name"])
user["level"] = 8 # Changing a value
            </pre>
        `,
      diagram_alt: '<img src="static/assets/images/level7.png" alt="Diagram illustrating key-value pairs in a dictionary.">',
      real_life: "A phone book. You look up a person's name (the **key**) to find their phone number (the **value**).",
      challenge: "Create a dictionary named <code>item</code> with a key <code>'price'</code> and a value of <code>49.99</code>. Then, change the price value to <code>39.99</code>.",
      expected_keywords: ["item", "{", "price", "49.99", "39.99"],
      hint: "To change a value, use the key in square brackets: `dictionary_name['key'] = new_value`"
    },
    {
      id: 8,
      title: "Sets (Unique Elements)",
      theory: `
            <p>A <strong>Set</strong> is an **unordered** collection of **unique** and **unindexed** items. They are primarily used for mathematical set operations (union, intersection, difference) and efficiently removing duplicates.</p>
            <p><strong>Syntax:</strong> Sets are defined by curly braces <code>{}</code> (though an empty set is created with <code>set()</code>). Duplicate elements added to a set are automatically ignored.</p>
            <pre class="code-snippet">
numbers = {1, 2, 2, 3, 4, 4}
print(numbers) # Output: {1, 2, 3, 4}
numbers.add(5)
            </pre>
        `,
      diagram_alt: '<img src="static/assets/images/level8.png" alt="Image comparing python dictionary vs set syntax and use cases">',
      real_life: "A class roster. Each student's name must be unique. If you try to add a duplicate, it's ignored, ensuring only unique names remain.",
      challenge: "Create a set named <code>unique_ids</code> with values <code>{101, 102, 102, 103}</code>. Use the <code>print()</code> function to display the resulting set.",
      expected_keywords: ["unique_ids", "{", "101", "102", "103", "print"],
      hint: "The duplicates are handled automatically by Python when you define the set."
    },
    {
      id: 9,
      title: "String Manipulation",
      theory: `
            <p>Strings are sequences of characters. They are **immutable**, meaning methods like <code>.upper()</code> or <code>.replace()</code> return a *new* string rather than modifying the original.</p>
            <p><strong>Methods:</strong> Python provides rich built-in methods for strings, including changing case, finding substrings, and splitting text.</p>
            <pre class="code-snippet">
text = "python is fun"
capital = text.upper()
parts = text.split(" ")
            </pre>
            <p>The **f-string** (formatted string literal) provides an easy way to embed expressions inside string literals.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level9.png" alt="Diagram illustrating string manipulation techniques in Python.">',
      real_life: "Editing a Word document. You can change text to all caps, or find and replace instances of a word without damaging the core document.",
      challenge: "Take the string <code>data = 'hello,world,python'</code> and use the <code>.split()</code> method to break it into a list using the comma (<code>,</code>) as a delimiter.",
      expected_keywords: ["data", "split", ","],
      hint: "The method you need is `.split()` and it takes the delimiter (the comma) as an argument."
    },
    {
      id: 10,
      title: "Error Handling (Try/Except)",
      theory: `
            <p>The <strong>try...except</strong> block allows you to handle Errors (or Exceptions) gracefully, preventing the program from crashing. This is crucial for robust, industry-ready code.</p>
            <p><strong>Flow:</strong> If an error occurs in the <code>try</code> block, Python stops execution of that block and immediately executes the code in the matching <code>except</code> block. 




[Image of python try except flow diagram]


</p>
            <pre class="code-snippet">
try:
    result = 10 / 0
except ZeroDivisionError:
    result = "Cannot divide by zero"
            </pre>
            <p>You can specify the type of error (like <code>ZeroDivisionError</code>) or catch all errors with a generic <code>except:</code>.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level10.png" alt="Flowchart showing the process of a try-except block.">',
      real_life: "A fire alarm system. The alarm is ignored unless a fire (error) occurs, in which case the system executes the pre-planned response (except block).",
      challenge: "Write a <code>try/except</code> block to safely convert the string <code>'abc'</code> to an integer using <code>int('abc')</code>. The <code>except</code> block should print the string 'Invalid input'. (This conversion causes a <code>ValueError</code>).",
      expected_keywords: ["try", "except", "valueerror", "int('abc')", "print", "invalid input"],
      hint: "The specific error for converting a non-numeric string to an integer is `ValueError`."
    },

    // --- OOP BASICS ---

    {
      id: 11,
      title: "Introduction to OOP (Classes)",
      theory: `
            <p><strong>Object-Oriented Programming (OOP)</strong> is a paradigm based on the concept of "objects", which combine data (attributes) and functionality (methods). It structures programs for scalability and reusability.</p>
            <p>A **Class** is the blueprint for creating objects. It defines the common attributes and behaviors shared by all instances.</p>
            <pre class="code-snippet">
class Dog:  # The Blueprint
    # Class attributes apply to all instances
    species = "Canis familiaris" 

# Creating an object (Instance)
dog1 = Dog()
print(dog1.species)
            </pre>
            <p>Class names should follow the **PascalCase** convention (e.g., <code>MyClass</code>). </p>
        `,
      diagram_alt: '<img src="static/assets/images/level11.png" alt="Image of a python class blueprint showing attributes and methods">',
      real_life: "A cookie cutter is the **Class**. The dozens of actual cookies you bake are the **Objects** (Instances).",
      challenge: "Define a class named <code>Car</code>. Inside the class, set a **class attribute** called <code>wheels</code> equal to the number 4.",
      expected_keywords: ["class", "car", "wheels", "4"],
      hint: "Class names usually start with a capital letter (PascalCase)."
    },
    {
      id: 12,
      title: "The `__init__` Method (Constructor)",
      theory: `
            <p>The special method <strong><code>__init__</code></strong> (called the **Constructor**) is run immediately when a new object is created. It's used to initialize the object's unique, per-instance attributes.</p>
            <p><strong>The <code>self</code> Parameter:</strong> The first parameter, <code>self</code>, is a reference to the instance being created (the object itself). It's used to define instance attributes like <code>self.name = name</code>.</p>
            <pre class="code-snippet">
class Player:
    def __init__(self, name, health):
        self.name = name     # Instance attribute
        self.health = health # Instance attribute

player1 = Player("Zoe", 100)
            </pre>
        `,
      diagram_alt: '<img src="static/assets/images/level12.png" alt="Diagram illustrating the __init__ method and instance attributes.">',
      real_life: "When you buy a car (creating an object), the factory's assembly line (the constructor) automatically sets its unique color, VIN, and engine size.",
      challenge: "In the <code>Car</code> class, define the <code>__init__</code> method that accepts the parameter <code>color</code> and assigns it to a **self attribute** called <code>self.color</code>.",
      expected_keywords: ["def", "__init__", "self", "color", "self.color", "="],
      hint: "Don't forget the colon `:` at the end of the `def` line!"
    },
    {
      id: 13,
      title: "Instance Methods (Behaviors)",
      theory: `
            <p>Functions defined inside a class are called **Methods**. They define the actions or behaviors an object can perform and can access the object's unique data via the <code>self</code> parameter.</p>
            <p><strong>Syntax:</strong> Methods look just like functions but must take <code>self</code> as their first parameter.</p>
            <pre class="code-snippet">
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says Woof!"

my_dog = Dog("Buddy")
print(my_dog.bark())
            </pre>
        `,
      diagram_alt: '<img src="static/assets/images/level13.png" alt="Image illustrating a python object\'s methods and attributes">',
      real_life: "The car object has attributes (color, model) and methods like <code>start_engine()</code> and <code>brake()</code> that it can execute.",
      challenge: "Add a method called <code>get_info</code> to the <code>Car</code> class. This method should simply **return** the string 'This is a car'.",
      expected_keywords: ["def", "get_info", "self", "return", "this is a car"],
      hint: "The method definition should be correctly indented inside the class."
    },
    {
      id: 14,
      title: "Encapsulation (Public vs. Protected)",
      theory: `
            <p><strong>Encapsulation</strong> is the principle of bundling data (attributes) and the methods that operate on that data into a single unit (the Class). It also involves controlling access to prevent direct, unauthorized modification of data.</p>
            <p><strong>Access Control (Python Style):</strong> Python does not have true private fields. Instead, we use conventions:</p>
            <ul>
                <li>**Public (No prefix):** Can be accessed/modified freely.</li>
                <li>**Protected (Single Underscore \`_\`):** \`_balance\`. Indicates to other developers that the attribute should only be accessed within the class or its subclasses.</li>
                <li>**"Private" (Double Underscore \`__\`):** Triggers name mangling, making it harder, but not impossible, to access externally.</li>
            </ul>
        `,
      diagram_alt: '<img src="static/assets/images/level14.png" alt="Image illustrating data hiding and encapsulation in OOP">',
      real_life: "The inner workings of an ATM (your account balance) are encapsulated. You can't directly change the balance; you must use authorized methods (`deposit()` or `withdraw()`).",
      challenge: "Create a class <code>Settings</code> and define an attribute <code>_admin_key</code> with the value 'access'. Use the single underscore prefix (Protected Convention).",
      expected_keywords: ["class", "settings", "_admin_key", "access"],
      hint: "Remember to use the single underscore prefix for the attribute name."
    },
    {
      id: 15,
      title: "Inheritance (Reusing Code)",
      theory: `
            <p><strong>Inheritance</strong> is a mechanism that allows a new class (the **subclass** or **child**) to inherit all properties and methods from an existing class (the **superclass** or **parent**). This is fundamental to code reuse.</p>
            <p><strong>Syntax:</strong> The child class inherits by including the parent class name in parentheses when defined: <code>class Child(Parent):</code></p>
            <pre class="code-snippet">
class Animal: # Parent Class
    def eat(self):
        print("Eating...")

class Cat(Animal): # Child Class inherits from Animal
    def meow(self):
        print("Meow!")

my_cat = Cat()
my_cat.eat() # Inherited method
            </pre>
        `,
      diagram_alt: '<img src="static/assets/images/level15.png" alt="Image illustrating inheritance hierarchy with parent and child classes">',
      real_life: "In biology, 'Mammal' is the Parent Class. 'Dog', 'Cat', and 'Human' are Subclasses. They all inherit the methods of 'Mammal' like `breathe()` and `give_birth()`.",
      challenge: "Create a Parent class named <code>Weapon</code> with a method <code>attack</code> that prints the string 'Base attack'. Then create a Child class named <code>Sword</code> that inherits from <code>Weapon</code>.",
      expected_keywords: ["class", "weapon", "def", "attack", "print", "sword", "(weapon)"],
      hint: "To inherit, define the child class like: `class Child(Parent):`"
    },
    {
      id: 16,
      title: "Polymorphism (Many Forms)",
      theory: `
            <p><strong>Polymorphism</strong> (from Greek, meaning "many forms") is a core concept in Object-Oriented Programming (OOP) that allows objects of different classes to be treated as objects of a common superclass. This means you can use a single interface (like a method name) to represent different underlying forms (implementations).</p>
            <p>A common example is having a base class method (e.g., <code>speak()</code>) that child classes override with their own specific implementations.</p>
            <pre class="code-snippet">
class Animal:
    def speak(self):
        return "Generic animal sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

animals = [Dog(), Cat(), Animal()]
for animal in animals:
    print(animal.speak())
            </pre>
            <p>Here, the <code>speak()</code> method is called on each object, but it behaves differently based on the object's actual type. This promotes flexibility and code reusability.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level16.png" alt="Diagram illustrating polymorphism where different animal objects (Dog, Cat) respond to a common speak() method with their unique sounds.">',
      real_life: "Imagine a universal remote control. You can press the 'Power' button, and it turns on different brands of TVs, each responding in its own way to the same 'Power' signal.",
      challenge: "Create a base class <code>Shape</code> with a method <code>area()</code> that returns 0. Then create a child class <code>Circle</code> that inherits from <code>Shape</code> and overrides the <code>area()</code> method to return <code>3.14 * radius * radius</code>. Assume <code>Circle</code>'s constructor takes a `radius`.",
      expected_keywords: ["class", "Shape", "def", "area", "return", "Circle", "(Shape)", "radius", "3.14"],
      hint: "Remember to include `self` in method definitions and pass `radius` to the Circle's `__init__` method."
    },
    {
      id: 17,
      title: "Abstraction (Hiding Complexity)",
      theory: `
            <p><strong>Abstraction</strong> is the concept of hiding the complex implementation details and showing only the essential features of an object. It focuses on "what" an object does rather than "how" it does it.</p>
            <p>In Python, abstraction can be achieved using **abstract classes** and **abstract methods**. These are part of the <code>abc</code> (Abstract Base Classes) module.</p>
            <pre class="code-snippet">
from abc import ABC, abstractmethod

class Vehicle(ABC): # Abstract Base Class
    @abstractmethod
    def drive(self):
        pass # Abstract method, must be implemented by subclasses

    def honk(self): # Concrete method, can be used as is
        return "Beep beep!"

class Car(Vehicle):
    def drive(self):
        return "Driving a car smoothly."

# vehicle = Vehicle() # This would raise an error (cannot instantiate abstract class)
my_car = Car()
print(my_car.drive())
print(my_car.honk())
            </pre>
            <p>An abstract class cannot be instantiated directly, and any concrete (non-abstract) subclass must provide implementations for all abstract methods defined in its abstract parent.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level17.png" alt="Diagram illustrating abstraction: a Vehicle abstract class with an abstract drive() method and a concrete honk() method. A Car concrete class implements drive(), hiding the complex driving mechanics.">',
      real_life: "When you drive a car, you use the steering wheel and pedals (the interface). You don't need to understand the complex internal combustion engine or transmission mechanics (the hidden implementation details).",
      challenge: "Create an abstract base class <code>Logger</code> with an abstract method <code>log(message)</code>. Then create a concrete class <code>ConsoleLogger</code> that inherits from <code>Logger</code> and implements <code>log(message)</code> to print the message to the console.",
      expected_keywords: ["from", "abc", "import", "ABC", "abstractmethod", "class", "Logger", "(ABC)", "@abstractmethod", "def", "log", "pass", "ConsoleLogger", "(Logger)", "print", "message"],
      hint: "Remember to use `@abstractmethod` decorator and inherit from `ABC`."
    },
    {
      id: 18,
      title: "File I/O (Reading & Writing)",
      theory: `
            <p><strong>File I/O</strong> (Input/Output) in Python allows your programs to interact with files on your computer's disk. You can read data from files or write data to them.</p>
            <p>The <code>open()</code> function is used to open a file, specifying the file name and a mode ('r' for read, 'w' for write, 'a' for append).</p>
            <pre class="code-snippet">
# Writing to a file
with open("my_notes.txt", "w") as file:
    file.write("Python is fun!\n")
    file.write("Learning file I/O.\n")

# Reading from a file
with open("my_notes.txt", "r") as file:
    content = file.read()
    print("File content:\n", content)

# Appending to a file
with open("my_notes.txt", "a") as file:
    file.write("Appended new line.\n")

# Read again to see appended content
with open("my_notes.txt", "r") as file:
    updated_content = file.read()
    print("Updated file content:\n", updated_content)
            </pre>
            <p>It's best practice to use the <code>with</code> statement, which ensures the file is automatically closed, even if errors occur.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level18.png" alt="Diagram illustrating file I/O operations. Arrows show data flowing from Python script to a \'my_notes.txt\' file for \'write\' and \'append\', and from the file back to the script for \'read\'.">',
      real_life: "Like writing a diary (writing to a file) or reading a recipe book (reading from a file). The file persists the information.",
      challenge: "Write a Python script that first writes the string 'Hello, Python!' into a file named <code>greeting.txt</code>, and then reads the content of <code>greeting.txt</code> and prints it to the console.",
      expected_keywords: ["with", "open", "greeting.txt", "w", "as", "file", "file.write", "Hello, Python!", "r", "content", "file.read", "print", "content"],
      hint: "Remember to use `with open(...) as file:` for both writing and reading."
    },
    {
      id: 19,
      title: "Modules & Packages (Organizing Code)",
      theory: `
            <p><strong>Modules</strong> are simply Python files (<code>.py</code>) containing Python code (functions, classes, variables). They help organize code into logical, reusable units.</p>
            <p>A <strong>Package</strong> is a collection of modules in directories, which must contain an <code>__init__.py</code> file (even if empty) to be recognized as a package.</p>
            <pre class="code-snippet">
# Imagine you have a file 'my_module.py' with:
# def greet(name):
#     return f"Hello, {name}!"

# In another file, you can import and use it:
import my_module
print(my_module.greet("Alice"))

# You can also import specific items:
from my_module import greet
print(greet("Bob"))

# Packages structure:
# my_package/
#   ├── __init__.py
#   └── utils/
#       ├── __init__.py
#       └── helper.py  # Contains 'def add(a, b): return a + b'

# To use helper.py's add function:
from my_package.utils import helper
print(helper.add(5, 3))
            </pre>
            <p>Modules and packages are essential for building larger, maintainable Python applications.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level19.png" alt="Diagram showing a Python project structure: \'project_root/\' containing \'main.py\', \'my_module.py\', and a \'my_package/\' directory with \'__init__.py\' and a \'utils/\' sub-package.">',
      real_life: "Think of a cookbook. Each recipe is a 'module' (focused on one dish). The entire cookbook is a 'package' that groups related recipes (modules) together.",
      challenge: "Imagine you have a module named `math_operations.py` with a function `multiply(a, b)` that returns `a * b`. Write a Python script that imports this function and uses it to multiply 7 by 8, printing the result.",
      expected_keywords: ["import", "from", "math_operations", "multiply", "print", "7", "8"],
      hint: "You can use `import math_operations` and then `math_operations.multiply(7, 8)` or `from math_operations import multiply` and then `multiply(7, 8)`."
    },
    {
      id: 20,
      title: "Decorators (Function Wrappers)",
      theory: `
            <p><strong>Decorators</strong> are a powerful and elegant way to modify or enhance functions or methods without permanently changing their source code. They are essentially functions that take another function as an argument, add some functionality, and return a new function.</p>
            <p>The <code>@decorator_name</code> syntax is syntactic sugar for <code>function = decorator_name(function)</code>.</p>
            <pre class="code-snippet">
def logger_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling function '{func.__name__}' with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"Function '{func.__name__}' finished. Result: {result}")
        return result
    return wrapper

@logger_decorator
def add(a, b):
    return a + b

@logger_decorator
def say_hello(name):
    return f"Hello, {name}!"

print(add(10, 5))
print(say_hello("World"))
            </pre>
            <p>Decorators are commonly used for logging, timing, authentication, caching, and more, allowing for clean, reusable code enhancements.</p>
        `,
      diagram_alt: '<img src="static/assets/images/level20.png" alt="Diagram illustrating Python decorators: A \'logger_decorator\' function wraps around another function \'add()\', adding logging capabilities before and after the \'add()\' function execution.">',
      real_life: "Like putting a gift wrapper around a present. The present itself (the function) remains the same, but the wrapper (the decorator) adds extra flair or functionality (e.g., logging, timing).",
      challenge: "Create a simple decorator named <code>uppercase_decorator</code> that takes a function (expected to return a string), converts its result to uppercase, and returns the modified result. Apply this decorator to a function <code>get_message()</code> that returns 'hello python'. Then call <code>get_message()</code> and print the result.",
      expected_keywords: ["def", "uppercase_decorator", "func", "wrapper", "result", "func()", "return", "result.upper()", "@uppercase_decorator", "get_message", "hello python"],
      hint: "Your wrapper function should call the original `func`, get its result, convert it to uppercase, and then return the uppercase result."
    } 
  ]; // <-- Array closure 

  return levels;
}));
