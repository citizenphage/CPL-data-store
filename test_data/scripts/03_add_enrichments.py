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
sheet_name = 'infections'
df = pd.read_excel(file_path, sheet_name=sheet_name)


load_dotenv()

def get_database():
    client = MongoClient(os.getenv('MONGO_DB'))
    return client[os.getenv('DB_NAME')]


db_client = get_database()

hosts_collection = db_client['hosts']
phages_collection = db_client['phages']
samples_collection = db_client['samples']
enrichments_collection = db_client['enrichments']
enrichments = []

for row in df.itertuples(index=False):
    enrichment = {
        "_id": str(uuid.uuid4())
    }
    if not pd.isna(row[0]):
        enrichment['plate'] = row[0]

    if not pd.isna(row[1]):
        enrichment['well'] = row[1]
    
    if not pd.isna(row[2]):
        enrichment['sample_type'] = row[2]

    if not pd.isna(row[3]):
        sample = samples_collection.find_one({"assigned_cpl_sample_number": row[3]}, {"_id": 1, "assigned_cpl_sample_number": 1, "w3w": 1})
        if sample:
            enrichment['sample'] = sample

    if not pd.isna(row[4]):
        enrichment['date'] = row[4].strftime('%Y-%m-%d')

    if not pd.isna(row[5]):
        enrichment['by'] = row[5]
    
    if not pd.isna(row[6]):
        enrichment['volume'] = row[6]

    if not pd.isna(row[7]):
        enrichment['growth_medium'] = row[7]

    if not pd.isna(row[8]):
        host = hosts_collection.find_one({"_id": row[8]}, {"_id": 1, "full_name": 1})
        enrichment['host'] = host

    if not pd.isna(row[10]):
        phage = phages_collection.find_one({"short_name": row[10]}, {"_id": 1, "short_name": 1})
        if phage:
            enrichment['phage_found'] = phage
            process = {
                "_id": str(uuid.uuid4()),
                "type": "isolation",
                "enrichment": enrichment['_id']
            }
            if not pd.isna(row[4]):
                process['date'] = row[4].strftime('%Y-%m-%d')
            if not pd.isna(row[5]):
                process['by'] = row[5]

            phages_collection.update_one({"_id": phage["_id"]}, { "$push": {'processes': process } })


    if not pd.isna(row[11]):
        enrichment['notes'] = row[11]

    enrichments.append(enrichment)


enrichments_collection.insert_many(enrichments)