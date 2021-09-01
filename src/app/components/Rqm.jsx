import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

function Rqm() {
    const { id } = useParams()

    const getRqm = (id) => {
        axios.get(`https://si-rqm.herokuapp.com/regular/all/${id}`, { 
        })
        .then(res => {
          console.log(res.data.result);
        })
        .catch(err => {
          console.log(err)
        })

    }

    useEffect(() => {
        getRqm(id)
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Rqm
