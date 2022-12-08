import BookCard from "./BookCard";

const BookList = ({books}) => {
    if (books.length === 0) {
        return <h2>Не найдено ни одной книги</h2>
    }

    return <div>
        {books.map(book => <BookCard book={book} />)}
    </div>
}

export default BookList;