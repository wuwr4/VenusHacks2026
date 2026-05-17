DROP TABLE if exists survey_responses;
DROP TABLE if exists known_risks;
DROP TABLE if exists users;
DROP TABLE if exists incentives;

CREATE TABLE survey_responses
(
    response_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    time TEXT,
    stress INTEGER,
    support INTEGER,
    sleep INTEGER,
    exercise INTEGER,
    headaches INTEGER,
    vision INTEGER,
    chest_pain INTEGER,
    shortness_breath INTEGER,
    swelling INTEGER,
    nutrition INTEGER,
    change INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
)STRICT;

CREATE TABLE known_risks
(
    users_known_risks_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    high_blood_pressure INTEGER,
    preeclampsia INTEGER,
    gestational_diabetse INTEGER,
    family_history INTEGER,
    cholesterol_history INTEGER,
    smoking_history INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE users
(
    user_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    city TEXT,
    weeks_pregnant INTEGER,
    weeks_postpartum INTEGER,
    email TEXT,
    hobbies TEXT,
    report_data INTEGER,
    points INTEGER
);

CREATE TABLE incentives
(
    item_id INTEGER PRIMARY KEY,
    item_name TEXT,
    item_description TEXT,
    amount INTEGER,
    cost INTEGER
);