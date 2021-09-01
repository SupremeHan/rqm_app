import { Button, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import axios from 'axios'


const useStyles = makeStyles({
    formWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '450px',
        height: '300px',
        borderRadius: '5px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '3px 3px 5px 6px #ccc',
        '& input': {
            margin: '15px 0px',
            padding: '10px 10px'
        },
        '& button': {
            padding: '10px 0px',
        }
    },
    moreInfo: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        '& a': {
            textDecoration: 'none'
        }
    }
})

const Login = ({login, isAuthenticated}) => {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    
    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        login(formData)
    }

    if(isAuthenticated) {
      return <Redirect to="/teams"/>
    }
    return (
        <div className={classes.formWrapper}>
            <form onSubmit={e => onSubmit(e)} className={classes.form}>
                <label>Username</label>
                <input 
                    type="username" 
                    placeholder="Username" 
                    name="username"
                    onChange={e => onChange(e)} 
                    value={username}
                  />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    onChange={e => onChange(e)} 
                    value={password}
                  />
                
                <Button variant="contained" color="primary" type="submit">Login</Button>
                <div className={classes.moreInfo}>
                    <a href="/register">Don't have an account click here!</a>
                </div>
                
            </form>
        </div>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
