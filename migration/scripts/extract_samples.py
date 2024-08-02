import pandas as pd
from pymongo import MongoClient
import json
from datetime import datetime
from dotenv import load_dotenv
import os
import uuid
import openpyxl
import re

# Load the Excel file, ignore the data validation warnings.
openpyxl.reader.excel.warnings.simplefilter(action='ignore')

data_file = "migration/data/2024-08-02.xlsx"
data = pd.ExcelFile(data_file)
sheet_name = 'water sample'
df = pd.read_excel(data_file, sheet_name=sheet_name)

load_dotenv()

def get_database():
    client = MongoClient(os.getenv('MONGO_DB'))
    return client['test']


db_client = get_database()


def add_process(sample, process_details):
    processes = []
    try:
        processes = sample['processes']
    except KeyError:
        sample['processes'] = processes
    
    processes.append(process_details)


samples = []
for row in df.itertuples(index=False):
    sample = {
        "_id": str(uuid.uuid4()),
        "assigned_cpl_sample_number": row[0],
        "current_status": row[1],
        "location": "GP fourth floor cold room"
    }

    if not pd.isna(row[2]):
        sample['w3w'] = row[2]

    if not pd.isna(row[3]):
        sample['kit'] = row[3]

    if not pd.isna(row[6]):
        sample['description'] = row[6]
    
    if not pd.isna(row[8]):
        sample['date_taken'] = row[8].strftime("%Y-%m-%d")

    if not pd.isna(row[9]):
        add_process(sample, {"name": "received", "date": row[9].strftime("%Y-%m-%d")})
    
    if not pd.isna(row[10]):
        new_process = {"name": "processed", "date": row[10].strftime("%Y-%m-%d")}
        if not pd.isna(row[11]):
            new_process['notes'] = [row[11]]
        add_process(sample, new_process)

    samples.append(sample)
    

#strip out the Nones
sample_collection = db_client["samples"]
sample_collection.insert_many(samples)
    