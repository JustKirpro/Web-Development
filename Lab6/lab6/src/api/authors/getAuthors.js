import axios from "axios";
import {getBaseURL} from "../getBaseURL";

export const getAuthors = (inputValue, callback) => {
    const URL = getBaseURL() + 'authors/all/';
    axios.get(URL)
        .then((response) => {
            const options = []
            response.data.map((author) => {
                const name = author.name;
                if (name.includes(inputValue)) {
                    options.push({label: name, value: name});
                }
            });
            callback(options);
        })
        .catch(() => {
            callback([]);
        });
}