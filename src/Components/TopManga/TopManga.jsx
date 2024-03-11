import { useState, useEffect } from "react"
import './TopManga.css'
import { Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Searchbar from "../Searchbar/Searchbar"

function TopManga() {

    const [topManga, setTopManga] = useState([])
    const [searchedWord, setSearchedWord] = useState("")
    const [filteredAnimeData, setFilteredAnimeData] = useState([])


    useEffect(() => {
    const importData = async () => {
        try {
        const topMangaResponse = await fetch(`https://api.jikan.moe/v4/top/anime`)
        const topMangaJson = await topMangaResponse.json()
        setTopManga(topMangaJson.data)

        } catch (error) {
        console.log(error)
        }
    }

    importData()
    }, [])
    

    return (
        <div className="top-manga-all">
            <Navbar></Navbar>
            {topManga.length > 0 ? (
                <Searchbar 
            topManga={topManga} setTopManga={setTopManga}
            searchedWord={searchedWord} setSearchedWord={setSearchedWord}></Searchbar>
            ) : <p>LOADING</p>
            }

            <h1>Top Manga</h1>
            <h2>{searchedWord}</h2>
                <div className="top-manga">
                    {topManga.length > 0 ? (
                        topManga.map((element, i) => (
                            element.title.toLowerCase().includes(searchedWord.toLowerCase()) ? 
                            <div key={i} className="card">
                                <p>{element.title}</p>
                                <img src={element.images.jpg.image_url} />
                                <Link to={"manga/" + element.mal_id}>
                                    <button>PLUS D'INFOS</button>  
                                </Link>
                            </div>
                            : ''
              
                        ))
                    ) : (
                        <p>OOPS</p>
                    )}
                </div>
        </div>
    )
}


export default TopManga

