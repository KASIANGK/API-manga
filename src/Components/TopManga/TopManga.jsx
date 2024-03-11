function TopManga() {

    const [topManga, setTopManga] = useState([])


    useEffect(() => {
    const importData = async () => {
        try {
        const topMangaResponse = await fetch(`https://api.jikan.moe/v4/top/anime`)
        const topMangaJson = await topMangaResponse.json()
        setTopManga(topMangaJson.data)

        } catch (error) {
        console.log(error)
        }
    }

    importData()
    }, [])

    return (
        <div>

        </div>
    )
}

export default TopManga