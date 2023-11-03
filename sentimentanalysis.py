import numpy as np
from nltk import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from translate import Translator

def translate_text(text, target_language='en', source_language='pt'):
    translator = Translator(to_lang=target_language, from_lang=source_language)
    translation = translator.translate(text)
    return translation

class TextAnalyzer:
    
    def __init__(self, word2vec_model, clf_model):
        self.word2vec = word2vec_model
        self.clf = clf_model

    def document_vector(self, tokens):
        words_in_vocab = [word for word in tokens if word in self.word2vec.wv]

        if len(words_in_vocab) == 0:
            return np.zeros(self.word2vec.vector_size)

        return np.mean(self.word2vec.wv[words_in_vocab], axis=0)

    def preprocessing_sentence(self, sentence, src_lang="pt"):
        lemmatizer = WordNetLemmatizer()
        stop_words = set(stopwords.words('english'))

        sentence = translate_text(sentence, source_language=src_lang)

        tokens = word_tokenize(sentence)

        tokens = [word for word in tokens if word.lower() not in stop_words]

        tokens = [word for word in tokens if word.isalpha()]

        tokens = [lemmatizer.lemmatize(word) for word in tokens]

        vec = self.document_vector(tokens)

        vec = np.array(vec).reshape(1, -1)

        result = self.clf.predict(vec)

        return result[0]