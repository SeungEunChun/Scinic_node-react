import dsearchicon from '../img/icon/icon_dsearch.svg'
import dcloseicon from '../img/icon/icon_dclose.svg'
function Search() {
    const handleClick = () => {
        document.body.classList.remove("dim")
    }
    return (
        <div className="showsearch">
            <div className='field'>
                <fieldset>
                    <legend>검색</legend>
                    <div className="searchForm " title="검색어 입력">
                        <input type="text" placeholder="검색어 입력
        "/>
                        <div className="activesearch">
                            <img src={dsearchicon} alt="검색버튼" />
                        </div>
                    </div>
                </fieldset>
                <div className="closesearch" onClick={handleClick}>
                    <img src={dcloseicon} alt="닫기버튼" />

                </div>
            </div>

        </div>
    )
}

export default Search;