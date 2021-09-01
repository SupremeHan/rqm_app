import axios from 'axios'


const userLogin = data => {
    return axios.post('/api', data)
        .then(res => {
            if(res.status > '200' || res.status < '400') {
                localStorage.setItem('user', JSON.stringify(res.data))
            }else {
                console.log('Greska')
            }

            return res.data
        })
        .catch(e => console.log(e))
}


export default {
    userLogin
}