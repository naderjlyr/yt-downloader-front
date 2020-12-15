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
            searchValue: props.query.query,
            all_videos: [],
        }
        this.isBoxChecked = {
            youtube: "unchecked",
            movie: "unchecked",
            educational: "unchecked",
            music: "unchecked",
            adult: "unchecked",
        }
        this.isBoxChecked[props.query.filtering_type] = "checked"
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    componentDidMount() {

        document.addEventListener("keyup", this.handleEnter)
        let search_value = this.props.query.query
        let filtering_type = this.props.query.filtering_type
        if (search_value && search_value.length > 0) {
            API.get(`search?query=${search_value}&filtering_type=${filtering_type}`)
                .then((result) => {
                    this.setState({
                        all_videos: result.data.data,
                    })
                })
                .catch()
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleEnter)
    }


    render() {
        let {
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
                            <LogoSVG viewBox="-20 0 100 70"
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
                    </div>
                </div>
                <div className="list-videos">
                    <div className="filtering-type-loaded">
                        <div className={"ct-youtube-" + this.isBoxChecked['youtube']}
                             onClick={this.toggleCheckbox}
                             id="youtube">
                            <div className="icon-youtube"/>
                            <div className="label">Youtube</div>
                        </div>
                        <div className={"ct-movie-" + this.isBoxChecked['movie']}
                             onClick={this.toggleCheckbox}
                             id="movie">
                            <div className="icon-movie"/>
                            <div className="label">Movies</div>
                        </div>
                        <div className={"ct-educational-" + this.isBoxChecked['educational']}
                             onClick={this.toggleCheckbox} id="educational">
                            <div className="icon-education"/>
                            <div className="label">Educational</div>
                        </div>
                        <div className={"ct-music-" + this.isBoxChecked['music']}
                             onClick={this.toggleCheckbox}
                             id="music">
                            <div className="icon-music"/>
                            <div className="label">Music</div>
                        </div>
                        <div className={"ct-adult-" + this.isBoxChecked['adult']}
                             onClick={this.toggleCheckbox}
                             id="adult">
                            <div className="icon-adult"/>
                            <div className="label">Adult</div>
                        </div>
                    </div>

                    <ListVideos all_videos={all_videos}/></div>
            </div>
        );
    }

    toggleCheckbox(e) {
        this.handleSearch(e, e.target.id)
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
    handleSearch = (_, filtering_type = this.props.query.filtering_type) => {
        history.push(`search?query=${this.state.searchValue}&filtering_type=${filtering_type}`)
        window.location.reload()
    }
}

export default Results