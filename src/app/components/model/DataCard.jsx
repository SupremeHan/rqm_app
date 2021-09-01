import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles({
    card: {
        width: '220px',
        height: '150px',
        margin: '20px',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-around',
        background: '#dee2e6',
    },
    link: {
        '& a': {
            color: '#fff',
            textDecoration: 'none'
        }
    }
})


function DataCard({data, path}) {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5">
                    {data.title}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardBtn}>
                <Button color="primary" variant="contained" size='medium' className={classes.link}>
                    <Link to={`${path}/${data.id}`}>View</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

export default DataCard