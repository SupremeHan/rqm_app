import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllClass, getAllUseCase, getAllRqm } from '../actions/diagram'
import { useParams } from 'react-router'
import { Button, Card, CardActions, CardContent, makeStyles, TextField, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import DataCard from './model/DataCard.jsx'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles({
    model: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    card: {
        width: '220px',
        height: '150px',
        margin: '20px',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-around',
        background: '#dee2e6',
    },
    cardBtn: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    
})

function Models({getAllClass, getAllUseCase, getAllRqm, diagram}) {
    const { id } = useParams()
    localStorage.setItem('id',id)
    const [formData, setFormData] = useState({
  copiesArrayObjects: true,
  copiesArrays: true,
  linkDataArray: [
    {
      from: 0,
      key: 0,
      relationship: "string",
      to: 0
    }
  ],
  linkKeyProperty: "string",
  modelClass: "string",
  nodeDataArray: [
    {
      key: 0,
      methods: [
        {
          name: "string",
          type: "string",
          visibility: "string"
        }
      ],
      name: "string",
      properties: [
        {
          name: "string",
          type: "string",
          visibility: "string"
        }
      ]
    }
  ],
  projectId: `${id}`,
  title: ""
})
    const [caseData, setCaseData] = useState({
          linkDataArray: [
            {
              category: "string",
              from: 0,
              key: 0,
              to: 0
            }
          ],
          linkKeyProperty: "string",
          modelClass: "string",
          nodeDataArray: [
            {
              category: "string",
              key: 0,
              loc: "string",
              text: "string"
            }
          ],
          projectId: `${id}`,
          title: ""
    })
    
    const classes = useStyles()
    useEffect(() => {
        getAllClass(id)
        getAllUseCase(id)
        getAllRqm(id)
    },[])

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const changeHandle = (event) => {
        const {name, value} = event.target
        setCaseData({...caseData, [name]: value})
    }

    const addClass = e => {
        e.preventDefault()

        axios.post('https://si-class.herokuapp.com/team-leader', formData)
         .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const addCase = e => {
        e.preventDefault()

        axios.post('https://si-use-case.herokuapp.com/team-leader', caseData)
         .then(res => console.log(res))
        .catch(err => console.log(err))
    }

   

    return (
        <Fragment>
        <Typography variant="h4">Class Diagrams</Typography>
        <div className={classes.model}>
           
            {diagram.class.result ? (diagram.class.result.map(item => (
                <DataCard data={item} path={'/class'}/>
            ))) : null}
            <Card className={classes.card}>
                <form onSubmit={e => addClass(e)}>
            <CardContent>
                <TextField
                    type="text"
                    name="title"
                    placeholder="Add new Class Diagram"
                    onChange={e => handleChange(e)}
                />
            </CardContent>
            <CardActions className={classes.cardBtn}>
                <Button size='medium' className={classes.link} onClick={addClass}>
                    <AddBoxIcon/>
                    </Button>
            </CardActions>
            </form>
        </Card>  
        </div>
            <Typography variant="h4">Use Case Diagrams</Typography>
            <div className={classes.model}>
                {diagram.useCase.result ? (diagram.useCase.result.map(item => (
                 <DataCard data={item} path={'/use-case'}/>
                ))) : null}  
                <Card className={classes.card}>
                    <form onSubmit={e => addCase(e)}>
                    <CardContent>
                        
                        <TextField
                            type="text"
                            name="title"
                            placeholder="Add new Use Case Diagram"
                            onChange={e => changeHandle(e)}
                        />
                        
                    </CardContent>
                        <CardActions className={classes.cardBtn}>
                        <Button size='small' type="submit" onClick={addCase} className={classes.link}><AddBoxIcon/></Button>
                        </CardActions>
                    </form>
                </Card>
             
            </div>
            <Typography variant="h4">Requirements Models</Typography>
            <div className={classes.model}>
                {diagram.rqm.result.map(item => (
                 <DataCard data={item} path={'/rqm'}/>
                ))}  
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5">
                            New RQM
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardBtn}>
                        <Button  size='medium' className={classes.link}><AddBoxIcon/></Button>
                    </CardActions>
                </Card>  
            </div>
        </Fragment>
    )
}

Models.propTypes = {
    getAllClass: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    diagram: state.diagram
})

export default connect(mapStateToProps, {getAllClass, getAllUseCase, getAllRqm})(Models)
