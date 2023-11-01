import json

path = "/home/kdhsimplepro/kdhsimplepro/kyunggi_highschool/CodingFestival2023/MEA/server/db/db.json"

with open(path, "r") as f:
    db_data = json.load(f)

def save_data():
    with open(path, "w") as f:
        json.dump(db_data, f, indent=4)

def remove_passage(key):
    db_data.pop(key)

def rename_passage(key, new_key):
    db_data[new_key] = db_data.pop(key)

if __name__ == '__main__':
    remove_passage("2022년 1학년 9월 21번")
    print(db_data.keys())
    save_data()