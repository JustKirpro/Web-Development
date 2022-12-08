import {Routes, Route} from "react-router";
import HomePage from "../pages/HomePage";
import SearchBooksByTitlePage from "../pages/search/SearchBooksByTitlePage";
import SearchBooksByAuthorPage from "../pages/search/SearchBooksByAuthorPage";
import SearchAuthorsByNamePage from "../pages/search/SearchAuthorsByNamePage";
import ToReadBooksPage from "../pages/search/ToReadBooksPage";
import ReadBooksPage from "../pages/search/ReadBooksPage";
import AddBookPage from "../pages/add/AddBookPage";
import BookPage from "../pages/BookPage";
import EditBookPage from "../pages/edit/EditBookPage";
import AddAuthorPage from "../pages/add/AddAuthorPage";
import AuthorPage from "../pages/AuthorPage";
import EditAuthorPage from "../pages/edit/EditAuthorPage";
import NotFoundPage from "../pages/NotFoundPage";

const Router = () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/title" element={<SearchBooksByTitlePage />} />
        <Route path="/books/author" element={<SearchBooksByAuthorPage />} />
        <Route path="/books/to_read" element={<ToReadBooksPage />} />
        <Route path="/books/read" element={<ReadBooksPage />} />
        <Route path="/books/new" element={<AddBookPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/books/:id/edit" element={<EditBookPage />} />
        <Route path="/authors/name" element={<SearchAuthorsByNamePage />} />
        <Route path="/authors/new" element={<AddAuthorPage />} />
        <Route path="/authors/:id" element={<AuthorPage />} />
        <Route path="/authors/:id/edit" element={<EditAuthorPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
}

export default Router;