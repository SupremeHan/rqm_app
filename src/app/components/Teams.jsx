import { Button, Card, CardActions, CardContent, Collapse, IconButton, makeStyles, Modal, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTeam } from '../actions/team'
import { Fragment } from 'react';

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
    content: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    projectView: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    collapse: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '10px 0px'
    },
    card: {
        padding: "20px",
        margin: '10px 20px',
        background: '#dee2e6',
        width: '300px'
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
    link: {
        '& a': {
            color: '#fff',
            textDecoration: 'none'
        }
    }
})


function Teams({ getTeam, team: { teams }, auth: { jwt } }) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);
    const token = jwt_decode(jwt)
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [team, setTeam] = useState({ name: '', userId: token.sub })
    
    useEffect(() => {
        getTeam(token.sub)
    },[])

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setTeam({...team, [name]: value})
    }

    const addTeam = (e) => {
        e.preventDefault()
        axios.post('https://si-user-management.herokuapp.com/regular/teams', team)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        setOpen(false)
    }

    

    return (
        <Fragment>
        <div className={classes.content}>
            {
                teams.map(team => (
                    <Card className={classes.card} key={team.id}>
                        <CardContent>
                            <Typography variant="h4">{team.name}</Typography>
                            <div className={classes.collapse}>
                            <Typography variant='h6'>Members</Typography>
                            <IconButton

                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                            </div>
                             <div className={classes.projectView}>
                                <Typography variant="body1">Project</Typography>
                                <Button size='small' variant='contained' color='primary' className={classes.link}><Link to={`/projects/${team.id}`}>View Project</Link></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            }
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4">
                        Make A New Team
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardBtn}>
                    <Button color="primary" variant="contained" size='medium' onClick={handleOpen}>Add New</Button>
                </CardActions>
            </Card>
            
        </div>
        <Modal open={open} onClose={handleClose}>
        <form onSubmit={e => addTeam(e)} className={classes.paper} style={modalStyle}>
                    <TextField
                        id="name"
                        name="name"
                        label="Enter project name"
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" >Add Team</Button>
            </form>
        </Modal>
        </Fragment>
    )
}

Teams.propTypes = {
    getTeam: PropTypes.func.isRequired,
}
 
const mapStateToProps = state => ({
    team: state.team,
    auth: state.auth
})

export default connect(mapStateToProps, { getTeam })(Teams)
