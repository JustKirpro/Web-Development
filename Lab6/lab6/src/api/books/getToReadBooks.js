import axios from "axios";
import {getBaseURL} from "../getBaseURL";

export const getToReadBooks = (language) => {
    const URL = getBaseURL() + 'books/to_read'
    return axios.get(URL, { params: { language: language }});
}