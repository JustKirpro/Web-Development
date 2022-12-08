export const HelloWorld = ({id}) => {
    return <h1 id={id}>Hello World</h1>
}

export const Paragraph = ({id, text}) => {
    return <p id={id}>{text}</p>
}

export const List = ({id}) => {
    return <ul id={id}>
        <li>First</li>
        <li>Second</li>
    </ul>
}