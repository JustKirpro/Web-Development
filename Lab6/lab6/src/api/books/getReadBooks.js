import axios from "axios";
import {getBaseURL} from "../getBaseURL";

export const getReadBooks = () => {
    const URL = getBaseURL() + 'books/read'
    return axios.get(URL);
}