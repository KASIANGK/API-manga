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
    element: <TopAnime />
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
    <div className='all'>
      <RouterProvider router={routeur}></RouterProvider>
    </div>
  )
}

export default App
