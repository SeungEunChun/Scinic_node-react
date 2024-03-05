import searchicon from '../img/icon/icon_search.svg'

function Search() {
    const handleClick = () => {
        document.body.classList.remove("dim")
    }
    return (
        <div className="showsearch">
            <fieldset>
                <legend>검색</legend>
                <div className="searchForm" title="검색어 입력">
                    <input type="text" placeholder="검색어 입력
        "/>
                    <div className="activesearch">
                        <img src={searchicon} alt="검색버튼" />
                    </div>
                </div>
            </fieldset>
            <div className="closesearch" onClick={handleClick}>
                <img src="" alt="닫기버튼" />
            </div>
        </div>
    )
}

export default Search;