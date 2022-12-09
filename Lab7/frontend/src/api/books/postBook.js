import axios from "axios";
import {getBaseURL} from "../getBaseURL";

const postBook = (book) => {
    const POST_URL = getBaseURL() + 'books';
    return axios.post(POST_URL, book);
}

export default postBook;