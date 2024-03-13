import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './DetailAnime.css'
import blackback from '../../assets/blackback.jpeg'
import lowdown from '../../assets/LOWDOWN.png'
import description from '../../assets/DESC.png'
import good from '../../assets/G2K.png'
import trai from '../../assets/TRAI.png'
import testbg from '../../assets/test-bg-3.jpg'
import { Link } from "react-router-dom";



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

      {animeDetails ? (
        <div className="detail-anime"
        style={{backgroundImage: `url(${testbg})`}}>
          {/* <div className="lowdown">
            <img src={lowdown}></img>
          </div> */}
          <div className="da">
            <div className="detail-anime-one">
              <p className="titre-og">{animeDetails.titles[0].title}</p>
              <p>{animeDetails.title_japanese}</p>
              <p>score : {animeDetails.score}</p>
              <p>studio : {animeDetails.studios[0].name}</p>
              <p>genre(s) : 
                <p className="genres">{animeDetails.genres.map((element, i) => (
                  <span key={i}>
                    <p>{element.name}</p>
                  </span>
                ))}</p>
              </p>
            </div>
            <div className="lowdown-contenair">
              {/* <img className='lowdown-content' src={lowdown}></img> */}
              <img className='img-anime' src={animeDetails.images.jpg.image_url} />
            </div>
          </div>
          {/* <div className="two-after">
            <Link to='/'><button>BACK TO MENU</button></Link>
          </div> */}
          <div className="two">
            <div className="syno-og">
              <img className='desc-content' src={description}></img>
              <p id="syno">{animeDetails.synopsis}</p>
            </div>
            <div className="trailer">
              <img src={trai}></img>
              {animeDetails ? (
                <iframe className="yt-trailer"
                width='860'
                height='415'
                src={animeDetails.trailer.embed_url}
                allowFullScreen
              >
              </iframe>
              ) :
              (
                <p>OOOPS, ANY AVAILABLE TRAILER</p>
              )}
            </div>
            <div className="op">
              {opening && opening.openings.length > 0 && (
                <div className="open">
                  <img src={good}></img>
                  <p className="open-title">OPENING :</p>
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
                  <p className="end-title">ENDING :</p>
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
            {/* <div className="trailer">
              <img src={trai}></img>
              {animeDetails ? (
                <iframe className="yt-trailer"
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
            </div> */}
          </div>
        </div>
      ) : (
        <p>WAIT A LITTLE</p>
      )}
      

      {/* <div className="trailer">
        <img src={trai}></img>
        {animeDetails ? (
          <iframe className="yt-trailer"
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
      </div> */}

    </div>
  )
}

export default DetailAnime
