from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return '<h1>Hello from Flask!</h1><p>If you see this, your server is working.</p>'

if __name__ == '__main__':
    app.run(debug=True)