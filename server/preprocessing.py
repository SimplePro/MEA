from nltk.corpus import stopwords

stop_words = stopwords.words("english")

with open("./special_characters.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        stop_words.append(line.replace("\n", ""))

def get_stopwords(): return stop_words