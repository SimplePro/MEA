# MEA (MEmory with Ai) 📚



## (1) Function
1. extract main sentence (주요 문장 추출) (TextRank)
2. show korean sentence and check english sentence user write (영작 기능 (한글 문장 보여주고, 영어로))
3. make blanks in english sentences (빈칸 생성)
4. suggest similar words in a english sentence using [Thesaurus API](https://api-ninjas.com/api/thesaurus) (유의어 제공)
- https://stackoverflow.com/questions/3753021/-nltk-and-wordnet-how-do-i-convert-simple-tense-verb-into-its-present-pas
- 위 링크를 참고하여 기본 형태로 변환한 후에 api를 이용하여 유의어를 찾는다.
5. summarize english sentences (영어 지문 요약) (TextRank, Seq2Seq etc.)
6. generate images related with content (내용과 관련된 이미지 생성)