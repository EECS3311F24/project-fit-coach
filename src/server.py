from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

# Database setup
DATABASE = "data/login_info.db"

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

# Initialize the database
initialize_database()

@app.route("/")
def home():
    return render_template("index.html")

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
    print(f"Email: {email}, Password: {password}")
    cursor.execute("""
            SELECT * FROM users WHERE email = ? AND password = ?
        """, (email, password))
    user = cursor.fetchone()
    conn.close()
    print(f"User fetched: {user}")

    if user:
        message = f"Welcome, {user[1]} {user[2]}!"
        return render_template("user.html", message=message)
    else:
        message = "Invalid email or password. Please try again."
        return render_template("index.html", message=message)


if __name__ == "__main__":
    app.run(debug=True)
