import { useState, useEffect } from "react";
import './TopAnime.css';
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import Light from '../../assets/anime-light.webp'
import Dark from '../../assets/anime-dark.jpeg'
import Sunset from '../../assets/sunset.avif'
import BG from '../../assets/lightbg.jpeg'
import topanime from '../../assets/TOPMM.png'

function TopAnime() {

  // DECLARATION useState()
  const [topAnime, setTopAnime] = useState([])
  const [searchedWord, setSearchedWord] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  
  const itemsPerPage = 6



  // IMPORT API 
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


  // MISE A JOUR LA CLASS DU FILTRE EN FONCTION DE LA SELECTION 
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value)
  }

  // AFFICHAGE CONDITIONNEL EN FONCTION DE DE LA CLASS DU FILTRE SELECTIONNE
  const handleFilteredAnime = (filteredAnime) => {
      if (selectedFilter === "all") {
        filteredAnime = topAnime.filter((anime) => anime.title.toLowerCase().includes(searchedWord.toLowerCase()))
      } else if (selectedFilter === "episods12") {
        filteredAnime = topAnime.filter((anime) => parseInt(anime.episodes) >= 12)
      } else if (selectedFilter === "episods24") {
        filteredAnime = topAnime.filter((anime) => parseInt(anime.episodes) >= 24)
      } else {
        filteredAnime = []
      }
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      return filteredAnime.slice(startIndex, endIndex)
    }
    
  
  // BODY DU COMPONENT TopAnime
  return (
    <div className="top-anime-all">
      <Navbar></Navbar>
      <div className="intro"
      style={{backgroundImage: `url(${BG})`}}>
        <h1>Top Anime</h1>
        {/* <img className="title" src={topanime}></img> */}
      </div>
      <div className="barres">
        {topAnime.length > 0 ? (
          <Searchbar
            topAnime={topAnime}
            setTopAnime={setTopAnime}
            searchedWord={searchedWord}
            setSearchedWord={setSearchedWord}
          />
        ) : (
          <p>WAIT A LITTLE</p>
        )}

        <div className="filters">
          <select value={selectedFilter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="episods12">12 episods and less</option>
            <option value="episods24">24 episods and less</option>
          </select>
        </div>
      </div>

      <div className="top-anime">
        {handleFilteredAnime().length > 0 ? (
          handleFilteredAnime().map((element, i) => (
            <div key={i} className="card">
              <h4>{element.title}</h4>
              <img src={element.images.jpg.image_url} alt={element.title} />
              <div className="card-txt"> 
                <p>episodes : {element.episodes}</p>
                <p>score : {element.score}</p>
                <p>studio : {element.studios[0].name}</p>
                <Link to={"anime/" + element.mal_id}>
                  <button className="button-62" role="button">PLUS D'INFOS</button>
                </Link>
              </div> 
            </div>
          ))
          ) : (
                <p>WAIT A LITTLE</p>
                    )}
            </div>
            <div className="pagination">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                PREV
              </button>
              <span>{currentPage}</span>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= topAnime.length}>
                NEXT
              </button>
            </div>
        </div>
     )
}


export default TopAnime