from flask import Flask, render_template, request, jsonify
from ast import literal_eval
import json

from methods import preprocessing, get_key_image


app = Flask(__name__)

def get_db():
    with open("./db/db.json", "r") as f:
        db_dict = json.load(f)

    return db_dict

def save_db(db_dict):
    with open("./db/db.json", "w") as f:
        json.dump(db_dict, f)

def upload_passage_to_db(title, passage) -> bool:
    db_dict = get_db()

    if title in db_dict.keys(): return False

    # key_sentence = ~~
    # summarize = ~~
    # image = get_key_image.get_image(f'illustration image representing the situation: "{summarize}"')
    # string_image = preprocessing.RGB2String(image)

    data = {
        "passage": passage,
        # "key_sentence": key_sentence,
        # "summarize": summarize,
        # "image": string_image
    }

    db_dict[title] = data

    save_db(db_dict)

    return True

@app.route('/')
def home():
    return render_template('main.html')

@app.route("/get_passages", methods=["GET"])
def get_passages():
    if request.method == "GET":
       db_dict = get_db()
       return jsonify(db_dict)
    

@app.route("/upload_passage", methods=["POST"])
def upload_passage():
    if request.method == "POST":
        data = literal_eval(request.data.decode('utf8'))
        is_ok = upload_passage_to_db(data["title"], data["passage"])

        if is_ok == False: return json.dumps({"success": False}), 400, {"ContentType": "application/json"}


        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


if __name__ == '__main__':
    app.run(debug=True)