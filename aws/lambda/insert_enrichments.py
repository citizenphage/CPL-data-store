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

file_path = 'test_data/aws/enrichment/Example_enrichment_sheet_v2.xlsx'
excel_data = pd.ExcelFile(file_path)

# Load the specific sheet into a DataFrame
sheet_name = 'data'
df = pd.read_excel(file_path, sheet_name=sheet_name)

# Extract the date and experiment details
date = df.iloc[0, 1]
experiment_details = df.iloc[1, 1]


load_dotenv()

def get_database():
    client = MongoClient(os.getenv('MONGO_DB'))
    return client['test']


db_client = get_database()


def get_or_make_host(host_id, host_name):
    hosts = db_client["hosts"]
    host = hosts.find_one({"_id": host_id, "full_name": host_name}, {"full_name": 1})
    if not host:
        host = {
            "_id": host_id,
            "full_name": host_name
        }
    
        new_id = hosts.insert_one(host)
       # print(f'Created a new host with ID {new_id}')


    return host

def get_or_make_sample(sample_number):
    if pd.isna(sample_number):
        return None
    
    samples = db_client["samples"]
    sample = samples.find_one({"assigned_cpl_sample_number": sample_number})
    if not sample:
        sample ={
            "_id": str(uuid.uuid4()),
            "assigned_cpl_sample_number": sample_number
        }
        new_id = samples.insert_one(sample)
    else:
        #print(f'Retrieved sample {sample["assigned_cpl_sample_number"]} from MongoDB with id {sample["_id"]}')
        pass

    return sample


def update_next_phage_number(phage_id=None):
    """
    Updates the next phage number in the status table of the database, either by 1 or to the provided number
    Args:
        phage_id: The new phage id
    """
    rgx = re.compile('^CPL(\d{6}$)')
    collection_name = db_client["status"]
    status = collection_name.find()[0]
    next_available=status['next_phage_number']
    if not phage_id:
        number = int(rgx.search(next_available).group(1))
        new_number = number + 1
        phage_id = f'CPL{new_number:06d}'
    else:
        #check format of provided phage id
        if not rgx.search(phage_id):
            raise ValueError(f'The provided phage id {phage_id} does not fit the format CPL[0-9]{{6}}')
        
        if next_available == phage_id:
            raise ValueError(f'The provided phage id {phage_id} is the same as the existing phage id')
        
       
        
    collection_name = db_client["status"]

     #check that it hasn't already been used in legacy data
    phages = db_client["phages"]
    if phages.count_documents({"short_name": phage_id}):
        raise ValueError(f'The provided phage id {phage_id} is already used in legacy data')
    else:
        status = collection_name.find()[0]
        status['next_phage_number'] = phage_id
        collection_name.update_one({'_id': status['_id']}, {'$set': status})
        #print(f'Updated next phage number from {next_available} to {phage_id}')

    return next_available



def create_new_phage(enrichment):

    isolation_host = enrichment['host']['full_name']

    host_genus = isolation_host.split( )[0]
    short_name = update_next_phage_number()
    phage = {
        "_id": str(uuid.uuid4()),
        "version": "1.0.0",
        "full_name": f'{host_genus} phage {short_name}',
        "visibility": "internal",
        "status": "isolated",
        "source": {
            "enrichment_id": enrichment["_id"],
            "isolation_host": isolation_host,
            "sample_type": enrichment['sample_type']
        },
        "processes": [{
            "name": "isolation",
            "date": enrichment['date'],
            "user": enrichment['by'],
            "notes": enrichment['notes']
        }]
    }

    try:
        phage['source']["isolated_from"] = enrichment["sample"]
    except KeyError:
        pass

    return phage



def parse_row(row):
    
    enrichment = {}
    enrichment["_id"] = str(uuid.uuid4())
    enrichment["plate"]=row[0]
    enrichment["well"]=row[1]
    enrichment["notes"]=experiment_details
    enrichment["date"]=date.strftime("%Y-%m-%d")
    enrichment["growth_medium"]=row[7]
    
    enrichment["volume"]=row[6]
    enrichment['by']=row[5]
    enrichment['phage_found']= row[10]== 'Y'


    host = get_or_make_host(row[8], row[9])

    sample  = get_or_make_sample(row[3])
    enrichment["sample_type"]=row[2]

    enrichment['host'] = {key: host[key] for key in ["_id", "full_name"]}
    if sample:
        enrichment['sample'] = {key: sample[key] for key in ["_id", "assigned_cpl_sample_number"]}
        try:
            enrichment['sample']['w3w'] = sample["w3w"]
        except KeyError:
            pass

    return enrichment, sample




# Load the table starting from row 5 into a DataFrame
table_df = pd.read_excel(file_path, sheet_name=sheet_name, skiprows=4)

enrichments = []
for row in table_df.itertuples(index=False):
    enrichment, sample = parse_row(row)
    enrichments.append(enrichment)


#strip out the Nones
enrichment_collection = db_client["enrichments"]
enrichment_collection.insert_many(enrichments)

#now make the phages in the enrichments
phage_df = table_df[table_df.iloc[:, 10]=='Y']

new_phages = []

for row in phage_df.itertuples(index=False):
    enrichment = enrichment_collection.find_one({"plate": row[0],
                                                 "well": row[1],
                                                 "date": date.strftime("%Y-%m-%d"),
                                                 "phage_found": True})
    if enrichment:
       new_phages.append(create_new_phage(enrichment))

phage_collection = db_client['phages']
phage_collection.insert_many(new_phages)