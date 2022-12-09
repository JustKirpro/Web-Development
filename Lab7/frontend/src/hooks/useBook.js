import React, {createContext, useContext, useState} from "react";

const BookContext = createContext(null);

export const BookProvider = ({children}) => {
    const [title, setTitle] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [year, setYear] = useState(null);
    const [language, setLanguage] = useState(null);
    const [status, setStatus] = useState(false);

    return <BookContext.Provider value={{title, setTitle, authors, setAuthors, year, setYear, language, setLanguage, status, setStatus}}>
        {children}
    </BookContext.Provider>;
};
export const useBook = () => useContext(BookContext);