import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import React, { useEffect, useState } from 'react'
import './App.css'
import { Carousel } from './components/Carousel/Carausel'
import { CATS, SHARKS } from './config/constants'

function App() {
  const [response, setResponse] = useState(null)
  const [cats, setCats] = useState(true)
  const [sharks, setSharks] = useState(true)
  const toggleCats = (e) => {
    setCats(e.target.checked)
  }
  const toggleSharks = (e) => {
    setSharks(e.target.checked)
  }

  const callAPI = (option = '') => {
    fetch(`http://localhost:9000/${option}`)
      .then((res) => {
        const result = res.json()
        return result
      })
      .then((res) => {
        setResponse(res)
      })
  }
  useEffect(() => {
    if (cats && sharks) {
      callAPI()
    } else if (cats) {
      callAPI(CATS)
    } else if (sharks) {
      callAPI(SHARKS)
    } else {
      //when no option is selected
      callAPI()
    }
  }, [cats, sharks])

  return (
    <div>
      {response && Boolean(response.length) ? (
        <>
          <div className='carouselContainer'>
            <FormControlLabel
              control={
                <Switch
                  color='secondary'
                  checked={cats}
                  onChange={toggleCats}
                />
              }
              label='Cats'
            />
            <FormControlLabel
              control={
                <Switch
                  color='warning'
                  checked={sharks}
                  onChange={toggleSharks}
                />
              }
              label='Sharks'
            />
          </div>
          <Carousel data={response} />
        </>
      ) : (
        <div className='loadingIcon'>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default App
