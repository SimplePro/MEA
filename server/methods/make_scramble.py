from nltk.tokenize import word_tokenize, sent_tokenize
import random

def get_scramble_sentence(word_tokens):
    return " / ".join(random.sample(word_tokens, len(word_tokens)))

if __name__ == '__main__':

    with open("./db/passages/2022-09-1-21.txt", "r") as f:
        sentences = f.readline()

    sentences_list = sent_tokenize(sentences)
    print(sentences_list)

    random_sentence = random.choice(sentences_list)
    random_word_tokens = random_sentence.split(" ")

    scramble = get_scramble_sentence(random_word_tokens)
    print(scramble)
    