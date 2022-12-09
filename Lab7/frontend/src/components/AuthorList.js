import AuthorCard from "./AuthorCard";

const AuthorList = ({authors}) => {
    if (authors.length === 0) {
        return <h2>Не найдено ни одного автора</h2>
    }

    return <div>
        {authors.map(author => <AuthorCard author={author} />)}
    </div>
}

export default AuthorList;