import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://cahol-sagol.firebaseio.com/'
});

export default instance;