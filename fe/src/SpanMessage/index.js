export default function Span({ children, values }){
    return(
        <span style={{ display: values.display }} className={ values.classSpan }>
            { children }
        </span>
    )
}