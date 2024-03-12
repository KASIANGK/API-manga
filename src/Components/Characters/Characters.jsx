import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import './Characters.css'

function Characters() {

    // DECLARATION useState
    const [characters, setCharacters] = useState([])
    const [charactersCharged, setCharactersCharged] = useState(false)

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
            <Navbar></Navbar>
            <div className="characters">
                {charactersCharged ? (
                    characters.map((element, i) => (
                        <div key={i}>
                            <p>{element.name}</p>
                            <img src={element.images.jpg.image_url}/>
                        </div>
                    ))
                ) : (
                    <p>OOOPS</p>
                )}
            </div>
        </div>
    )
}

export default Characters
