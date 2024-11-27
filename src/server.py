from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)
# app2 = Flask(__name__)

# Database setup
DATABASE = "data/login_info.db"
DATABASEWORKOUT = "data/workout_info.db"

# Create the table if it doesn't exist
def initialize_database():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()
    
# Create the table if it doesn't exist
def workout_database():
    conn = sqlite3.connect(DATABASEWORKOUT)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            exercise TEXT NOT NULL,
            weight FLOAT NOT NULL UNIQUE,
            reps INTEGER NOT NULL
        )
    """)
    conn.commit()
    conn.close()

# Initialize the database
initialize_database()

# Initialize the database
workout_database()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/")
def home2():
    return render_template("user.html")

@app.route("/submit", methods=["POST"])
def register():
    # Get form data
    first_name = request.form.get("fName")
    last_name = request.form.get("lName")
    email = request.form.get("email")
    password = request.form.get("password")

    try:
        # Insert data into the database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO users (first_name, last_name, email, password)
            VALUES (?, ?, ?, ?)
        """, (first_name, last_name, email, password))
        conn.commit()
        conn.close()
        message = "Registration Successful!"
    except sqlite3.IntegrityError:
        message = "Email already exists. Registration failed."

    return render_template("index.html", message=message)

@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    # Check credentials in the database
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("""
            SELECT * FROM users WHERE email = ? AND password = ?
        """, (email, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        message = f"Welcome, {user[1]} {user[2]}!"
        return render_template("user.html", message=message)
    else:
        message = "Invalid email or password. Please try again."
        return render_template("index.html", message=message)

@app.route("/save", methods=["POST"])
def workout():
    # Get form data
    exercise = request.form.get("exercise")
    weight = request.form.get("weight")
    reps = request.form.get("reps")

    print(f"Exercise: {exercise}, Weight: {weight}, Reps: {reps}")

    try:
        # Convert weight and reps to appropriate types
        weight = float(weight)
        reps = int(reps)

        # Insert data into the database
        conn = sqlite3.connect(DATABASEWORKOUT)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO workouts (exercise, weight, reps)
            VALUES (?, ?, ?)
        """, (exercise, weight, reps))
        conn.commit()
        conn.close()
        message = "Workout saved successfully!"
    except sqlite3.IntegrityError:
        message = "Error was found when trying to save workout"

    return render_template("user.html", message=message)

if __name__ == "__main__":
    app.run(debug=True)
    

