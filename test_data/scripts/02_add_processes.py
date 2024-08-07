import pandas as pd
from pymongo import MongoClient
import json
from datetime import datetime
from dotenv import load_dotenv
import os
import uuid
import openpyxl
import re
import time
# Load the Excel file, ignore the data validation warnings.
openpyxl.reader.excel.warnings.simplefilter(action='ignore')
start_time = time.time()
file_path = 'migration/data/legacy-isolations.xlsx'
excel_data = pd.ExcelFile(file_path)

# Load the specific sheet into a DataFrame
sheet_name = 'processes'
df = pd.read_excel(file_path, sheet_name=sheet_name)


load_dotenv()

def get_database():
    client = MongoClient(os.getenv('MONGO_DB'))
    return client[os.getenv('DB_NAME')]


db_client = get_database()

for row in df.itertuples(index=False):
    phages = db_client['phages']
    if pd.isna(row[1]):
        continue
    phage = phages.find_one({"short_name" : row[0]})
    if phage:

        process = {
            "_id": str(uuid.uuid4()),
            "type": "purification",
            "description": row[1]
        }

        if not pd.isna(row[2]):
            process['by'] = row[2]

        phages.update_one({"short_name" : row[0]}, { "$set": { 'status': 'purified', 'processes': [process] } })
    else:
        print(f'Could not find phage {row[0]} in the database')


