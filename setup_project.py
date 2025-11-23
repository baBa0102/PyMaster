import os

project_name = "Python_Zero_to_Hero"

html_code = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Python Zero to Hero: The Game</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
</head>
<body>

    <div class="app-container">
        <nav class="sidebar">
            <div class="logo">
                <h2>🐍 PyMastery</h2>
                <p>Level: <span id="user-level">1</span>/20</p>
            </div>
            <div class="level-map" id="level-map">
            </div>
        </nav>

        <main class="main-content">
            <header>
                <h1 id="level-title">Level 1: Variables & Memory</h1>
                <div class="progress-bar">
                    <div class="fill" id="progress-fill" style="width: 5%"></div>
                </div>
            </header>

            <div class="content-wrapper">
                <section id="theory-section" class="card">
                    <h3>📘 Concept</h3>
                    <div id="theory-content"></div>
                    <div class="diagram-box" id="diagram-placeholder">
                    </div>
                </section>

                <section id="example-section" class="card">
                    <h3>🌍 Real World Analogy</h3>
                    <div id="example-content"></div>
                </section>

                <section id="challenge-section" class="card interview-mode">
                    <h3>💼 Interview Room</h3>
                    <p class="interviewer-text">"Welcome. Let's see if you can apply this. Here is your task:"</p>
                    <div id="challenge-desc" class="code-problem"></div>
                    
                    <div class="editor-area">
                        <textarea id="code-editor" placeholder="# Write your Python code here..."></textarea>
                    </div>
                    
                    <div class="actions">
                        <button onclick="checkAnswer()" class="btn-primary">Submit Solution</button>
                        <button onclick="toggleHint()" class="btn-secondary">Show Hint</button>
                    </div>
                    <div id="feedback-area" class="hidden"></div>
                </section>
            </div>
        </main>
    </div>

    <script src="data.js"></script>
    <script src="script.js"></script>
</body>
</html>
"""

css_code = """
:root {
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    --accent: #10b981;
    --text-main: #e2e8f0;
    --text-muted: #94a3b8;
    --code-bg: #000000;
    --border: #334155;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    margin: 0;
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.sidebar {
    width: 260px;
    background-color: #020617;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
}

.logo h2 { color: var(--accent); margin: 0; }
.level-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
    padding: 12px;
    margin-bottom: 8px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s;
}
.level-btn:hover { border-color: var(--accent); color: white; }
.level-btn.active { background: var(--accent); color: #000; font-weight: bold; }
.level-btn.locked { opacity: 0.5; cursor: not-allowed; }

.main-content {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.card {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid var(--border);
}

h1, h3 { margin-top: 0; }

code, pre, textarea { font-family: 'Fira Code', monospace; }
.code-snippet { background: var(--code-bg); padding: 10px; border-radius: 6px; color: #fab005; }

.diagram-box {
    border: 2px dashed var(--text-muted);
    padding: 20px;
    text-align: center;
    margin-top: 15px;
    background: rgba(255,255,255,0.05);
    border-radius: 8px;
    color: var(--accent);
    font-style: italic;
}

.interview-mode { border-color: var(--accent); }
.interviewer-text { font-style: italic; color: var(--text-muted); border-left: 3px solid var(--accent); padding-left: 10px; }
#code-editor {
    width: 100%;
    height: 150px;
    background: var(--code-bg);
    color: #fff;
    border: 1px solid var(--border);
    padding: 10px;
    border-radius: 6px;
    resize: vertical;
}

.btn-primary {
    background: var(--accent);
    border: none;
    padding: 10px 20px;
    color: #000;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
}
.btn-secondary {
    background: transparent;
    border: 1px solid var(--text-muted);
    color: var(--text-main);
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
}

.hidden { display: none; }
.success { color: var(--accent); margin-top: 10px; }
.error { color: #ef4444; margin-top: 10px; }
"""

data_js_code = """
const levels = [
    {
        id: 1,
        title: "Variables & Memory",
        theory: `
            <p>Think of a <strong>Variable</strong> as a labeled box where you can store information. In Python, you don't need to specify the type (size) of the box beforehand; Python figures it out for you.</p>
            <pre class="code-snippet">
player_name = "Alex"  # String
score = 100           # Integer
is_alive = True       # Boolean
            </pre>
            <p><strong>Primary Data Types:</strong> Numbers (int, float), Strings, and Booleans (True/False).</p>
        `,
        diagram_alt: "",
        real_life: "Imagine a warehouse. 'score' is a sticker on a box. Inside the box is the number 100. If you change the score, you take 100 out and put 200 in.",
        challenge: "Create a variable named <code>hero</code> and assign it the value 'Batman'. Then create a variable <code>power</code> with value 99.",
        expected_keywords: ["hero", "Batman", "power", "99"],
        hint: "Use the equals sign = to assign values."
    },
    {
        id: 2,
        title: "Control Flow (If/Else)",
        theory: `
            <p>Code needs to make decisions. We use <strong>If</strong> statements to branch logic. ${'

[Image of a flowchart decision diamond]
'}</p>
            <pre class="code-snippet">
if health < 10:
    print("Warning!")
elif health < 50:
    print("Getting weak")
else:
    print("Keep fighting")
            </pre>
            <p>Indentation (spacing) is crucial in Python. It tells the computer what code belongs inside the 'if' or 'else'.</p>
        `,
        diagram_alt: "Flowchart showing decision points in code logic.",
        real_life: "Like a traffic light. IF light is Red: Stop. ELSE IF light is Yellow: Slow down. ELSE: Go.",
        challenge: "Write an if statement that checks if <code>age</code> is greater than or equal to 18. If true, print 'Adult'.",
        expected_keywords: ["if", "age", ">=", "18", "print", "Adult"],
        hint: "Don't forget the colon : at the end of the if line!"
    },
    {
        id: 3,
        title: "Loops (Repetition)",
        theory: `
            <p>Don't repeat yourself (DRY). Use loops to do things multiple times.</p>
            <p><strong>For Loops</strong> are for iterating over a sequence (e.g., numbers in a range, or items in a list).</p>
            <pre class="code-snippet">
for i in range(5):
    print(i) # Prints 0, 1, 2, 3, 4
            </pre>
            <p><strong>While Loops</strong> repeat as long as a condition is true.</p>
        `,
        diagram_alt: "",
        real_life: "Like a factory conveyor belt. The machine performs the exact same action on every item that passes through.",
        challenge: "Write a loop that prints 'Hello' 10 times using <code>range</code>.",
        expected_keywords: ["for", "in", "range", "10", "print", "Hello"],
        hint: "The syntax is: for x in range(number):"
    },
    {
        id: 4,
        title: "Functions: The Code Reuser",
        theory: `
            <p>A <strong>Function</strong> is a reusable block of code that only runs when it is called. It helps organize code and avoid repetition.</p>
            <pre class="code-snippet">
def greet(name):
    return "Hello, " + name

message = greet("Basit")
            </pre>
            <p>The <code>def</code> keyword defines the function, and <code>return</code> sends a value back.</p>
        `,
        diagram_alt: "",
        real_life: "A function is like a kitchen appliance (a toaster). You give it an input (bread), it does a task (toasts), and gives you an output (toast).",
        challenge: "Define a function called <code>add_numbers</code> that takes two arguments, <code>a</code> and <code>b</code>, and returns their sum.",
        expected_keywords: ["def", "add_numbers", "a", "b", "return", "a + b"],
        hint: "Remember to use the <code>def</code> keyword and a colon `:`."
    },
    {
        id: 5,
        title: "Lists (Mutable Sequences)",
        theory: `
            <p>A <strong>List</strong> is a collection of items which is <strong>ordered</strong> and <strong>changeable (mutable)</strong>. Items can be of different data types.</p>
            <pre class="code-snippet">
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits[0])
            </pre>
            <p>Lists are defined by square brackets <code>[]</code> and items are accessed by index (starting at 0).</p>
        `,
        diagram_alt: "",
        real_life: "A grocery list. It's ordered and changeable (you can add or cross off items).",
        challenge: "Create a list named <code>scores</code> with the values <code>[80, 90, 75]</code>. Then, append the number <code>95</code> to the end of the list.",
        expected_keywords: ["scores", "[]", "80", "append", "95"],
        hint: "Use the `scores.append()` method to add the new value."
    },
    {
        id: 6,
        title: "Tuples (Immutable Sequences)",
        theory: `
            <p>A <strong>Tuple</strong> is a collection which is <strong>ordered</strong> but <strong>unchangeable (immutable)</strong>. This makes them faster and safer for fixed data.</p>
            <pre class="code-snippet">
coordinates = (10.0, 20.5)
# coordinates[0] = 5  # ERROR
            </pre>
            <p>Tuples are defined by round brackets <code>()</code>. Once created, you cannot change, add, or remove items.</p>
        `,
        diagram_alt: "[Image comparing python list vs tuple structure with emphasis on mutability]",
        real_life: "A compass direction. Once set, the coordinates (Latitude, Longitude) of a point should never change, ideal for a tuple.",
        challenge: "Create a tuple named <code>rgb_color</code> representing the color red: <code>(255, 0, 0)</code>. Print the element at index 0.",
        expected_keywords: ["rgb_color", "()", "255", "0", "print", "rgb_color[0]"],
        hint: "A tuple is defined using parentheses: `(item1, item2, ...)`"
    },
    {
        id: 7,
        title: "Dictionaries (Key-Value Pairs)",
        theory: `
            <p>A <strong>Dictionary</strong> is an unordered collection of data stored as <strong>key-value pairs</strong>, optimized for retrieval by key.</p>
            <pre class="code-snippet">
user = {
    "name": "Tina",
    "level": 7
}
print(user["name"])
user["level"] = 8
            </pre>
            <p>Dictionaries use curly braces <code>{}</code> and are mutable.</p>
        `,
        diagram_alt: "",
        real_life: "A phone book. You look up a person's name (the **key**) to find their phone number (the **value**).",
        challenge: "Create a dictionary named <code>item</code> with a key <code>'price'</code> and a value of <code>49.99</code>. Then, change the price to <code>39.99</code>.",
        expected_keywords: ["item", "{", "price", "49.99", "39.99"],
        hint: "To change a value, use the key in square brackets: `dictionary_name['key'] = new_value`"
    },
    {
        id: 8,
        title: "Sets (Unique Elements)",
        theory: `
            <p>A <strong>Set</strong> is an unordered collection of <strong>unique</strong> and **unindexed** items. Duplicate elements are automatically removed.</p>
            <pre class="code-snippet">
numbers = {1, 2, 2, 3, 4, 4}
print(numbers) # Output: {1, 2, 3, 4}
numbers.add(5)
            </pre>
            <p>Sets are great for removing duplicates and fast membership testing.</p>
        `,
        diagram_alt: "[Image comparing python dictionary vs set syntax and use cases]",
        real_life: "A class roster. Each student's name must be unique. If you try to add a duplicate, it's ignored.",
        challenge: "Create a set named <code>unique_ids</code> with values <code>{101, 102, 102, 103}</code>. Print the set.",
        expected_keywords: ["unique_ids", "{", "101", "102", "103", "print"],
        hint: "The duplicates are handled automatically by Python."
    },
    {
        id: 9,
        title: "String Manipulation",
        theory: `
            <p>Strings are sequences of characters. Python provides many built-in **methods** to manipulate them.</p>
            <pre class="code-snippet">
text = "python is fun"
capital = text.upper()
parts = text.split(" ")
            </pre>
            <p>Strings are **immutable**, so methods like <code>.upper()</code> return a *new* string.</p>
        `,
        diagram_alt: "",
        real_life: "Editing a Word document. You can change text to all caps, or find and replace instances of a word without damaging the core document.",
        challenge: "Take the string <code>data = 'hello,world,python'</code> and use a string method to split it into a list based on the comma delimiter.",
        expected_keywords: ["data", "split", ","],
        hint: "The method you need is `.split()` and it takes the delimiter (the comma) as an argument."
    },
    {
        id: 10,
        title: "Error Handling (Try/Except)",
        theory: `
            <p>The <strong>try...except</strong> block allows you to handle Errors (or Exceptions) gracefully, preventing the program from crashing. ${'

[Image of python try except flow diagram]
'}</p>
            <pre class="code-snippet">
try:
    result = 10 / 0
except ZeroDivisionError:
    result = "Cannot divide by zero"
            </pre>
            <p>If an error occurs in the <code>try</code> block, the code in the matching <code>except</code> block executes instead.</p>
        `,
        diagram_alt: "Flowchart showing the process of a try-except block.",
        real_life: "A fire alarm system. The alarm is ignored unless a fire (error) occurs, in which case the system executes the pre-planned response (except block).",
        challenge: "Write a <code>try/except</code> block to safely convert the string <code>'abc'</code> to an integer using <code>int('abc')</code>. The <code>except</code> block should print 'Invalid input'.",
        expected_keywords: ["try", "except", "ValueError", "int('abc')", "print", "Invalid input"],
        hint: "Converting a non-numeric string to an integer raises a `ValueError`."
    }
];
"""

script_js_code = """
let currentLevelIndex = 0;

function init() {
    renderSidebar();
    loadLevel(0);
}

function renderSidebar() {
    const container = document.getElementById('level-map');
    container.innerHTML = '';
    
    levels.forEach((level, index) => {
        const btn = document.createElement('button');
        btn.className = `level-btn ${index === currentLevelIndex ? 'active' : ''}`;
        btn.innerText = `Lv ${level.id}: ${level.title}`;
        btn.onclick = () => {
            currentLevelIndex = index;
            loadLevel(index);
            renderSidebar();
        };
        container.appendChild(btn);
    });
}

function loadLevel(index) {
    const level = levels[index];
    document.getElementById('level-title').innerText = `Level ${level.id}: ${level.title}`;
    document.getElementById('user-level').innerText = level.id;
    
    const progress = ((index + 1) / 20) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;

    document.getElementById('theory-content').innerHTML = level.theory;
    document.getElementById('diagram-placeholder').innerText = level.diagram_alt;
    document.getElementById('example-content').innerText = level.real_life;
    document.getElementById('challenge-desc').innerHTML = level.challenge;
    
    document.getElementById('code-editor').value = "";
    document.getElementById('feedback-area').className = "hidden";
}

function checkAnswer() {
    const userCode = document.getElementById('code-editor').value;
    const currentLevel = levels[currentLevelIndex];
    const feedback = document.getElementById('feedback-area');
    
    let passed = true;
    let missing = [];

    currentLevel.expected_keywords.forEach(keyword => {
        if (!userCode.toLowerCase().includes(keyword.toLowerCase())) {
            passed = false;
            missing.push(keyword);
        }
    });

    feedback.className = passed ? "success" : "error";
    if (passed) {
        feedback.innerText = "✅ Correct! Logic verified. You are ready for the next level.";
    } else {
        feedback.innerText = `❌ Code logic incomplete. Missing keyword(s) or incorrect syntax: ${missing.join(", ")}`;
    }
}

function toggleHint() {
    const hint = levels[currentLevelIndex].hint;
    alert(`💡 HINT: ${hint}`);
}

init();
"""

if not os.path.exists(project_name):
    os.makedirs(project_name)

with open(os.path.join(project_name, "index.html"), "w", encoding="utf-8") as f:
    f.write(html_code)

with open(os.path.join(project_name, "style.css"), "w", encoding="utf-8") as f:
    f.write(css_code)

with open(os.path.join(project_name, "data.js"), "w", encoding="utf-8") as f:
    f.write(data_js_code)

with open(os.path.join(project_name, "script.js"), "w", encoding="utf-8") as f:
    f.write(script_js_code)

print(f"✅ Project '{project_name}' created successfully!")
print("---")
print("NEXT STEP: Open the index.html file in your browser using the Live Server extension in VS Code.")