import numpy as np

from nltk.tokenize import word_tokenize, sent_tokenize

from sklearn.metrics.pairwise import cosine_similarity

import pickle

import networkx as nx

from sentence_transformers import SentenceTransformer, util

# model = SentenceTransformer('multi-qa-MiniLM-L6-cos-v1')
# model = SentenceTransformer('all-mpnet-base-v2')

model_names = [
    'multi-qa-distilbert-cos-v1',
    'all-mpnet-base-v2',
    'paraphrase-multilingual-mpnet-base-v2'
]

glove_emd_dim = 300

def softmax(array):
    return np.exp(array) / np.sum(np.exp(array))

class Glove:

    def __init__(self):

        with open("./glove_embedding_dict.pkl", "rb") as f:
            self.word_embeddings = pickle.load(f)

        
    def calculate_sentence_vector(self, word_tokens, default_vector=np.zeros(glove_emd_dim)):
        return sum([self.word_embeddings.get(word, default_vector) for word in word_tokens]) / len(word_tokens)

    def get_sim_matrix(self, sentence_tokens):
        
        sentence_vector = [self.calculate_sentence_vector(sentence) for sentence in sentence_tokens]

        sim_matrix = np.zeros((len(sentence_tokens), len(sentence_tokens)))

        for i in range(len(sentence_tokens)):
            for j in range(len(sentence_tokens)):
                sim_matrix[i, j] = cosine_similarity(sentence_vector[i].reshape(1, glove_emd_dim), sentence_vector[j].reshape(1, glove_emd_dim))

        return sim_matrix

    def get_scores(self, sentence_tokens):
        sim_matrix = self.get_sim_matrix(sentence_tokens)

        nx_graph = nx.from_numpy_array(sim_matrix)
        nx_scores = nx.pagerank(nx_graph, max_iter=500)

        scores = np.array([nx_scores[i] for i in range(len(sentence_tokens))])

        return softmax(scores)
        

class SentenceBERT:

    def __init__(self, model_name):
        self.model = SentenceTransformer(model_name)

    def get_sim_matrix(self, sentence_tokens):

        embeddings = self.model.encode(sentence_tokens)

        sim_matrix = util.dot_score(embeddings, embeddings)

        return sim_matrix

    def get_scores(self, sentence_tokens):
        sim_matrix = self.get_sim_matrix(sentence_tokens).numpy()

        nx_graph = nx.from_numpy_array(sim_matrix)
        nx_scores = nx.pagerank(nx_graph, max_iter=500)

        scores = np.array([nx_scores[i] for i in range(len(sentence_tokens))])

        return softmax(scores)

glove = Glove()

sentence_berts = [SentenceBERT(model_name) for model_name in model_names]

def get_key_sentence(passage):
    sentence_tokens = sent_tokenize(passage)
        
    # glove_scores = glove.get_scores(sentence_tokens)
    # bert_scores = sentence_bert.get_scores(sentence_tokens)
    bert_scores = [sentence_bert.get_scores(sentence_tokens) for sentence_bert in sentence_berts]
    bert_scores = sum(bert_scores) / len(bert_scores)
    glove_scores = bert_scores

    scores = (glove_scores + bert_scores) / 2

    index = np.argmax(scores)

    return scores, sentence_tokens[index]


if __name__ == '__main__':

    with open("../db/passages/2022-09-1-24.txt", "r") as f:
        passage = f.read()

    print(passage)
    
    scores, key_sentence = get_key_sentence(passage)
    print(scores, key_sentence)

    # summarize sentences using chatgpt api
    # and then compare between summary and each sentence.