import axios from "axios";

export const updateAuthor = (id, author) => {
    const URL = `http://192.168.100.4:8000/api/v1/list/authors/${id}`;
    return axios.put(URL, author);
}