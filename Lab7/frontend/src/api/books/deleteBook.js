import axios from "axios";
import {getBaseURL} from "../getBaseURL";

const deleteBook = (id) => {
    const URL = getBaseURL() + `books/${id}`;
    return axios.delete(URL);
}

export default deleteBook;