import sqlite3
import random
import string


def generate_email():
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(8)) + '@example.com'


conn = sqlite3.connect('mydb')
cursor = conn.cursor()


cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    email TEXT
                )''')


for i in range(100, 1001):  
    name = f"name {i}"
    email = generate_email()
    cursor.execute('''INSERT INTO users (name, email) VALUES (?, ?)''', (name, email))


conn.commit()


cursor.execute("SELECT * FROM users")


rows = cursor.fetchall()


for row in rows:
    print(row)


print("script ran")
conn.close()



