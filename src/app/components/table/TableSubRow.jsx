import React from 'react'
import { 
    Collapse, 
  IconButton,
  Select, 
  MenuItem, 
  TextField,
  Table, 
  TableBody, 
  TableCell, 
  TableRow,
  makeStyles, 
  } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { produce } from 'immer'


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  
});


export default function Row(props) {
  const { item ,setData, index } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
 
  return(
    <React.Fragment key={index}>
              <TableRow className={classes.root}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <TextField 
                    type="text" 
                    name="title" 
                    value={item.title} 
                    onChange={e => {
                      const title = e.target.value
                      setData(currentTitle => produce(currentTitle, v => {
                        v[index].title = title
                      }))
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField 
                    type="text" 
                    name="description" 
                    value={item.description}
                    onChange={e => {
                      const description = e.target.value
                      setData(currentTitle => produce(currentTitle, v => {
                        v[index].description = description
                      }))
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    name="priotity"
                    value={item.priority}
                    onChange={e => {
                      const priority = e.target.value
                      setData(currentTitle => produce(currentTitle, v => {
                        v[index].priority = priority
                      }))
                    }}
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={1.5}>1.5</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    name="risk"
                    value={item.risk}
                    onChange={e => {
                      const risk = e.target.value
                      setData(currentTitle => produce(currentTitle, v => {
                        v[index].risk = risk
                      }))
                    }}
                  >
                    <MenuItem value="LOW">LOW</MenuItem>
                    <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                    <MenuItem value="HIGH">HIGH</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    name="type"
                    value={item.type}
                    onChange={e => {
                      const type = e.target.value
                      setData(currentTitle => produce(currentTitle, v => {
                        v[index].type = type
                      }))
                    }}
                  >
                    <MenuItem value="undefined">undefined</MenuItem>
                    <MenuItem value="FUNCTIONAL">FUNCTIONAL</MenuItem>
                    <MenuItem value="NON_FUNCTIONAL">NON_FUNCTIONAL</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>

               <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={6}>
                <Collapse in={open} unmountOnExit>
                  <Table>
                    <TableBody>
                    {
                      item.subRequirements && item.subRequirements !== undefined ? (
                        item.subRequirements.map((obj, index) => ( 
                            <TableRow key={index} className={classes.root}>
                                <TableCell>
                                 Sub Requirements
                                </TableCell>
                                <TableCell>
                                  <TextField 
                                    type="text" 
                                    name="title" 
                                    value={obj.title} 
                                    onChange={e => {
                                      const title = e.target.value
                                     setData((currentTitle) => currentTitle.map(x => x.title === obj.title ? {                              
                                         ...x,
                                         title
                                     } : x))
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField 
                                    type="text" 
                                    name="description" 
                                    value={obj.description}
                                    onChange={e => {
                                      const description = e.target.value
                                      setData(currentTitle => produce(currentTitle, v => {
                                        v[index].description = description
                                      }))
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Select
                                    name="priotity"
                                    value={obj.priority}
                                    onChange={e => {
                                      const priority = e.target.value
                                      setData(currentTitle => produce(currentTitle, v => {
                                        v[index].priority = priority
                                      }))
                                    }}
                                  >
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={1.5}>1.5</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    name="risk"
                                    value={obj.risk}
                                    onChange={e => {
                                      const risk = e.target.value
                                      setData(currentTitle => produce(currentTitle, v => {
                                        v[index].risk = risk
                                      }))
                                    }}
                                  >
                                    <MenuItem value="LOW">LOW</MenuItem>
                                    <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                                    <MenuItem value="HIGH">HIGH</MenuItem>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    name="type"
                                    value={obj.type}
                                    onChange={e => {
                                      const type = e.target.value
                                      setData(currentTitle => produce(currentTitle, v => {
                                        v[index].type = type
                                      }))
                                    }}
                                  >
                                    <MenuItem value="undefined">undefined</MenuItem>
                                    <MenuItem value="FUNCTIONAL">FUNCTIONAL</MenuItem>
                                  </Select>
                                </TableCell>
                            </TableRow>
                        ))
                      ): (
                        null
                      )
                    } 
                    </TableBody>    
                   </Table> 
                 </Collapse>
                </TableCell>
              </TableRow>
                  
            </React.Fragment>
  )
}
