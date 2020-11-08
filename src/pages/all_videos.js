import React from "react"
import API from "../utils/API"

import ScreenLogo from "../assets/image/screen_logo.png"
import SearchSVG from "../assets/icons/searchSVG";


class AllVideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchSuggestions: [],
            isSuggestionLoaded: false,
            searchValue: '',
        }
    }

    render() {
        let {searchSuggestions, isSuggestionLoaded, searchValue} = this.state
        return (
            <>
                <div className="screen-logo">
                    <img className="main-image" src={ScreenLogo} alt="YTS"/>
                </div>
                <div className="search-query-parent" style={
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
                    <input className="input-search" value={searchValue} onChange={this.handleSearchQuery} onBlur={(_) =>
                        setTimeout(() => {
                            this.setState({
                                searchSuggestions: [],
                                isSuggestionLoaded: false,
                            })
                        }, 200)}/>
                </div>

                {isSuggestionLoaded && <div className="suggestion-parent">
                    { searchSuggestions.map(
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

            </>

        );
    }

    handleSearchQuery = (e) => {
        clearTimeout(this.timeout)
        this.setState({searchValue: e.target.value})
        this.timeout = setTimeout(() => {
            let query_phrase = e.target.value
            API.get(`youtube_auto_suggest?query_phrase=${query_phrase}`)
                .then(res => {
                    this.setState({

                        searchSuggestions: res.data,
                        isSuggestionLoaded: true
                    })
                }).catch(err => console.log(err));
        }, 100)

    }
}

export default AllVideos