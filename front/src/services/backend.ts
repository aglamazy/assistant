import axios from "axios";
import {config} from "../config/config";

export const Backend = {
    post: (endpoint: string, body: any) => {
        const url = config.backendServer + '/' + endpoint;
        return axios.post(url, body);
    }
}
