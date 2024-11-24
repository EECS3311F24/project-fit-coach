from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)


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

    # Save data to a text file
    with open("login_info.txt", "a") as file:
        file.write(f"First Name: {first_name}, Last Name: {last_name}, Email: {email}, Password: {password}\n")

    return "Registration Successful!"


if __name__ == "__main__":
    app.run(debug=True)
