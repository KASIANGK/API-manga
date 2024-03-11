import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DetailAnime() {
  const [animeDetails, setAnimeDetails] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const importAnimeDetails = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        const data = await response.json();
        setAnimeDetails(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    importAnimeDetails()
  }, [id])


  return (
    <div>
      <p>Detail Anime</p>
      {animeDetails ? ( 
        <div className="detail-anime">
          <p>{animeDetails.title}</p>
          <img src={animeDetails.images.jpg.image_url} alt={animeDetails.title} />
          <p>{animeDetails.synopsis}</p>
        </div>
      ) : (
        <p>OOOPS</p>
      )}
    </div>
  )
}

export default DetailAnime