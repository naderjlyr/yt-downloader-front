import React from "react"
import DropSVG from "../assets/icons/dropSVG";
import Mp3 from "../assets/icons/mp3SVG";
import Mp4 from "../assets/icons/mp4SVG";
import API from "../utils/API";
import DownloadLinkModal from "./download_links";

class SingleMovie extends React.Component {

    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.state = {
            downloadVideoOpen: false,
            downloadAudioOpen: false,
            isDownloadLinkOpen: false,
        }
        this.toggleDownloadVideoOpen = this.toggleDownloadVideoOpen.bind(this)
        this.toggleDownloadAudioOpen = this.toggleDownloadAudioOpen.bind(this)
        this.toggleDownloadLinks = this.toggleDownloadLinks.bind(this)
        this.url = this.props.single_video.url
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {
        let {isDownloadLinkOpen} = this.state

        const {single_video} = this.props
        const {
            name,
            description,
            movie_id,
            genres,
            image,
            download_links,
            movie_type,
            country,
            year,
            main_language,
            subtitles,
            duration,
            imdb_rate,

        } = single_video
        // let {allVideoLinks, allAudioLinks} = this.props
        const downloads = {}
        const quick_accesses = []
        download_links.map(download_link => {
            if (!(download_link['quality'] in downloads)) {
                downloads[download_link['quality']] = [download_link]
                if (['1080p', '720p', '480p'].includes(download_link['quality'])) {
                    quick_accesses.push({quality: download_link['quality'], link: download_link['link'][0]})
                }
            } else {
                downloads[download_link['quality']].push(download_link)
            }
        })
        return (
            <>
                <DownloadLinkModal
                    name={name}
                    downloads={downloads}
                    download_links={download_links}
                    isOpen={isDownloadLinkOpen}
                    close={this.toggleDownloadLinks}/>

                <div className="sv-parent" key={Math.random()}>
                    <div className="sv-thumbnail">
                        {/*<VideoSVG/>*/}
                        <img alt="YTS DOWNLOADER" src={image} className="sv-thumbnail-image"/>
                        <div className="sv-video-duration">
                            {duration}
                        </div>
                    </div>
                    <div className="sv-detail">
                        <a href={`https://www.imdb.com/title/tt${movie_id}`} target="_blank" rel="noopener noreferrer"
                           className="sv-title">{name}</a>
                        <div className="sv-metadata-line">
                            <div className="sv-views">{`${main_language} (${country})`}</div>
                            <div className="sv-published-date">{year}</div>
                        </div>
                        <div className="sv-metadata-line">
                            <span className="imdb-rate-star">&#9733;</span>
                            <div className="sv-views">{imdb_rate}</div>
                            <div className="sv-owner">{genres.join(', ')}</div>
                        </div>
                        <div className="sv-description">{description}</div>
                    </div>
                    <div className="sv-download-link">
                        <div className="sv-download-video" onClick={this.toggleDownloadVideoOpen}>
                            {quick_accesses.map(quick_access =>
                                <div className="sv-quick-download" onClick={(_) => window.open(quick_access['link'])}>
                                    <Mp4 className="sv-quick-download-icon"/>
                                    <span className="sv-quick-download-icon-text">
                            {quick_access['quality']}</span>
                                </div>)}
                        </div>
                        {
                            <div id="sv-download-video-options" className={this.state.downloadVideoOptions}>
                                {Object.keys(downloads).map(videoLink =>
                                    <div>{videoLink}
                                        {downloads[videoLink].map(video_link =>
                                            <div key={Math.random()} className="sv-download-video-option">
                                                <a href={video_link['link'][0]}>{video_link['title']}</a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        }
                        <div className="sv-download-audio" onClick={this.toggleDownloadLinks}>
                            Other Formats
                            <DropSVG className="sv-dropdown-svg"/>
                        </div>
                        {
                            <div id="sv-download-audio-options" className={this.state.downloadAudioOptions}>
                                {/*{downloads.map(audioLink =>*/}
                                {/*    <div key={Math.random()} className="sv-download-audio-option">*/}
                                {/*        <a href={audioLink['url']}>{audioLink['extension']}</a>*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                        }
                    </div>
                </div>
            </>
        );
    }


    toggleDownloadLinks() {
        let downloadLink = this.state.isDownloadLinkOpen
        this.setState({isDownloadLinkOpen: !downloadLink})
    }

    toggleDownloadVideoOpen() {
        if (this.state.downloadVideoOptions === '') {
            this.setState({
                downloadVideoOptions: 'sv-download-video-options'
            })
        } else {
            this.setState({
                downloadVideoOptions: '',
            })
        }
    }

    toggleDownloadAudioOpen() {

        if (this.state.downloadAudioOptions === '') {
            let search_data = JSON.stringify({video_link: this.url})
            API.post("download_links", search_data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res.data.data)

                    this.setState({
                        urls: res.data.data,
                        downloadAudioOptions: 'sv-download-audio-options'
                    })
                })

        } else {
            this.setState({
                downloadAudioOptions: '',
            })
        }
    }
}

export default SingleMovie