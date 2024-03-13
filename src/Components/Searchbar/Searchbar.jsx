import { useState, useEffect } from "react"
import './Searchbar.css'

function Searchbar ({topAnime, setTopAnime, searchedWord, topManga, setSearchedWord}) {

    
    return (
      <input className="inp"
        type="text"
        placeholder="search... 🔎"
        value={searchedWord}
        onChange={(e) => setSearchedWord(e.target.value)}
      />
    )
  }
  
  export default Searchbar