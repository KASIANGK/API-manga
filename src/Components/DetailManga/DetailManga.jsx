import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './DetailManga.css'
import backgroundmanga from '../../assets/bg-dark.jpeg'

function DetailManga() {
  const [mangaDetails, setMangaDetails] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const importMangaDetails = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`)
        const data = await response.json();
        setMangaDetails(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    importMangaDetails()
  }, [id])


  return (
    <div className="manga-all">
      <Navbar></Navbar>
      <div className="manga-back"
      style={{backgroundImage: `url(${backgroundmanga})`}}>
      {mangaDetails ? ( 
        <div className="detail-manga">
          <div className="detail-intro">
            <div className="intro-manga">
              <h3>{mangaDetails.title}</h3>
              <p>{mangaDetails.title_japanese}</p>
              <img src={mangaDetails.images.jpg.image_url}/>
            </div>
            <div className="intro2-manga">
              <div className="intro-space"></div>
              <p>status : {mangaDetails.status}</p>
              <p>dates : {mangaDetails.published.string}</p>
              <p>authors : </p>
              {mangaDetails.authors.map((element, i) => (
                <p key={i}>
                  {element.name}
                </p>
              ))}

              <p>genres : </p>
              {mangaDetails.genres.map((element, i) => (
                <p id='genres-manga' key={i}>
                  {element.name}
                </p>
              ))}
            </div>
          </div>
          <p>{mangaDetails.synopsis}</p>

        </div>
      ) : (
        <p>WAIT A LITTLE</p>
      )}
      </div>
    </div>
  )
}

export default DetailManga
