import { Button, makeStyles } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles({
    formWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '350px',
        height: '600px',
        padding: '20px',
        marginTop: '20px',
        boxShadow: '3px 3px 5px 6px #ccc',
        '& input': {
            marginTop: '10px',
            marginBottom: '20px',
            padding: '10px 10px'
        },
        '& button': {
            padding: '10px 0px',
        },
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

const Register = () => {
    const classes = useStyles()
    const {register, handleSubmit, formState: { errors }} = useForm()

    
    const onSubmit = (data) => {
        axios.post("https://si-middleware.herokuapp.com/user-management/register", data).then(res => console.log(res))
    }

    return (
        <div className={classes.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <label>Username</label>
                <input {...register("username", { required: true })} placeholder="Username" id="username"/>

                <label>Password</label>
                <input type="password" {...register("password", { required: true, minLength: 6 })} placeholder="Password"/>
                {errors.password && "Password must be at least 6 characters"}

                <label>Full name</label>
                <input {...register("fullName", { required: true })} placeholder="Full Name" id="fullName"/>

                <label>Company</label>
                <input {...register("companyName", { required: true })} placeholder="Company" id="company"/>

                <label>Email</label>
                <input {...register("email", {required: true, maxLength: 50})} id="email" placeholder="Email"/>
                {errors.email && 'Email is required'}
                
                <Button variant="contained" color="primary" type="submit">Register</Button>
                <div className={classes.moreInfo}>
                    <a href="/">Already have an account click here!</a>
                </div>
            </form>    
        </div>
    )
}

export default Register