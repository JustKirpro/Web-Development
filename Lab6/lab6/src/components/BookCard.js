import {useNavigate} from 'react-router-dom'

const BookCard = ({book}) => {
    const navigate  = useNavigate()

    return <div className="card" onClick={() => navigate(`/books/${book.book_id}`)}>
        <h3>{book.title} {book.release_year ? `(${book.release_year})` : null}</h3>
        {book.authors.map(author => ` ${author} `)}
    </div>
}

export default BookCard;