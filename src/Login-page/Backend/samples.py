import sqlite3
import hashlib

conn = sqlite3.connect("../userdata.db")
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS userdata (
    id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)
""")


username1, password1 = "dani", hashlib.sha256("danipassword".encode()).hexdigest()
username2, password2 = "stef", hashlib.sha256("stefpassword".encode()).hexdigest()
username3, password3 = "omar", hashlib.sha256("omarpassword".encode()).hexdigest()
username4, password4 = "yuriy", hashlib.sha256("yuriypassword".encode()).hexdigest()
username5, password5 = "haisam", hashlib.sha256("haisampassword".encode()).hexdigest()
cur.execute("INSERT INTO userdata (username, password) VALUES (?, ?)", (username1, password1))
cur.execute("INSERT INTO userdata (username, password) VALUES (?, ?)", (username2, password2))
cur.execute("INSERT INTO userdata (username, password) VALUES (?, ?)", (username3, password3))
cur.execute("INSERT INTO userdata (username, password) VALUES (?, ?)", (username4, password4))
cur.execute("INSERT INTO userdata (username, password) VALUES (?, ?)", (username5, password5))

conn.commit()
