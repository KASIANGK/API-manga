import { useState, useEffect } from "react"
import './TopAnime.css'
import { Link } from "react-router-dom"

function TopAnime() {

    const [topAnime, setTopAnime] = useState([])


    useEffect(() => {
    const importData = async () => {
        try {
        const topAnimeResponse = await fetch(`https://api.jikan.moe/v4/top/anime`)
        const topAnimeJson = await topAnimeResponse.json()
        setTopAnime(topAnimeJson.data)

        } catch (error) {
        console.log(error)
        }
    }

    importData()
    }, [])


    return (
        <div className="top-anime">
            <h1>Top Anime</h1>
            {topAnime.length > 0 ? (
                topAnime.map((element, i) => (
                    <div key={i}>
                        <p>{element.title}</p>
                        <img src={element.images.jpg.image_url} />
                        <Link to={"anime/" + element.mal_id}>
                            <button>PLUS D'INFOS</button>  
                        </Link>
                    </div>
                ))
            ) : (
                <p>OOPS</p>
            )}
        </div>
    )
}


export default TopAnime



