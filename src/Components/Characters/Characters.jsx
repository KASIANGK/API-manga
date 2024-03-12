import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import './Characters.css'
import BACKG from '../../assets/PERSO.jpeg'
import TOPCC from '../../assets/TOPAA.png'

function Characters() {

    // DECLARATION useState
    const [characters, setCharacters] = useState([])
    const [charactersCharged, setCharactersCharged] = useState(false)
    const [hoveredImg, setHoveredImg] = useState(null)

    //IMPORT API
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch("https://api.jikan.moe/v4/characters")
                const data = await response.json()
                setCharacters(data.data)
                setCharactersCharged(true)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCharacters()
    }, [])

    // BODY COMPONENT Characters
    return (
        <div className="characters-all">
            <Navbar />
            <div className="introOK" style={{backgroundImage: `url(${BACKG})`}}>
                <h1>Top Anime</h1>
                {/* <img className="titleOK" src={TOPCC}></img> */}
            </div>
            <div className="characters">
                {charactersCharged ? (
                    characters.map((element, i) => (
                        <div key={i} className="character-container" onMouseEnter={() => setHoveredImg(i)} onMouseLeave={() => setHoveredImg(null)}>
                            <img src={element.images.jpg.image_url} alt={element.name} />
                            {hoveredImg === i && <p className="character-name">{element.name}</p>}
                        </div>
                    ))
                ) : (
                    <p>WAIT A LITTLE</p>
                )}
            </div>
        </div>
    )
}

export default Characters
