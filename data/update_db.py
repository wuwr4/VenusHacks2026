import sqlite3
import os
print(os.getcwd())

# 1. Connect to (or create) the database file
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# 2. Read your schema file
with open('data/schema.sql', 'r') as f:
    sql_script = f.read()

# 3. Execute the script to create tables
cursor.executescript(sql_script)

conn.commit()
conn.close()
