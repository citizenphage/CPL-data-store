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

file_path = 'migration/data/legacy-isolations.xlsx'
excel_data = pd.ExcelFile(file_path)

# Load the specific sheet into a DataFrame
sheet_name = 'hosts'
df = pd.read_excel(file_path, sheet_name=sheet_name)


load_dotenv()

def get_database():
    client = MongoClient(os.getenv('MONGO_DB'))
    return client[os.getenv('DB_NAME')]


db_client = get_database()


def addHost(row):
    hosts = db_client["hosts"]
    host = {
        "_id": row[0],
        "full_name": row[4],
        "genus": row[1],
        "species": row[2],
        "strain": row[3]
    }

    if not pd.isna(row[5]):
        ancestor = hosts.find_one({"_id": row[5]}, {"_id": 1, "full_name": 1})
        if ancestor:
            host['ancestor'] = ancestor

    if not pd.isna(row[6]):
        source = {
            "reason": row[6]
        }
        if not pd.isna(row[7]):
            source['institution'] = row[7]
        if not pd.isna(row[8]):
            source['contact_email'] = row[8]

        host['source'] = source

    hosts.insert_one(host)


for row in df.itertuples(index=False):
    addHost(row)