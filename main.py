from fastapi import FastAPI
import uvicorn
import sqlite3
from data import update_db
from sqlmodel import SQLModel

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

class Survey_response(SQLModel):
    user_id:int
    sleep:int
    support:int
    symptoms:int
    rib_pain:int
    change:int

class TestData(SQLModel):
    hehe:int
    haha:bool


@app.get("/items/test")
async def read_item(hehe:int = 0, haha:int = 0):
    return {"hehe": hehe, "haha" : haha}


@app.get("/items/survey")
async def read_item(user_id, sleep, support, symptoms, rib_pain, change):
    update_db.insert_survey_response(user_id, sleep, support, symptoms, rib_pain, change)
    return {"done": True}

@app.get("/items/known_risks")
async def read_item(user_id, high_blood_pressure, preeclampsia, gestational_diabetes, family_history, cholesterol_history, smoking_history):
    update_db.insert_known_risk(user_id,
    high_blood_pressure,
    preeclampsia,
    gestational_diabetes,
    family_history,
    cholesterol_history,
    smoking_history)

@app.get("items/users/")
async def read_item(first_name, last_name, city, weeks_pregnant, weeks_postpartum, email, hobbies, report_data, points):
    update_db.insert_user(
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



if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)