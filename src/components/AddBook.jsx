import { useState } from 'react'
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router';

function AddBook() {
    const baseurl = 'https://bookstore-ada52-default-rtdb.europe-west1.firebasedatabase.app/books';
    const [book, setBook] = useState({
        author: '',
        isbn: '',
        price: '',
        title: '',
        year: ''
    })
    const [addedSnackOpen, setAddedSnackOpen] = useState(false);
    const [validationSnack, setValidationSnack] = useState(false);

    const navigate = useNavigate()
    const inputChanged = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    }

    const isFormInvalid = () => Object.values(book).some(value => String(value).trim() === '');

    const addBook = () => {

        if (isFormInvalid()) {
            setValidationSnack(true);
            return;
        }
        fetch(`${baseurl}/.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
            .then(() => {
                setAddedSnackOpen(true);
                navigate("/", { replace: true })
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <Box sx={{ p: 2 }}>
                <Typography>Add Book</Typography>
                <Stack direction="column"
                    spacing={2}
                    mt={2}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                    <TextField
                        variant="standard"
                        label="Title"
                        placeholder="Title"
                        name="title"
                        value={book.title}
                        onChange={inputChanged} />

                    <TextField
                        variant="standard"
                        label="Author"
                        placeholder="Author"
                        name="author"
                        value={book.author}
                        onChange={inputChanged} />
                    <TextField
                        variant="standard"
                        label="Year"
                        placeholder="Year"
                        name="year"
                        value={book.year}
                        onChange={inputChanged} />
                    <TextField
                        variant="standard"
                        label="Isbn"
                        placeholder="Isbn"
                        name="isbn"
                        value={book.isbn}
                        onChange={inputChanged} />
                    <TextField
                        variant="standard"
                        label="Price"
                        placeholder="Price"
                        name="price"
                        value={book.price}
                        onChange={inputChanged} />
                    <Button onClick={addBook} variant="outlined" startIcon={<SaveIcon />}>Add</Button>
                </Stack>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={addedSnackOpen}
                autoHideDuration={3000}
                onClose={() => setAddedSnackOpen(false)}
            >
                <Alert severity='success'>Book added.</Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={validationSnack}
                autoHideDuration={3000}
                onClose={() => setValidationSnack(false)}

            >
                <Alert severity='error'>All fields are required.</Alert>
            </Snackbar>
        </>
    )
}

export default AddBook