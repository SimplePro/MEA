import numpy as np

from nltk.tokenize import word_tokenize, sent_tokenize

from sentence_transformers import SentenceTransformer, util

# model = SentenceTransformer('multi-qa-MiniLM-L6-cos-v1')
# model = SentenceTransformer('all-mpnet-base-v2')

model_names = [
    'all-mpnet-base-v2',
    'all-MiniLM-L6-v2',
    'paraphrase-multilingual-mpnet-base-v2'
]

def softmax(array):
    return np.exp(array) / np.sum(np.exp(array))


class SentenceBERT:

    def __init__(self, model_name):
        self.model = SentenceTransformer(model_name)

    def get_sim_matrix(self, sentence_tokens, summary):

        embeddings = self.model.encode(sentence_tokens)
        summary_embedding = self.model.encode(summary)

        sim_matrix = util.dot_score(embeddings, summary_embedding)

        return sim_matrix

    def get_scores(self, sentence_tokens, summary):
        sim_matrix = self.get_sim_matrix(sentence_tokens, summary).numpy().reshape(-1)

        scores = np.array([sim_matrix[i] for i in range(len(sentence_tokens))])

        return softmax(scores)

sentence_berts = [SentenceBERT(model_name) for model_name in model_names]

def get_key_sentence(passage, summary):
    sentence_tokens = sent_tokenize(passage)
        
    bert_scores = [sentence_bert.get_scores(sentence_tokens, summary) for sentence_bert in sentence_berts]
    bert_scores = sum(bert_scores) / len(bert_scores)

    index = np.argmax(bert_scores)

    return bert_scores, sentence_tokens[index]


if __name__ == '__main__':

    with open("../db/passages/2022-09-1-31.txt", "r") as f:
        passage = f.read()

    summary = "Workers in large warehouses are controlled by software that tells them what to do in small, specific steps, reducing their judgment and turning them into machines."
    # summary = "Taking risks and stepping out of one's comfort zone is essential for achieving great results and personal fulfillment, as success comes from bold choices and embracing the unknown."
    # summary = "Sometimes, it is necessary to say 'no' and fire a customer, even though the customer is usually right, in order to prioritize the satisfaction of other customers."

    print(passage)
    
    scores, key_sentence = get_key_sentence(passage, summary)
    print(scores, key_sentence)

    # summarize sentences using chatgpt api
    # and then compare between summary and each sentence.