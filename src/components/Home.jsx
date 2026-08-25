import { Alert, Box, Button, IconButton, Snackbar, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

function Home() {
    const baseurl = 'https://bookstore-ada52-default-rtdb.europe-west1.firebasedatabase.app/books';
    const [books, setBooks] = useState([]);
    const [deleteSnackOpen, setDeleteSnackOpen] = useState(false);

    const deleteBook = (book) => {
        fetch(`${baseurl}/${book.id}.json`, {
            method: 'DELETE'
        })
            .then(() => {
                setDeleteSnackOpen(true);
                loadData();
            })
            .catch(err => console.error(err))
    }

    const loadData = () => {
        fetch(`${baseurl}/.json`)
            .then(response => response.json())
            .then(resData => {
                const booksData = Object.keys(resData).map((bookKey) => {

                    return {
                        ...resData[bookKey],
                        id: bookKey
                    }
                })
                setBooks(booksData)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        loadData()
    }, []);

    const columns = [
        { field: 'title', headerName: 'Title', width: 300, },
        { field: 'author', headerName: 'Author', width: 300 },
        { field: 'year', headerName: 'Year', width: 100 },
        { field: 'isbn', headerName: 'Isbn', width: 200 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: 'actions', headerName: '', width: 100, sortable: false, filterable: false,
            renderCell: (item) => {
                return (<Tooltip title="Delete todo" >
                    <IconButton size="small" color="error" onClick={() => deleteBook(item.row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip >)
            }
        },
    ];

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={deleteSnackOpen}
                autoHideDuration={3000}
                onClose={() => setDeleteSnackOpen(false)}
            >
                <Alert severity='success'>Book deleted.</Alert>
            </Snackbar>
            <Box sx={{ p: 2 }}>
                <Button variant='outlined' LinkComponent={Link} to="/add">Add Book</Button>
            </Box>
            <DataGrid rows={books} columns={columns} />
        </>
    )
}

export default Home
