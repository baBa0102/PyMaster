import os
from flask import Flask, request, jsonify, send_from_directory, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

app = Flask(__name__, static_folder='../static', static_url_path='/static')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key_if_not_set') # Fallback for local testing
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_host=1, x_port=1, x_prefix=1)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# --- Database Model ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    current_level_id = db.Column(db.Integer, default=1, nullable=False) # User's current progress

    def __repr__(self):
        return f'<User {self.email}>'

# --- API Endpoints ---

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/login.html')
def serve_login():
    return send_from_directory(app.static_folder, 'login.html')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists with this email'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password_hash=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password):
        # Store user ID in session to keep them logged in
        session['user_id'] = user.id 
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'email': user.email,
                'currentLevelId': user.current_level_id
            }
        }), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None) # Remove user ID from session
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/user_progress', methods=['GET'])
def get_user_progress():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'message': 'Not authenticated'}), 401

    user = User.query.get(user_id)
    if user:
        return jsonify({'currentLevelId': user.current_level_id}), 200
    return jsonify({'message': 'User not found'}), 404

@app.route('/api/update_level', methods=['POST'])
def update_level():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'message': 'Not authenticated'}), 401

    data = request.get_json()
    new_level_id = data.get('levelId')

    if not isinstance(new_level_id, int) or new_level_id < 1:
        return jsonify({'message': 'Invalid level ID'}), 400

    user = User.query.get(user_id)
    if user:
        # Only update if the new level is higher than the current one
        # This prevents accidental downgrades or saving lower progress
        if new_level_id > user.current_level_id:
            user.current_level_id = new_level_id
            db.session.commit()
            return jsonify({'message': 'Level updated successfully', 'currentLevelId': user.current_level_id}), 200
        elif new_level_id <= user.current_level_id:
            return jsonify({'message': 'Level is not higher than current progress', 'currentLevelId': user.current_level_id}), 200
    return jsonify({'message': 'User not found'}), 404


# --- Run the App ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Create database tables if they don't exist
    app.run(debug=True, port=5000) # Run on port 5000, debug=True for development