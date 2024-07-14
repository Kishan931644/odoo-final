import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <>

    </>
  )
}

export default App
