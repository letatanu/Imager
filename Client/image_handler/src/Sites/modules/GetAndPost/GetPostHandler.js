import React from 'react';
import axios from 'axios';
const GetPostHandlers = async (image, task) => {
    const  urls = {
        host: "http://localhost:8000",
        post: 'http://localhost:8000/api/posts/'
    }
    const data = null;
    let form_data = new FormData();
    form_data.append('image', image);
    form_data.append('task', task);
    let url = urls.post;
    console.log(form_data)
    axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
        .then(res => {
            data = res.data
        })
        .catch(err => {
            console.log(err)
        })
        
    return [urls.host, data];

};

export default GetPostHandlers;