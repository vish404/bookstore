import { BrowserRouter, Route, Routes } from 'react-router'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Home from './components/Home'
import AddBook from './components/AddBook'

function App() {
  
  return (
    <BrowserRouter>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
