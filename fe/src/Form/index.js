import { useState } from "react";
import axios from 'axios';

import { Div } from "./styles"
import Result from "../Result";
import Span from "../SpanMessage";

export default function Form(){
    const [sentence, setSentence] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [language, setLanguage] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayResult, setDisplayResult] = useState('none');
    const [displaySpanMessage, setDisplaySpanMessage] = useState('none');
    const [spanMessage, setSpanMessage] = useState('');
    const [classSpan, setClassSpan] = useState('');

    function handleButton(){
        const response_sentence = sentence;
        
        if (response_sentence.length >= 7 ){

            setDisplayResult('block');
            setSentence('');
            setLoading(true);

            axios.post('http://localhost:5000/post_sentence', {response_sentence})
                .then(response => {

                    setSentiment(response.data.sentiment)
                    setLanguage(response.data.sentence_language)

                    setLoading(false);
                })
                .catch(error => {
                    console.log('Erro ao enviar a frase: ', error)
                });

        } else {
            setDisplaySpanMessage('block');
            setSpanMessage('The sentence lenght must be at least 7 characters.');
            setClassSpan('spanError');
        }
    }

    return (
        <Div>
            <textarea
                spellCheck="false"
                placeholder="Insert a Sentence (in any language)"
                name="set_sentence"
                value={sentence}
                onChange={
                    (e) => {
                        setSentence(e.target.value);
                        setDisplaySpanMessage('none');
                        setDisplayResult('none');

                        if (sentence.length > 50) {
                            setDisplaySpanMessage('block');
                            setSpanMessage("Very large phrases can affect the accuracy of the model.");
                            setClassSpan('spanWarning');
                        } else {
                            setDisplaySpanMessage('none');
                            setSpanMessage('');
                        }
                    }
                }
            />
            <Span
                values={{
                    display: displaySpanMessage,
                    message: spanMessage,
                    classSpan
                }}
            >
                { spanMessage }
            </Span>
            <button onClick={handleButton}>Check</button>
            <Result 
                states={{
                    sentiment,
                    language,
                    loading,
                    displayResult
                }}
            />
        </Div>
    )
}