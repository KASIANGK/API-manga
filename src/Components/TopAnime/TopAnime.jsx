// import { useState, useEffect } from "react"
// import './TopAnime.css'
// import { Link } from "react-router-dom"
// import Navbar from "../Navbar/Navbar"
// import Searchbar from "../Searchbar/Searchbar"

// function TopAnime() {

//     const [topAnime, setTopAnime] = useState([])
//     const [searchedWord, setSearchedWord] = useState("")
//     const [filteredAnimeData, setFilteredAnimeData] = useState([])


//     useEffect(() => {
//     const importData = async () => {
//         try {
//         const topAnimeResponse = await fetch(`https://api.jikan.moe/v4/top/anime`)
//         const topAnimeJson = await topAnimeResponse.json()
//         setTopAnime(topAnimeJson.data)

//         } catch (error) {
//         console.log(error)
//         }
//     }

//     importData()
//     }, [])


//     return (
//         <div className="top-anime-all">
//             <Navbar></Navbar>
//             {topAnime.length > 0 ? 
//                 <Searchbar 
//             topAnime={topAnime} setTopAnime={setTopAnime}
//             searchedWord={searchedWord} setSearchedWord={setSearchedWord}></Searchbar>
//             : <p>LOADING</p>
//             }

//             <h1>Top Anime</h1>
//             <h2>{searchedWord}</h2>
//                 <div className="top-anime">
//                     {topAnime.length > 0 ? (
//                         topAnime.map((element, i) => (
//                             element.title.toLowerCase().includes(searchedWord.toLowerCase()) ? 
//                             <div key={i} className="card">
//                                 <p>{element.title}</p>
//                                 <img src={element.images.jpg.image_url} />
//                                 <Link to={"anime/" + element.mal_id}>
//                                     <button>PLUS D'INFOS</button>  
//                                 </Link>
//                             </div>
//                             : ''
              
//                         ))
//                     ) : (
//                         <p>OOPS</p>
//                     )}
//                 </div>
//         </div>
//     )
// }


// export default TopAnime



import { useState, useEffect } from "react";
import './TopAnime.css';
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";

function TopAnime() {
  const [topAnime, setTopAnime] = useState([])
  const [searchedWord, setSearchedWord] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

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

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value)
  }

//   const handleFilteredAnime = () => {
//     if (selectedFilter === "all") {
//       return topAnime.filter((anime) => anime.title.toLowerCase().includes(searchedWord.toLowerCase()))
//     } else if (selectedFilter === "episods12") {
//       return topAnime.filter((anime) => {
//         const episodNbre = parseInt(anime.episodes)
//         return episodNbre >= 12
//       })
//     } else if (selectedFilter === "episods24") {
//       return topAnime.filter((anime) => {
//         const episodNbr = parseInt(anime.episodes)
//         return episodNbr >= 24
//       })
//     } else {
//       return []
//     }
//   } 

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
    return filteredAnime
  }
  

  return (
    <div className="top-anime-all">
      <Navbar></Navbar>
      {topAnime.length > 0 ? (
        <Searchbar
          topAnime={topAnime}
          setTopAnime={setTopAnime}
          searchedWord={searchedWord}
          setSearchedWord={setSearchedWord}
        />
      ) : (
        <p>LOADING</p>
      )}

      <h1>Top Anime</h1>
      <h2>{searchedWord}</h2>

      <div className="filters">
        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="episods12">12 episods or more</option>
          <option value="episods24">24 episods or more</option>
        </select>
      </div>

      <div className="top-anime">
        {handleFilteredAnime().length > 0 ? (
          handleFilteredAnime().map((element, i) => (
            <div key={i} className="card">
              <p>{element.title}</p>
              <img src={element.images.jpg.image_url} alt={element.title} />
              <p>{element.episodes}</p>
              <Link to={"anime/" + element.mal_id}>
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


export default TopAnime