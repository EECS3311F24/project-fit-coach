from flask import Flask, request, redirect, send_from_directory, url_for
import sqlite3
import hashlib
import os

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.form['email']
    password = request.form['password']
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    conn = sqlite3.connect("userdata.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM userdata WHERE username = ? AND password = ?", (username, hashed_password))
    user = cur.fetchone()
    conn.close()

    if user:
        return redirect(url_for('static', filename='main.html'))
    else:
        return "Login failed!", 401



if __name__ == '__main__':
    app.run(debug=True)
