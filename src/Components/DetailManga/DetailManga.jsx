import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './DetailManga.css'

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
      {/* <p>Detail Manga</p> */}
      {mangaDetails ? ( 
        <div className="detail-manga">
          <h3>{mangaDetails.title}</h3>
          <img src={mangaDetails.images.jpg.image_url}/>
          <p>{mangaDetails.synopsis}</p>
          <p>{mangaDetails.title_japanese}</p>
          <p>genres : </p>
          {mangaDetails.genres.map((element, i) => (
            <span key={i}>
              {element.name}
            </span>
          ))}
          <p>status : {mangaDetails.status}</p>
          <p>dates : {mangaDetails.published.string}</p>
          <p>authors : </p>
          {mangaDetails.authors.map((element, i) => (
            <span key={i}>
              {element.name}
            </span>
          ))}
        </div>
      ) : (
        <p>WAIT A LITTLE</p>
      )}
    </div>
  )
}

export default DetailManga
