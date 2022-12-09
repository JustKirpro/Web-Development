import axios from "axios";
import {getBaseURL} from "../getBaseURL";

const getBooksByTitle = (title) => {
    const URL = getBaseURL() + 'books/';
    return axios.get(URL, {params: {title: title}});
}

export default getBooksByTitle;