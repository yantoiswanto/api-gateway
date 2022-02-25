import axios from 'axios';

const { TIMEOUT } = process.env;

export const ApiAdapter = (baseUrl: any) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: Number(TIMEOUT)
    })
}