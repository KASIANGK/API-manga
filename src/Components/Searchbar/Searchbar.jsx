import { useState, useEffect } from "react"

function Searchbar ({topAnime, setTopAnime, searchedWord, topManga, setSearchedWord}) {

    
    return (
      <input
        type="text"
        placeholder="search..."
        value={searchedWord}
        onChange={(e) => setSearchedWord(e.target.value)}
      />
    )
  }
  
  export default Searchbar