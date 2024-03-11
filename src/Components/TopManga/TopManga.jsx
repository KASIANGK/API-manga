import { useState, useEffect } from "react"
import Navbar from "../Navbar/Navbar"
import { Link } from "react-router-dom"
import './TopManga.css'

function TopManga() {

    const [topManga, setTopManga] = useState([])


    useEffect(() => {
        const importDataManga = async () => {
            try {
                const topMangaResponse = await fetch(`https://api.jikan.moe/v4/top/manga`)
                const topMangaJson = await topMangaResponse.json()
                setTopManga(topMangaJson.data)

            } catch (error) {
                console.log(error)
            }
        }

        importDataManga()
    }, [])

    return (
        <div className="top-manga-all">
            <Navbar></Navbar>
            <h1>Top Manga</h1>
                <div className="top-manga">
                    {topManga.length > 0 ? (
                        topManga.map((element, i) => (
                            <div key={i} className="card">
                                <p>{element.title}</p>
                                <img src={element.images.jpg.image_url} />
                                <Link to={`/manga/${element.mal_id}`}> 
                                    <button>PLUS D'INFOS</button>  
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>OOPS</p>
                    )}
                </div>
        </div>
    )
}

export default TopManga
