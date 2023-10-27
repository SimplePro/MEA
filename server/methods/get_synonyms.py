import requests
import pickle

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

import json


with open("/home/kdhsimplepro/kdhsimplepro/kyunggi_highschool/CodingFestival2023/MEA/server/methods/ninja_api_key.txt", "r") as f:
    api_key = f.readline()

glove_emd_dim = 300


def softmax(array, axis=1):
    return np.exp(array) / np.sum(np.exp(array), axis=axis)


class Glove:

    def __init__(self):

        with open("/home/kdhsimplepro/kdhsimplepro/kyunggi_highschool/CodingFestival2023/MEA/server/methods/glove_embedding_dict.pkl", "rb") as f:
            self.word_embeddings = pickle.load(f)

    def get_scores(self, word, synonym_words):
        syn_word_embs = [self.word_embeddings.get(word, np.zeros(glove_emd_dim)) for word in synonym_words]
        word_emd = self.word_embeddings.get(word, np.zeros(glove_emd_dim))

        similarities = [
            cosine_similarity(word_emd.reshape(1, glove_emd_dim), syn_word_embs[i].reshape(1, glove_emd_dim))[0][0]
            for i in range(len(synonym_words))
        ]

        scores = softmax(similarities, axis=0)
        sorted_index = np.argsort(scores).tolist()
        sorted_syn = [None for _ in range(len(synonym_words))]

        for i in range(len(synonym_words)):
            sorted_syn[sorted_index[i]] = synonym_words[i]

        sorted_syn = sorted_syn[::-1]

        print(sorted_index)
        # syn_dict = {}

        # for i in range(len(synonym_words)):
            # syn_dict[synonym_words[i]] = sorted_index[i]
        
        # sorted_syn = sorted(synonym_words, key=lambda x: syn_dict[x], reverse=True)

        return scores, sorted_syn

glove = Glove()
api_url = 'https://api.api-ninjas.com/v1/thesaurus?word={}'

def get_synonyms(word):
    response = requests.get(api_url.format(word), headers={'X-Api-Key': api_key})
    if response.status_code == requests.codes.ok:
        json_ = json.loads(response.text)
        synonym_words = json_["synonyms"]

        scores, sorted_syn = glove.get_scores(word, synonym_words)

        return scores, sorted_syn

    else:
        return None


if __name__ == '__main__':

    word = 'asdf'
    # response = requests.get(api_url.format(word), headers={'X-Api-Key': api_key})
    # if response.status_code == requests.codes.ok:
        # print(response.text)
    # else:
        # print("Error:", response.status_code, response.text)
    
    # text = json.loads(response.text)
    # synonym_words = text["synonyms"]

    # scores, sorted_syn = glove.get_scores(word, synonym_words)
    # print(sorted_syn)
    scores, sorted_syn = get_synonyms(word)
    print(sorted_syn)