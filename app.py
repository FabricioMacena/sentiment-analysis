from sentimentanalysis import TextAnalyzer
from flask import Flask, render_template, request, url_for
from gensim.models import Word2Vec
import pickle

def importing_models():
    
    with open("logreg_model.pkl", "rb") as logreg:
        logreg = pickle.load(logreg)

    word2vec = Word2Vec.load("word2vecfiles/word2vec_sentiment140.model")

    return word2vec, logreg


def create_app():
    
    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template("index.html")

    @app.route('/process', methods=['POST'])   
    def process():
        
        sentence = request.form['sentenceField']
        lang = request.form.get('selectField')
        
        if len(sentence) < 20:
            result = "Very few characters!"
            class_ = "spanError"
        else:
            
            word2vec, clf = importing_models()
            
            analyzer = TextAnalyzer(word2vec_model=word2vec, clf_model=clf)
            
            result = analyzer.preprocessing_sentence(sentence=sentence, src_lang=lang)
            
            if result == 0:
                result = "Negative"
                class_ = "spanNegative"
            else:
                result = "Positive"
                class_ = "spanPositive"
        
        return render_template("index.html", result=result, class_=class_)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)