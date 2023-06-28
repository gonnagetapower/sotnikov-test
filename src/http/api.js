import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/'

const $api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const fetchPosts = async () => {
    const { data } = await $api.get(`posts`)
    return data;
}