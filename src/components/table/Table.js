import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {filter} from '../../index';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function MTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filterValue, setFilterValue] = React.useState('');

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
        filter(e.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if ((props.rows.length - 25) <= (newPage + 1) * 25) {
            props.fetchMoreData(newPage);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = +event.target.value;
        setRowsPerPage(newRowsPerPage);
        setPage(0);

        if (props.rows.length <= newRowsPerPage) {
            props.fetchMoreData(page);
        }
    };

    const columns = [
        {
            id: 'name',
            label: 'Repo name',
            minWidth: 170
        },
        {
            id: 'owner',
            label: 'Author',
            minWidth: 100
        },
        {
            id: 'url',
            label: 'Url',
            minWidth: 170
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 170
        },
        {
            id: 'stargazerCount',
            label: 'Stars',
            minWidth: 170
        },
    ];

    return (
        <Paper className={classes.root}>
            <input type="text"
                   value={filterValue}
                   onChange={handleFilterChange}
            />
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {   props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.url}>
                                {   columns.map((column) => {
                                        const value = row[column.id];

                                        return (
                                            <TableCell key={column.id}>
                                                {column.id === 'name' ? <Link to={`/details/${value}`}> { value } </Link> : value}
                                            </TableCell>
                                        );
                                    })
                                }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}