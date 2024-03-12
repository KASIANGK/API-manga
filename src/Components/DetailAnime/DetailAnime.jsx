import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './DetailAnime.css'

function DetailAnime() {

  // DECLARATION useState()
  const [animeDetails, setAnimeDetails] = useState(null)
  const [opening, setOpening] = useState(null)
  // DECLARATION useParams()
  const { id } = useParams()

  // IMPORT DEUX API
  useEffect(() => {
    const importAnimeDetails = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        const data = await response.json()
        setAnimeDetails(data.data)

        const openingResponse = await fetch(`https://api.jikan.moe/v4/anime/${id}/themes`)
        const openingJson = await openingResponse.json()
        setOpening(openingJson.data)

      } catch (error) {
        console.error(error)
      }
    }
    importAnimeDetails()
  }, [id])

  // BODY COMPONENT DetailAnime
  return (
    <div>
      <Navbar />
      <p>Detail Anime</p>

      {animeDetails ? (
        <div className="detail-anime">
          <p>{animeDetails.titles[0].title}</p>
          <p>{animeDetails.title_japanese}</p>
          <p>SCORE : {animeDetails.score}</p>
          <p>STUDIO : {animeDetails.studios[0].name}</p>
          <p>GENRE(S) : 
            {animeDetails.genres.map((element, i) => (
              <span key={i}>
                <p>{element.name}</p>
              </span>
            ))}
          </p>
          <img src={animeDetails.images.jpg.image_url} />
          <p>{animeDetails.synopsis}</p>

        
          {opening && opening.openings.length > 0 && (
            <div>
              <p>OPENING :</p>
              <ul>
                {opening.openings.map((element, i) => (
                  <li key={i}>
                  {element}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {opening && opening.endings.length > 0 && (
            <div>
              <p>ENDING :</p>
              <ul>
                {opening.endings.map((element, i) => (
                  <li key={i}>
                  {element}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>OOOPS</p>
      )}

      <div className="trailer">
        {animeDetails ? (
          <iframe
          width='560'
          height='315'
          src={animeDetails.trailer.embed_url}
          allowFullScreen
        >
        </iframe>
        ) :
        (
          <p>NO TRAILER</p>
        )}
      </div>

    </div>
  )
}

export default DetailAnime
