import axios from "axios";
import {getBaseURL} from "../getBaseURL";

export const deleteAuthor = (id) => {
    const URL = getBaseURL() + `authors/${id}`;
    return axios.delete(URL);
}