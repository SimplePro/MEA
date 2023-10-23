from nltk.corpus import stopwords

from PIL import Image

import base64
import io

stop_words = stopwords.words("english")

with open("/home/kdhsimplepro/kdhsimplepro/kyunggi_highschool/CodingFestival2023/MEA/server/methods/special_characters.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        stop_words.append(line.replace("\n", ""))

def get_stopwords(): return stop_words


def RGB2String(image):
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    base64_url = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return base64_url


def string2RGB(base64_string):
    imgdata = base64.b64decode(base64_string.split(",")[-1])
    dataBytesIO = io.BytesIO(imgdata)
    image = Image.open(dataBytesIO)
    return image