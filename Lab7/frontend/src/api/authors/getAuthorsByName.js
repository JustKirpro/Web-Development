import axios from "axios";
import {getBaseURL} from "../getBaseURL";


const getAuthorsByName = (name) => {
    const URL = getBaseURL() + 'authors/'
    return axios.get(URL, {params: {name: name}});
}

export default getAuthorsByName;