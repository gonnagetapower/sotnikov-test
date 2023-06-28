import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/'

const $api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const fetchPosts = async (filterValue, pageSize, page) => {
    const { data } = await $api.get(`posts?title_like=${filterValue}&_start=0&_limit=${pageSize}&_page=${page}`)
    return data;
}

export const fetchAlbums = async (filterValue, pageSize, page) => {
    const { data } = await $api.get(`albums?title_like=${filterValue}&_start=0&_limit=${pageSize}&_page=${page}`)
    return data;
}