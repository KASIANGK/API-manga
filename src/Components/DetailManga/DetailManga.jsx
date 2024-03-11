import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <p>Detail Manga</p>
      {mangaDetails ? ( 
        <div className="detail-manga">
          <p>{mangaDetails.title}</p>
          <img src={mangaDetails.images.jpg.image_url}/>
          <p>{mangaDetails.synopsis}</p>
        </div>
      ) : (
        <p>OOOPS</p>
      )}
    </div>
  )
}

export default DetailManga
