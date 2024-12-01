import sqlite3

# Database setup
DATABASE = "login_info.db"


def delete_all_data():
    try:
        # Connect to the database
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        # Confirm before deleting all data
        confirm = input("Are you sure you want to delete all data from the users table? (yes/no): ").strip().lower()
        if confirm == "yes":
            # Delete all rows from the users table
            cursor.execute("DELETE FROM users")
            conn.commit()
            print("All data has been successfully deleted from the users table.")
        else:
            print("Operation canceled. No data was deleted.")
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
    finally:
        # Close the connection
        conn.close()


if __name__ == "__main__":
    delete_all_data()