import axios from "axios";
import {getBaseURL} from "../getBaseURL";

const getBooksByAuthor = (name, language, status) => {
    const URL = getBaseURL() + `authors/${name}/books`;
    return axios.get(URL, {params: {language: language, is_read:status}});
}

export default getBooksByAuthor;