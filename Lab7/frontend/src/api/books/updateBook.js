import axios from "axios";
import {getBaseURL} from "../getBaseURL";

export const updateBook = (id, book) => {
    const URL = getBaseURL() + `books/${id}`;
    return axios.put(URL, book);
}