import { AppBar, Button, Container, List, ListItem, ListItemText, makeStyles, Toolbar } from '@material-ui/core'
import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const useStyles = makeStyles(() => ({
    root: {
        height: '70px',
        display: 'flex',
        justifyContent: 'center'
    },
    appBar: {
        display: 'flex',
        justifyContent: 'space-between',
        '& a': {
            textDecoration: 'none',
            color: '#fff'
        }
    },
    linkText: {
        color: '#fff',
        textDecoration: 'none'
    },
}));

function Navbar({ logout, auth: { isAuthenticated, loading } }) {
    const classes = useStyles();
    const history = useHistory();

    const authLinks = (
        <a onClick={logout} href="/">
            Logout
        </a>
    )

    return (
        <AppBar position="static" className={classes.root}>
            <Container className={classes.appBar}>
                <div>
                    <h2>Dashboard</h2>
                </div>
            <Toolbar className={classes.spc}>
                {
                    !loading && (
                        <Fragment>
                            { isAuthenticated ? authLinks : null}
                        </Fragment>
                    )
                }
            </Toolbar>
            </Container>
        </AppBar>
    )
}

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)