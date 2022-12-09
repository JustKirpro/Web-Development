import axios from "axios";
import {getBaseURL} from "../getBaseURL";
export const getAuthorById = (id) => {
    const URL = getBaseURL() + `authors/${id}`;
    return axios.get(URL);
}