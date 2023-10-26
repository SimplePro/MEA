from nltk.tokenize import word_tokenize
import random

def is_stopwords(word, stopwords):
    for stopword in stopwords:
        if stopword == word:
            return True
    
    return False

def get_blank_index(word_tokens, n_blank, stopwords):
    no_stopwords_index = []

    for i in range(len(word_tokens)):
        if not is_stopwords(word_tokens[i], stopwords):
            no_stopwords_index.append(i)

    if len(no_stopwords_index) < n_blank: return None

    random.shuffle(no_stopwords_index) 

    return no_stopwords_index[:n_blank]

def generate_blank(sentences, word_tokens, blank_index):
    result = ""
    answer = []
    sentence_index = 0
    word_token_index = 0

    while word_token_index < len(word_tokens):
        if word_tokens[word_token_index][0] != sentences[sentence_index]:
            result += " "
            sentence_index += 1

        else:
            if word_token_index in blank_index:
                print(word_token_index)
                answer.append(word_tokens[word_token_index])
                result += "_" * len(word_tokens[word_token_index])
            
            else:
                result += word_tokens[word_token_index]

            sentence_index += len(word_tokens[word_token_index])

            word_token_index += 1


    return result, answer


if __name__ == '__main__':
    from preprocessing import get_stopwords
    
    stopwords = get_stopwords()

    sentences = input("sentences: ")
    n_blank = int(input("n_blank: "))
    word_tokens = word_tokenize(sentences)
    blank_index = get_blank_index(word_tokens, n_blank, stopwords)
    print(blank_index)


    print(generate_blank(sentences, word_tokens, blank_index))
