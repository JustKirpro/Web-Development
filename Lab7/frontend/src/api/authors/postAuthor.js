import axios from "axios";
import {getBaseURL} from "../getBaseURL";

export const postAuthor = (author) => {
    const URL = getBaseURL() + "authors";
    return axios.post(URL, author);
}