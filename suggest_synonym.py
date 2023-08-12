import requests
import pickle

with open("./ninja_api_key.pickle", "rb") as f:
    api_key = pickle.load(f)

word = 'exhibit'
api_url = 'https://api.api-ninjas.com/v1/thesaurus?word={}'.format(word)
response = requests.get(api_url, headers={'X-Api-Key': api_key})
if response.status_code == requests.codes.ok:
    print(response.text)
else:
    print("Error:", response.status_code, response.text)