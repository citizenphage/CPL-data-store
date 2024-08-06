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
sheet_name = 'phages'
df = pd.read_excel(file_path, sheet_name=sheet_name)


load_dotenv()

def get_database():
    client = MongoClient(os.getenv('MONGO_DB'))
    return client[os.getenv('DB_NAME')]


db_client = get_database()


def makePhage(row):
    hosts = db_client["hosts"]

    phage = {
        "version": row[4],
        "full_name": f"{row[2]} phage {row[0]}",
        "short_name": row[0],
        "visibility": "internal",    
    }

    host = hosts.find_one({"_id": row[3]}, {"_id": 1, "full_name": 1})
    if host:
        phage['source'] = {
            "isolation_host": {
                "host_id": host['_id'],
                "name": host['full_name']
            }
        }

    else:
        print(f' could not find a host for {row[0]}')

    return phage
    

    

phages_to_add = []
for row in df.itertuples(index=False):
    phages_to_add.append(makePhage(row))

phages = db_client["phages"]
phages.insert_many(phages_to_add)
end_time = time.time()
elapsed_time = end_time - start_time

print(f"Elapsed time: {elapsed_time:.2f} seconds")