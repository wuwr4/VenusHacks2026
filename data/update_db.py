import sqlite3
from datetime import datetime

# -------------------------
# Insert into users table
# -------------------------
def insert_user(first_name,last_name,city,weeks_pregnant,weeks_postpartum,email,hobbies,report_data,points):
    conn = sqlite3.connect("database.db")

    query = """
    INSERT INTO users (
        first_name,
        last_name,
        city,
        weeks_pregnant,
        weeks_postpartum,
        email,
        hobbies,
        report_data,
        points
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    cursor = conn.execute(query, (first_name,last_name,city,weeks_pregnant, weeks_postpartum,email,hobbies,report_data,points))

    conn.commit()
    cursor.close()


# -------------------------
# Insert into survey_responses table
# -------------------------dir
def insert_survey_response(user_id,sleep, support, symptoms, rib_pain, change):
    conn = sqlite3.connect("database.db")

    current_time = datetime.now().isoformat()

    cursor = conn.execute("""
        INSERT INTO survey_responses (
            user_id,
            time,
            sleep,
            support,
            symptoms,
            rib_pain,
            change
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (user_id,current_time,sleep,support, symptoms, rib_pain,change))

    conn.commit()
    cursor.close()


# -------------------------
# Insert into known_risks table
# -------------------------
def insert_known_risk(user_id,high_blood_pressure,preeclampsia,gestational_diabetse,family_history,cholesterol_history, smoking_history):
    conn = sqlite3.connect("database.db")

    query = """
    INSERT INTO known_risks (
        user_id,
        high_blood_pressure,
        preeclampsia,
        gestational_diabetse,
        family_history,
        cholesterol_history,
        smoking_history
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """

    cursor = conn.execute(query, (user_id,high_blood_pressure,preeclampsia,gestational_diabetse,family_history,cholesterol_history, smoking_history))

    conn.commit()
    cursor.close()


# -------------------------
# Insert into incentives table
# -------------------------
def insert_incentive(item_name,item_description,amount,cost):
    conn = sqlite3.connect("database.db")

    query = """
    INSERT INTO incentives (
        item_name,
        item_description,
        amount,
        cost
    )
    VALUES (?, ?, ?, ?)
    """

    cursor = conn.execute(query, (item_name,item_description,amount,cost))

    conn.commit()
    cursor.close()