import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useTable, usePagination } from 'react-table'

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
}) => {
    const [value, setValue] = useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        updateMyData(index, id, value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
    Cell: EditableCell
}

function Table({ columns, data ,updateMyData, skipPageReset }) {
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
      state: { pageIndex },
    } = useTable(
        {
        columns,
        data,
        defaultColumn,
        autoResetPage: !skipPageReset,
        updateMyData
        }
    )

    
    return (
        <Fragment>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          })}
                        </tr>
                      )
                    })}
              </tbody>
            </table>
        </Fragment>
    )
}


function RqmTable() {
    const columns = React.useMemo(() => [
        {
        Header: "Nesto",
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Priority',
            accessor: 'priority',
          },
          {
            Header: 'Type',
            accessor: 'type',
          },
          {
            Header: 'Risk',
            accessor: 'risk',
          },
        ],}
    ])
    const [data, setData] = useState([])
    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const getRqm = () => {
        axios.get(`https://si-rqm.herokuapp.com/regular/project/60b274e4fb1cab1e41c32040`, { 
        })
        .then(res => {
          setData(res.data.result.requirements);
        })
        .catch(err => {
          console.log(err)
        })

      }
      console.log(data)

    useEffect(() => {
        getRqm()
    },[])

    const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }
  React.useEffect(() => {
    setSkipPageReset(false)
  }, [data])

    return(
        <Table
            columns={columns}
            data={data}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
        />
    )
}

export default RqmTable
