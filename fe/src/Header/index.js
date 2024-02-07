import { Container } from "./styles"

export default function Header(){
    return (
        <Container>
            <h1>Sentiment Analysis</h1>
            <p>Type a tweet or even a sentence and then enter the language of the entered sentence. The program, through a model made for Natural Language Processing (NLP), will try to find out whether the text entered is a 
                <span style={{color: 'green'}}> Positive </span>
                 or 
                <span style={{color: 'red'}}> Negative </span>
            sentence.</p>
        </Container>
    )
}