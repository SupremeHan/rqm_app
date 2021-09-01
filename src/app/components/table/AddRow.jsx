import { Button, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'

const useStyles = makeStyles({
    formWrapper: {
        margin: '20px 0px'
    },
    form: {
        display: 'flex',
        alignItems: 'center'
    },
    formTitle: {
        display: 'flex',
        '& h5': {
            margin: '5px 20px',
        },
        '& button': {
            marginLeft: '10px'
        }
    }
})

const AddRow = ({setUpdateData, updateData}) => {
    const [row, setRow] = useState({})
    const [show, setShow] = useState(false)
    const classes = useStyles()

    const handleChange = (event) => {
        const { name, value } = event.target
        setRow({...row, [name]: value})
        
    }

  
    const handleSubmit = event => {
        event.preventDefault()

        let newRow = {}

        if(row.subtitle !== undefined &&
            row.subdescription !== undefined &&
            row.subrisk !== undefined &&
            row.subpriority !== undefined &&
            row.subtype !== undefined 
            ) {
                  newRow = {
                    allocatedUsers: null,
                    description: row.description,
                    priority: row.priority,
                    risk: row.risk,
                    subRequirements: [{
                        title: row.subtitle,
                        description: row.subdescription,
                        risk: row.subrisk,
                        priority: row.subpriority,
                        type: row.subtype

                    }],
                    title: row.title,
                    type: row.type,
                }
            } else {
                newRow = {
                    allocatedUsers: null,
                    description: row.description,
                    priority: row.priority,
                    risk: row.risk,
                    subRequirements: null,
                    title: row.title,
                    type: row.type,
                }
            }
       
            updateData.requirements.push(newRow)
            setUpdateData(updateData)   
        }
        
    return (
        <div className={classes.formWrapper}>
            <div className={classes.formTitle}>
                <Typography variant='h5'>
                    Add new row
                </Typography>
                <Button variant='contained' color="primary" onClick={() => setShow(!show)}>Show</Button>
            </div>  
        {show === true ? (
            <form onSubmit={handleSubmit} className={classes.form}>
            <Table>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <TextField
                            label="Title"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            InputProps={{
                                className: classes.input
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            label="Description"
                            id="description"
                            name="description"
                            onChange={handleChange}
                            InputProps={{
                                className: classes.input
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <Select
                          label="Risk"
                          id="risk"
                          name="risk"
                          defaultValue="undefined"
                          onChange={handleChange}
                          className={classes.select}
                        >
                          <MenuItem value="undefined">Undefined</MenuItem>
                          <MenuItem value="LOW">Low</MenuItem>
                          <MenuItem value="MEDIUM">Medium</MenuItem>
                          <MenuItem value="HIGH">High</MenuItem>
                        </Select>
                        
                    </TableCell>
                    <TableCell>
                        <Select
                          label="Priority"
                          id="priority"
                          name="priority"
                          defaultValue="undefined"
                          onChange={handleChange}
                        >
                          <MenuItem value="undefined">Undefined</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={1.5}>1.5</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Select
                            label="Type"
                            id="type"
                            name="type"
                            onChange={handleChange}
                            defaultValue="undefined"
                        >
                          <MenuItem value="undefined">Undefined</MenuItem>
                          <MenuItem value="FUNCTIONAL">FUNCTIONAL</MenuItem>
                          <MenuItem value="NON_FUNCTIONAL">NON_FUNCTIONAL</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Button
                            type="submit"
                            variant="contained"
                            color='primary'
                        >Add Row
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        SubRequirements
                    </TableCell>
                    <TableCell>
                        <TextField
                            label="Title"
                            id="subtitle"
                            name="subtitle"
                            onChange={handleChange}
                            InputProps={{
                                className: classes.input
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            label="Description"
                            id="subdescription"
                            name="subdescription"
                            onChange={handleChange}
                            InputProps={{
                                className: classes.input
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <Select
                          label="Risk"
                          id="subrisk"
                          name="subrisk"
                          defaultValue="undefined"
                          onChange={handleChange}
                          className={classes.select}
                        >
                          <MenuItem value="undefined">Undefined</MenuItem>
                          <MenuItem value="LOW">LOW</MenuItem>
                          <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                          <MenuItem value="HIGH">HIGH</MenuItem>
                        </Select>
                        
                    </TableCell>
                    <TableCell>
                        <Select
                          label="Priority"
                          id="subpriority"
                          name="subpriority"
                          defaultValue="undefined"
                          onChange={handleChange}
                        >
                          <MenuItem value="undefined">Undefined</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={1.5}>1.5</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Select
                            label="Type"
                            id="subtype"
                            name="subtype"
                            onChange={handleChange}
                            defaultValue="undefined"
                        >
                          <MenuItem value={"undefined"}>undefined</MenuItem>
                          <MenuItem value={"FUNCTIONAL"}>FUNCTIONAL</MenuItem>
                          <MenuItem value={"NON_FUNCTIONAL"}>NON_FUNCTIONAL</MenuItem>
                        </Select>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </form>
        ): (
            null
        )}
        
        </div>
    )
}

export default AddRow
