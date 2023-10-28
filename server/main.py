from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from ast import literal_eval
import json
from nltk.tokenize import word_tokenize, sent_tokenize

from methods import preprocessing, get_key_image, make_blank, make_scramble, summarize_text, get_key_sentence, get_synonyms

import random


app = Flask(__name__)

stopwords = preprocessing.get_stopwords()

# get_db data
def get_db():
    with open("./db/db.json", "r") as f:
        db_dict = json.load(f)

    return db_dict

# save db data
def save_db(db_dict):
    with open("./db/db.json", "w") as f:
        json.dump(db_dict, f)

# upload db data
def upload_passage_to_db(title, passage) -> bool:
    db_dict = get_db()

    if title in db_dict.keys(): return False

    # key_sentence = ~~
    summary = summarize_text.summarize_passage(passage)
    sent_scores, key_sentence = get_key_sentence.get_key_sentence(passage, summary)
    image = get_key_image.get_image(f'illustration image representing the situation: "{summary}"')
    string_image = preprocessing.RGB2String(image)

    data = {
        "passage": passage,
        "summary": summary,
        "key_sentence": key_sentence,
        "image": string_image
    }

    db_dict[title] = data

    save_db(db_dict)

    return True

@app.route('/', methods=["GET"])
def home():
    parameter_dict = request.args.to_dict()
    if len(parameter_dict) == 0:
        return render_template('main.html')

    else:
        title = parameter_dict["title"]
        db = get_db()
        return render_template('main2.html',
                               title=title,
                               passage=db[title]["passage"],
                               key_sentence=db[title]["key_sentence"],
                               summary=db[title]["summary"]
        )

# get passages in db data
@app.route("/get_passages", methods=["GET"])
def get_passages():
    if request.method == "GET":
       db_dict = get_db()
       return jsonify(db_dict)


# upload passage to db
@app.route("/upload_passage", methods=["POST"])
def upload_passage():
    if request.method == "POST":
        data = literal_eval(request.data.decode('utf8'))
        is_ok = upload_passage_to_db(data["title"], data["passage"])

        if is_ok == False: return json.dumps({"success": False}), 400, {"ContentType": "application/json"}

        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

@app.route("/get_blank", methods=["POST"])
def get_blank():
    if request.method == "POST":
        data = literal_eval(request.data.decode("utf8"))
        word_tokens = word_tokenize(data["passage"])
        blank_index = make_blank.get_blank_index(word_tokens, data["n_blank"], stopwords)
        result_sentence, answer_list = make_blank.generate_blank(data["passage"], word_tokens, blank_index)

        return json.dumps({"result": result_sentence, "answer": answer_list})


@app.route("/get_scramble", methods=["POST"])
def get_scramble():
    if request.method == "POST":
        data = literal_eval(request.data.decode("utf8"))
        # sentence_index = data["sentence_index"]
        sentence_tokens = sent_tokenize(data["passage"])
        sentence_index = random.randint(0, len(sentence_tokens)-1)

        sentence = sentence_tokens[sentence_index]
        word_tokens = sentence.split()
        scramble = make_scramble.get_scramble_sentence(word_tokens)
        
        return json.dumps({"scramble": scramble, "answer": sentence})

@app.route("/get_synonyms", methods=["POST"])
def get_synonyms_server():
    if request.method == "POST":
        data = literal_eval(request.data.decode("utf8"))
        word = data["word"]

        scores, synonyms = get_synonyms.get_synonyms(word)

        return json.dumps({"synonyms": synonyms})

if __name__ == '__main__':
    # app.run(debug=True)
    
    CORS(app, resources={r"*": {"origins":"*"}})
    
    app.run(
        host="0.0.0.0",
        debug=True,
        port=5000
        # ssl_context=ssl_context
    )
