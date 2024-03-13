import { useState, useEffect } from "react"
import './TopManga.css'
import { Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Searchbar from "../Searchbar/Searchbar"
import BACK from '../../assets/darkbg.jpeg'
import TOPMM from '../../assets/TOPCC.png'

function TopManga() {

    const [topManga, setTopManga] = useState([])
    const [searchedWord, setSearchedWord] = useState("")


    useEffect(() => {
    const importData = async () => {
        try {
        const topMangaResponse = await fetch(`https://api.jikan.moe/v4/top/manga`)
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
            <div className="intro"
            style={{backgroundImage: `url(${BACK})`}}>
                <h1>Top Manga</h1>
                {/* <img className="title" src={TOPMM}></img> */}
            </div>
            <div className="search">
            {topManga.length > 0 ? (
                <Searchbar 
            topManga={topManga} setTopManga={setTopManga}
            searchedWord={searchedWord} setSearchedWord={setSearchedWord}></Searchbar>
            ) : <p>LOADING</p>
            }
            </div>
                <div className="top-manga">
                    {topManga.length > 0 ? (
                        topManga.map((element, i) => (
                            element.title.toLowerCase().includes(searchedWord.toLowerCase()) ? 
                            <div key={i} className="card">
                                <div className="card-title">
                                    <h4>{element.title}</h4>
                                </div>
                                <img src={element.images.jpg.image_url} />
                                <div className="card-txt">
                                    <p>volumes : {element.volumes}</p>
                                    <p>score : {element.score}</p>
                                    {element.studios && element.studios.length > 0 && (
                                        <p>studio : {element.studios[0].name}</p>
                                    )}
                                    <p>authors :</p>
                                    <p>
                                        {element.authors.map((author, j) => (
                                            <p key={j}>{author.name}</p>
                                        ))}
                                    </p>
                                    <Link to={"/manga/" + element.mal_id}>
                                        <button className="button-32" role="button">PLUS D'INFOS</button>  
                                    </Link>
                                </div>
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

