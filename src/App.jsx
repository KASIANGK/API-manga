import { useState, useEffect } from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './App.css'
import TopAnime from '../src/Components/TopAnime/TopAnime'
import DetailAnime from './Components/DetailAnime/DetailAnime'
import TopManga from './Components/TopManga/TopManga'
import DetailManga from './Components/DetailManga/DetailManga'
import Characters from './Components/Characters/Characters'


function App() {

const routeur = createBrowserRouter([
  {
    path: '/',
    element: <TopAnime></TopAnime>
  },
  {
    path: '/anime/:id',
    element: <DetailAnime></DetailAnime>
  },
  {
    path: '/manga',
    element: <TopManga></TopManga>
  },
  {
    path: '/manga/:id',
    element: <DetailManga></DetailManga>
  },
  {
    path: '/characters',
    element: <Characters></Characters>
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
