from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
from googletrans import Translator, LANGUAGES

app = Flask(__name__)

CORS(app)

def sentiment_analysis(model_name, sentence):
    
    model = AutoModelForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    sentiment_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    
    sentiment = sentiment_pipeline(sentence)[0]['label']
    
    return sentiment

def translate_sentence(sentence):
    
    translator = Translator()
    translated = translator.translate(sentence)
    
    sentence_translated = translated.text
    sentence_language = LANGUAGES[translated.src]

    return sentence_translated, sentence_language    

@app.route('/')
def index():
    return jsonify(message='Hello World')

@app.route('/post_sentence', methods=['POST'])
def post_sentence():
    data = request.get_json()
    sentence = data.get('response_sentence')
    
    sentence_translated, sentence_language = translate_sentence(sentence=sentence)
    
    model_name = "distilbert-base-uncased-finetuned-sst-2-english"
    sentiment = sentiment_analysis(model_name, sentence_translated)
    
    return jsonify(sentiment=sentiment, sentence_language=sentence_language)

if __name__ == '__main__':
    app.run(debug=True)