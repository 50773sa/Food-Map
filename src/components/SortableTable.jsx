import { useTable, useSortBy } from 'react-table'
import Table from 'react-bootstrap/Table'

const SortableTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy)

    return (
        <Table bordered hover {...getTableProps()}>
            <thead className='table-headers'>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps( column.getSortByToggleProps())}>
                                {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc 
                                                ? '↑'
                                                : '↓'
                                            : ''
                                        }
                                    </span>
                            </th>
                        ))}
                    </tr>
                ))}     
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map(row =>{
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td className='table-cells' {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default SortableTable