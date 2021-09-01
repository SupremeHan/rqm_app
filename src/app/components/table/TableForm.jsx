import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead, 
  TableRow,  
  Paper, 
  } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Row from './TableSubRow';
import AddRow from './AddRow';
import { convertedRqm } from '../../actions/diagram'
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import history from '../../libs/history'

function TableForm({ convertedRqm }) {
    const [ data, setData ] = useState([])
    const [updateData, setUpdateData] = useState({})
    const [isLoading, setIsLoading] = useState(null)

    const {id} = useParams()
      const getRqm = () => {
        axios.get(`https://si-rqm.herokuapp.com/regular/project/${id}`, { 
        })
        .then(res => {
          setData(res.data.result.requirements);
          setUpdateData(res.data.result)
        })
        .catch(err => {
          console.log(err)
        })

      }
      

    useEffect(() => {
        getRqm()
    },[])

    function editData() {
      console.log(updateData)
      updateData.requirements = data
      axios.put('https://si-rqm.herokuapp.com/regular', updateData).then(res => console.log(res)).catch(err => console.log(err))
    }

    function convertData() {
      setIsLoading(true)
      axios.put('https://si-rqm.herokuapp.com/regular', updateData)
      .then(res => {
        if(res.status === 200 ) {
          convertedRqm(updateData)
          setIsLoading(false)
        } else {
          console.log('Eror za redirekt')
        }
      })
      .catch(err => console.log(err))
    
    }

   return(
     <React.Fragment>
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Risk</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Type</TableCell>
      
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data === undefined ? (null) : (
            data.map((item, index) => (
              <Row key={index} index={index} item={item} setData={setData}/>
            ))
            )
          }
        </TableBody>
      </Table>
      <button onClick={editData}>Edit</button>
      <button onClick={convertData}>Convert Data</button>
      {
        isLoading === true ? (<p>Loading....</p>) : isLoading === false ? (<a href='/use-case/60b284632aa001496ccf41cf'>Click here to see data</a>) : null
      }
      <AddRow setUpdateData={setUpdateData} updateData={updateData}/>
    </TableContainer>
    
    
    </React.Fragment>
   )
}


export default connect(null, { convertedRqm })(TableForm)