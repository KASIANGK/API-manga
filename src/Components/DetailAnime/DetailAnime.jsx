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
      {/* <p>Detail Anime</p> */}

      {animeDetails ? (
        <div className="detail-anime">
          <div className="da">
            <div className="detail-anime-one">
              <p>{animeDetails.titles[0].title}</p>
              <p>{animeDetails.title_japanese}</p>
              <p>score : {animeDetails.score}</p>
              <p>studio : {animeDetails.studios[0].name}</p>
              <p>genre(s) : 
                <p>{animeDetails.genres.map((element, i) => (
                  <span key={i}>
                    <p>{element.name}</p>
                  </span>
                ))}</p>
              </p>
            </div>
            <img className='img-anime' src={animeDetails.images.jpg.image_url} />
          </div>
          <div className="two">
            <p>{animeDetails.synopsis}</p>

          
            {opening && opening.openings.length > 0 && (
              <div className="open">
                <p>opening :</p>
                <p>
                  {opening.openings.map((element, i) => (
                    <p key={i}>
                    {element}
                    </p>
                  ))}
                </p>
              </div>
            )}

            {opening && opening.endings.length > 0 && (
              <div className="end">
                <p>ending :</p>
                <p>
                  {opening.endings.map((element, i) => (
                    <p key={i}>
                    {element}
                    </p>
                  ))}
                </p>
              </div>
            )}
          </div>
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
          <p>OOOPS, ANY AVAILABLE TRAILER</p>
        )}
      </div>

    </div>
  )
}

export default DetailAnime
