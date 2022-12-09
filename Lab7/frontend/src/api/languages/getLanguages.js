import axios from "axios";
import {getBaseURL} from "../getBaseURL";

const getLanguages = (inputValue, callback) => {
    const URL = getBaseURL() + 'languages/all/';
    axios.get(URL)
        .then((response) => {
            const options = []
            response.data.map((language) => {
                const name = language.name;
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

export default getLanguages;