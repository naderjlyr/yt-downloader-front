import React from "react"
import API from "../utils/API"
import {createBrowserHistory} from "history"
import SearchSVG from "../assets/icons/searchSVG";
import RightArrow from "../assets/icons/rightArrowSVG";
import LogoSVG from "../assets/icons/logoSVG";

const history = createBrowserHistory()

class Searches extends React.Component {
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
            filtering_type: 'movie',
            isBoxChecked: {
                "youtube": "unchecked", "movie": "unchecked",
                "educational": "unchecked", "music": "unchecked", "adult": "unchecked",
            },
        }
        this.BASE_ISBOXEDCHECKED = this.state.isBoxChecked
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleEnter)
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleEnter)
    }


    render() {
        let {
            isBoxChecked,
            viewBoxLogoSVG,
            searchSuggestions,
            isSearchLoaded,
            isSearchLoading,
            isSuggestionLoaded,
            searchValue,
        } = this.state
        return (
            <div className="main-container" style={isSearchLoaded ? {
                display: "flex-inline",
                alignItems: "center",
                justifyContent: "center"
            } : null}>

                <div className="search-container">
                    <div className="screen-logo">
                        <React.Fragment>
                            <div className="logo-container">
                                <LogoSVG viewBox={viewBoxLogoSVG} className="logo-text"/>
                            </div>
                        </React.Fragment>
                    </div>
                    <div className="search-query-parent">
                        <div className="search-box-container" style={
                            isSuggestionLoaded && searchValue.length > 1 ?
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
                {isSearchLoading ? <div className="loader"/> : <RightArrow/>}
                    <div className="lds-hourglass"/>
                </span>
                                    </div>
                                </div>
                            </div>
                            {isSuggestionLoaded &&
                            <div className="suggestion-parent">
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
                        <div className="filtering-type">
                            <div className={"ct-youtube-" + isBoxChecked['youtube']}
                                 onClick={this.toggleCheckbox}
                                 id="youtube">
                                <div className={"icon-checkbox-" + isBoxChecked['youtube']}
                                     id="youtube"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-youtube"/>
                                <div className="label">Youtube</div>
                            </div>
                            <div className={"ct-movie-" + isBoxChecked['movie']}
                                 onClick={this.toggleCheckbox}
                                 id="movie">
                                <div className={"icon-checkbox-" + isBoxChecked['movie']} id="movie"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-movie"/>
                                <div className="label">Movies</div>
                            </div>
                            <div className={"ct-educational-" + isBoxChecked['educational']}
                                 onClick={this.toggleCheckbox} id="educational">
                                <div className={"icon-checkbox-" + isBoxChecked['educational']}
                                     id="educational"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-education"/>
                                <div className="label">Educational</div>
                            </div>
                            <div className={"ct-music-" + isBoxChecked['music']}
                                 onClick={this.toggleCheckbox}
                                 id="music">
                                <div className={"icon-checkbox-" + isBoxChecked['music']} id="music"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-music"/>
                                <div className="label">Music</div>
                            </div>
                            <div className={"ct-adult-" + isBoxChecked['adult']}
                                 onClick={this.toggleCheckbox}
                                 id="adult">
                                <div className={"icon-checkbox-" + isBoxChecked['adult']} id="adult"
                                     onClick={this.toggleCheckbox}/>
                                <div className="icon-adult"/>
                                <div className="label">Adult Content</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    toggleCheckbox(e) {
        let checkbox_classes = this.state.isBoxChecked
        let base_box = {...this.BASE_ISBOXEDCHECKED}
        base_box[e.target.id] = checkbox_classes[e.target.id] === "unchecked" ? 'checked' : 'unchecked'
        this.setState({isBoxChecked: base_box, filtering_type: e.target.id});
    }

    handleEnter = (e) => e.key === "Enter" && this.handleSearch()

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
        history.push(`search?query=${this.state.searchValue}&filtering_type=${this.state.filtering_type}`)
        window.location.reload()
    }
}

export default Searches