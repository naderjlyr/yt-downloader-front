import React from "react"
import API from "../utils/API"
import {createBrowserHistory} from "history"

import SearchSVG from "../assets/icons/searchSVG";
import RightArrow from "../assets/icons/rightArrowSVG";
import ListVideos from "../components/list_videos";
import LogoSVG from "../assets/icons/logoSVG";

const history = createBrowserHistory()

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchSuggestions: [],
            isSuggestionLoaded: false,
            searchValue: '',
            isYoutubeLoaded: false,
            viewBoxLogoSVG: "0 0 150.51502 42.928498",
            all_videos: [],
            chosenPlatform: 'all',
            windowWidth: window.innerWidth,
            isBoxChecked: {
                "youtube-select": "unchecked", "movie-select": "unchecked",
                "educational-select": "unchecked", "music-select": "unchecked", "adult-select": "unchecked",
            },
        }
        console.log(props.query)
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    componentDidMount() {

        document.addEventListener("keyup", this.handleEnter)
        window.addEventListener("resize", this.handleSize);
        let search_value = this.props.query.query
        let filtering_type = this.props.query.filtering_type
        if (search_value && search_value.length > 0) {
            API.get(`search?query=${search_value}&filtering_type=${filtering_type}`)
                .then((result) => {
                    this.setState({
                        all_videos: result.data.data,
                        searchValue: search_value,
                    })
                })
                .catch()
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleEnter)
        window.addEventListener("resize", this.handleSize);
    }


    render() {
        let {
            windowWidth,
            isBoxChecked,
            searchSuggestions,
            isSuggestionLoaded,
            searchValue,
            all_videos
        } = this.state
        return (
            <div className="main-container-loaded">
                <div className="search-container-loaded">
                    <div className="screen-logo-loaded">
                        <div className="logo-container">
                            <LogoSVG viewBox={windowWidth > 700 ? "-20 -20 100 70" : "0 0 50.51502 42.928498"}
                                     className="logo-text hide"/>
                        </div>
                    </div>
                    <div className="search-query-parent-loaded">
                        <div className="search-box-container" style={
                            isSuggestionLoaded ?
                                {
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    borderBottom: 0,
                                } : null}>
                            <div className="magnify">
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
                                <div className="arrow">
                                    <style
                                        data-iml="1604581045076">.hsuHs{"margin:auto"}.wFncld{"margin - top:3px;color:#9aa0a6;height:20px;width:20px"}</style>
                                    <div className="hsuHs-arrow">
                <span className="wFncld z1asCe MZy1Rb">
                <RightArrow/>
                    <div className="lds-hourglass"/>
                </span>
                                    </div>
                                </div>
                            </div>
                            {isSuggestionLoaded &&
                            <div className="suggestion-parent-loaded">
                                {searchSuggestions.map(
                                    suggestion =>
                                        <div key={suggestion} className="suggestion-option"
                                             onClick={(_) => this.setState({searchValue: suggestion})}>
                                            <div className="suggestion-magnify">
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
                        <div className="category-container" id="loaded">
                            <div className={"ct-youtube-" + isBoxChecked['youtube-select']}
                                 onClick={this.toggleCheckbox}
                                 id="youtube-select">
                                <div className={"icon-checkbox-" + isBoxChecked['youtube-select']}
                                     id="youtube-select"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-youtube"/>
                                <div className="label">Youtube</div>
                            </div>
                            <div className={"ct-movie-" + isBoxChecked['movie-select']}
                                 onClick={this.toggleCheckbox}
                                 id="movie-select">
                                <div className={"icon-checkbox-" + isBoxChecked['movie-select']} id="movie-select"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-movie"/>
                                <div className="label">Movies & TV Series</div>
                            </div>
                            <div className={"ct-educational-" + isBoxChecked['educational-select']}
                                 onClick={this.toggleCheckbox} id="educational-select">
                                <div className={"icon-checkbox-" + isBoxChecked['educational-select']}
                                     id="educational-select"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-education"/>
                                <div className="label">Educational</div>
                            </div>
                            <div className={"ct-music-" + isBoxChecked['music-select']}
                                 onClick={this.toggleCheckbox}
                                 id="music-select">
                                <div className={"icon-checkbox-" + isBoxChecked['music-select']} id="music-select"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-music"/>
                                <div className="label">Music</div>
                            </div>
                            <div className={"ct-adult-" + isBoxChecked['adult-select']}
                                 onClick={this.toggleCheckbox}
                                 id="adult-select">
                                <div className={"icon-checkbox-" + isBoxChecked['adult-select']} id="adult-select"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-adult"/>
                                <div className="label">Adult Content</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="list-videos"><ListVideos all_videos={all_videos}/></div>
            </div>
        );
    }

    toggleCheckbox(e) {
        let checkbox_classes = this.state.isBoxChecked

        checkbox_classes[e.target.id] = checkbox_classes[e.target.id] === "unchecked" ? 'checked' : 'unchecked'

        this.setState({isBoxChecked: checkbox_classes});
    }

    handleEnter = (e) => e.key === "Enter" && this.handleSearch()

    handleSize = (_) => {

        this.setState({windowWidth: window.innerWidth})
    }
    handleSuggestion = (e) => {
        this.setState({searchValue: e.target.value})
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
        history.push(`search?query=${this.state.searchValue}&filtering_type=movie`)
        window.location.reload()
    }
}

export default Results