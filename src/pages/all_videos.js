import React from "react"
import API from "../utils/API"

import SearchSVG from "../assets/icons/searchSVG";
import RightArrow from "../assets/icons/rightArrowSVG";
import ListVideos from "../components/list_videos";
import YoutubeSVG from "../assets/icons/youtubeSVG";
import SoundCloudSVG from "../assets/icons/soundcloudSVG";
import MovieSVG from "../assets/icons/movieSVG";
import LogoSVG from "../assets/icons/logoSVG";

class AllVideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchSuggestions: [],
            isSuggestionLoaded: false,
            isSearchLoaded: false,
            searchValue: '',
            isSearchLoading: false,
            isYoutubeLoaded: false,
            viewBoxLogoSVG: "0 0 150.51502 42.928498",
            all_videos: [],
            chosenPlatform: 'all',
            windowWidth: window.innerWidth,
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleEnter)
        window.addEventListener("resize", this.handleSize);

    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleEnter)
        window.addEventListener("resize", this.handleSize);
    }

    handleEnter = (e) => e.key === "Enter" && this.handleSearch()

    render() {
        let {windowWidth} = this.state;
        let {chosenPlatform, viewBoxLogoSVG, searchSuggestions, isSearchLoaded, isSearchLoading, isSuggestionLoaded, searchValue, all_videos} = this.state
        let movieSVG = <MovieSVG className="top-icon" id="movie"/>
        let youTubeSVG = <YoutubeSVG className="top-icon" id="youtube"
                                     hoverColor='#000'/>
        let soundCloudSVG = <SoundCloudSVG className="top-icon" id="soundcloud"
                                           hoverColor='#FF0000'/>
        switch (chosenPlatform) {
            case 'movie':
                movieSVG = <MovieSVG className="top-icon chosen" id="movie"/>

                break
            case 'youtube':
                youTubeSVG = <YoutubeSVG className="top-icon chosen" id="youtube"/>
                break
            case 'soundcloud':
                soundCloudSVG = <SoundCloudSVG className="top-icon chosen" id="soundcloud"/>
                break
            default:
                break
        }
        return (
            <div className="main-container" style={isSearchLoaded ? {
                display: "flex-inline",
                alignItems: "center",
                justifyContent: "center"
            } : null}>

                <div className={isSearchLoaded ? "search-container-loaded" : "search-container"}
                     style={isSearchLoaded ? {
                         display: "flex",
                         borderBottom: "1px solid #dfe1e5",
                         paddingBottom: 30,
                         paddingTop: 0
                     } : null}>
                    <div className={isSearchLoaded ? "screen-logo-loaded" : "screen-logo"}>
                        {isSearchLoaded &&
                        <div className="logo-container">
                            <LogoSVG viewBox={windowWidth > 700 ? "0 -20 200 70" : "0 0 80.51502 42.928498"}/>
                        </div>
                        }
                        {!isSearchLoaded &&
                        <React.Fragment>
                            <div className="logo-container">
                                <LogoSVG viewBox={viewBoxLogoSVG}/>
                            </div>
                        </React.Fragment>
                        }

                    </div>
                    <div className={isSearchLoaded ? "search-query-parent-loaded" : "search-query-parent"}>
                        <div className="search-box-container"  style={
                            isSuggestionLoaded ?
                                {
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    borderBottom:0,
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
                        <div className="category-container" id={isSearchLoaded ? "loaded" : " "}>
                            <div className="ct-youtube">
                                <input id="cat-youtube" type="checkbox" name="cat-youtube" value="cat-youtube"/>
                                <label htmlFor="cat-youtube">Youtube</label>
                            </div>
                            <div className="ct-movies">
                                <input id="cat-movies" type="checkbox" name="cat-movies" value="cat-movies"/>
                                <label htmlFor="cat-movies">Movies & TV Series</label>
                            </div>
                            <div className="ct-educational">
                                <input id="cat-educational" type="checkbox" name="cat-educational"
                                       value="cat-educational"/>
                                <label htmlFor="cat-educational">Educational</label>
                            </div>
                            <div className="ct-music">
                                <input id="cat-music" type="checkbox" name="cat-music" value="cat-music"/>
                                <label htmlFor="cat-music">Music</label>
                            </div>
                            <div className="ct-adult">
                                <input id="cat-adult" type="checkbox" name="cat-adult" value="cat-adult"/>
                                <label htmlFor="cat-adult">Adult Content</label>
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

    handleSize = (e) => {
        this.state = {windowWidth: window.innerWidth}
    }
    handleSuggestion = (e
    ) => {
        var insertedString = e.target.value.toLowerCase();
        if (insertedString.includes('youtube.com')) {
            this.setState({chosenPlatform: 'youtube', searchValue: e.target.value})
        } else if (insertedString.includes('youtu.be/')) {
            this.setState({chosenPlatform: 'youtube', searchValue: e.target.value})
        } else if (insertedString.includes('soundcloud.com')) {
            this.setState({chosenPlatform: 'soundcloud', searchValue: e.target.value})
        } else {
            this.setState({chosenPlatform: e.target.value.length > 0 ? 'movie' : '', searchValue: e.target.value})
        }
        clearTimeout(this.timeout)
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
                API.get(`search?query=${search_value}&filtering_type=movie`)
                    .then((result) => {
                        this.setState({
                            all_videos: result.data.data,
                            isSearchLoading: false,
                            isSearchLoaded: true,
                        })
                    })
                    .catch()

            }
        }
    }
}

export default AllVideos