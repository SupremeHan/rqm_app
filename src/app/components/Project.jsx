import { Button, Card, CardActions, CardContent, Grid, makeStyles, Modal, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getProjects } from '../actions/project'
import PropTypes from 'prop-types'
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles({
    card: {
        width: '300px',
        height: '200px',
        margin: '20px',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-around',
        background: '#dee2e6',
    },
    cardBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10px'
    },
    paper: {
        position: 'absolute',
        width: 300,
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
        border: '2px solid #000',
        padding: '10px 20px',
        '& button': {
            marginTop: '20px'
        }
    },
    project: {
        display: "flex",
        boxSizing: 'border-box',
    },
    link: {
        '& a': {
            color: '#fff',
            textDecoration: 'none'
        }
    }
})


function Project({ getProjects, project: { projects } }) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    const { id } = useParams()
    const [formData, setFormData]= useState({name: '', teamId: id})

    useEffect(() => {
        getProjects(id)
    }, [])

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const addProject = e => {
        e.preventDefault()
        axios.post('https://si-user-management.herokuapp.com/team-leader/projects', formData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        setOpen(false)
    }
    console.log(typeof projects)
    return (
        <Grid container className={classes.project}>
            {projects.map ? (projects.map((project,index) => (
                <Card className={classes.card} key={index}>
                <CardContent>
                    <Typography variant="h4">
                        {project.name}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardBtn}>
                    <Button color="primary" variant="contained" size='medium' className={classes.link}><Link to={`/projects/models/${id}`}>View</Link></Button>
                </CardActions>
            </Card>
            ))) : null}
            
            
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4">
                        Make A New Project
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardBtn}>
                    <Button color="primary" variant="contained" size='medium' onClick={handleOpen}>Add New</Button>
                </CardActions>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <form onSubmit={e => addProject(e)} style={modalStyle} className={classes.paper}>
                    <TextField
                        id="name"
                        name="name"
                        label="Enter project name"
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" >Add Project</Button>
                </form>
            </Modal>
         
        </Grid>
    )
}

Project.propTypes = {
    getProjects: PropTypes.func.isRequired,
}
 
const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps, { getProjects })(Project)
