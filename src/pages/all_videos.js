import React from "react"
import API from "../utils/API"

import ScreenLogo from "../assets/image/screen_logo.png"
import SearchSVG from "../assets/icons/searchSVG";
import RightArrow from "../assets/icons/rightArrowSVG";
import ListVideos from "../components/list_videos";


class AllVideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchSuggestions: [],
            isSuggestionLoaded: false,
            isSearchLoaded: false,
            searchValue: '',
            isSearchLoading: false,
            all_videos: [],
        }
    }

    render() {
        let {searchSuggestions, isSearchLoaded, isSearchLoading, isSuggestionLoaded, searchValue, all_videos} = this.state
        return (
            <div style={isSearchLoaded ? {display: "flex-inline"} : null}>

                <div style={isSearchLoaded ? {
                    display: "flex",
                    borderBottom: "1px solid #dfe1e5",
                    paddingBottom: 30
                } : null}>
                    <div className={isSearchLoaded ? "screen-logo-loaded" : "screen-logo"}>
                        <img className="main-image" src={ScreenLogo} alt="YTS"/>
                    </div>
                    <div className={isSearchLoaded ? "search-query-parent-loaded" : "search-query-parent"} style={
                        isSuggestionLoaded ?
                            {
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 0,
                            } : null}>
                        <div className="iblpc">
                            <style
                                data-iml="1604581045076">.hsuHs{"margin:auto"}.wFncld{"margin - top:3px;color:#9aa0a6;height:20px;width:20px"}</style>
                            <div className="hsuHs">
                <span className="wFncld z1asCe MZy1Rb">
                <SearchSVG/>
                </span>
                            </div>
                        </div>
                        <input className="search-query" value={searchValue} onChange={this.handleSuggestion}
                               onBlur={(_) =>
                                   setTimeout(() => {
                                       this.setState({
                                           searchSuggestions: [],
                                           isSuggestionLoaded: false,
                                       })
                                   }, 200)}/>

                        <div className={searchValue.length > 0 ? "right-arrow" : "non-display"}
                             onClick={this.handleSearch}>
                            <div className="iblpc">
                                <style
                                    data-iml="1604581045076">.hsuHs{"margin:auto"}.wFncld{"margin - top:3px;color:#9aa0a6;height:20px;width:20px"}</style>
                                <div className="hsuHs-arrow">
                <span className="wFncld z1asCe MZy1Rb">
                {isSearchLoading ? <div className="loader"/> : <RightArrow/>}
                    <div className="lds-hourglass"/>
                </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isSuggestionLoaded &&
                    <div className={isSearchLoaded ? "suggestion-parent-loaded" : "suggestion-parent"}>
                        {searchSuggestions.map(
                            suggestion =>
                                <div key={suggestion} className="suggestion-option"
                                     onClick={(_) => this.setState({searchValue: suggestion})}>
                                    <div className="iblpc">
                                        <style
                                            data-iml="1604581045076">.hsuHs{"margin:auto"}.wFncld{"margin - top:3px;color:#9aa0a6;height:20px;width:20px"}</style>
                                        <div className="hsuHs">
                            <span className="wFncld z1asCe MZy1Rb">
                                <SearchSVG/>
                            </span>

                                        </div>
                                    </div>
                                    <div className="suggestion-text">{suggestion}</div>
                                </div>
                        )
                        }
                    </div>}

                </div>

                {isSearchLoaded && <div className="list-videos"><ListVideos all_videos={all_videos}/></div>}

            </div>

        );
    }

    handleSuggestion = (e
    ) => {
        clearTimeout(this.timeout)
        this.setState({searchValue: e.target.value})
        this.timeout = setTimeout(() => {
            let query_phrase = e.target.value
            API.get(`youtube_auto_suggest?query_phrase= ${query_phrase}`)
                .then(res => {
                    this.setState({
                        searchSuggestions: res.data,
                        isSuggestionLoaded: true
                    })
                }).catch(err => console.log(err));
        }, 100)

    }
    handleSearch = (_) => {
        if (this.state.isSearchLoading === false) {
            this.setState({isSearchLoading: true})
            let search_value = this.state.searchValue
            if (search_value && search_value.length > 0) {
                let search_data = JSON.stringify({query_phrase: search_value})
                API.post("youtube_query", search_data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((result) => {
                        this.setState({
                            all_videos: result.data.data,
                            isSearchLoading: false,
                            isSearchLoaded: true,
                        })
                        console.log(result.data)
                    })
                    .catch()

            }
        }
    }
}

export default AllVideos