from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def save_user_data():
    success = False

    # Make the user enter their email and password
    userEmail = request.form.get('Email')
    userPassword = request.form.get('Password')

    # Format the data the way we want it to
    loginInfo = f"Email: {userEmail} - Password: {userPassword}\n"

    # Checks if path exist
    exist = os.path.exists('./Data')

    # Creates a folder named Data if path doesn't exist already
    if exist == False:
        os.mkdir('./Data')

    # Add the user login information to the txt file
    with open('./Data/login_info.txt', 'a') as txt_file:
        txt_file.write(loginInfo)
        success = True

    if success:
        return jsonify({"Login information has been successfully saved!"})

if __name__ == '__main__':
    app.run(debug=True)