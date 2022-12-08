import axios from "axios";
import {getBaseURL} from "../getBaseURL";

const getBookById = (id) => {
    const URL = getBaseURL() + `books/${id}`;
    return axios.get(URL);
}

export default getBookById;