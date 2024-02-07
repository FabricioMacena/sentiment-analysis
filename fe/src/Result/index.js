import { Para } from "./styles";
import { LoadingCircle, LoadingContainer } from "./stylesLoading";

export default function Result({ states }){
    return(
        <div className="result"  style={{display: states.displayResult}}>
            {states.loading ? (
                <LoadingContainer>
                    <LoadingCircle />
                    <LoadingCircle />
                    <LoadingCircle />
                </LoadingContainer>
            ) : (
                <Para>
                    The sentence entered was written in <span className="language">{ states.language.toUpperCase() }</span> and classified as <span className={ states.sentiment }>{ states.sentiment }</span>
                </Para>
            )}
        </div>
    )
}