# Memory with AI -> MEA 📚


## (1) Function
1. extract main sentence (주요 문장 추출) (TextRank)
2. show korean sentence and check english sentence user write (영작 기능 (한글 문장 보여주고, 영어로))
3. make blanks in english sentences (빈칸 생성)
4. transformate english setences in the same meaning (영어 문장을 다르게 변형)
5. translate english to korean (영어 문장에서 한글 문장으로 번역)
6. analyze stastics of users experience (유저 기록 분석)

7. suggest similar words in a english sentence using [Thesaurus API](https://api-ninjas.com/api/thesaurus) (유의어 제공)
- https://stackoverflow.com/questions/3753021/-nltk-and-wordnet-how-do-i-convert-simple-tense-verb-into-its-present-pas
- 위 링크를 참고하여 기본 형태로 변환한 후에 api를 이용하여 유의어를 찾는다.

8. summarize english sentences (영어 지문 요약) (TextRank, Seq2Seq etc.)
9. detect english sentences in pictures (ocr) (사진에서 영어 문장 추출 (ocr))
10. generate images related with content (내용과 관련된 이미지 생성)