import { useState, useEffect } from 'react'
import './App.css'
import TopAnime from '../src/Components/TopAnime/TopAnime'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

function App() {

const routeur = createBrowserRouter([
  {
    path: '/',
    element: <TopAnime></TopAnime>
  }
])



  return (
    <div>
      <h1>hello</h1>
      <RouterProvider router={routeur}></RouterProvider>
    </div>
  )
}

export default App
