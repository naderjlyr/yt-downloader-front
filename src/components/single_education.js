import React from "react"
import DropSVG from "../assets/icons/dropSVG";
import Mp3 from "../assets/icons/mp3SVG";
import Mp4 from "../assets/icons/mp4SVG";
import API from "../utils/API";

class SingleEducation extends React.Component {

    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.all_qualities = this.props.single_video['download_links']
        this.qualitiesClassName_ = this.all_qualities.map(_ => 'sv-modal-quality')
        this.state = {
            downloadVideoOpen: false,
            downloadAudioOpen: false,
            isDownloadLinkOpen: false,
            qualitiesClassName: this.qualitiesClassName_
        }
        this.toggleDownloadVideoOpen = this.toggleDownloadVideoOpen.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.toggleDownloadAudioOpen = this.toggleDownloadAudioOpen.bind(this)
        this.toggleDownloadLinks = this.toggleDownloadLinks.bind(this)
        this.toggleTab = this.toggleTab.bind(this)
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
            farsi_name,
            description,
            categories,
            image,
            download_links,
            url,

        } = single_video
        // let {allVideoLinks, allAudioLinks} = this.props
        const downloads = []
        download_links.map(download_link => {
            downloads.push({link: download_link['link'][0], title: download_link['title']})
        })
        return (
            <div className="sv-parent" key={Math.random()}>
                {isDownloadLinkOpen &&
                <div className="sv-modal-overlay">
                    <div className="sv-modal-container" ref={node => this.node = node}>
                        <div className="sv-modal-head">
                            <h3>The Shawshank Redemption 1994</h3>
                            <div className="sv-modal-close-button" onClick={this.toggleDownloadLinks}>X</div>
                        </div>
                        <div className="sv-modal-item">
                            <div className="sv-modal-item-body">
                                <div className="sv-modal-box">
                                    <div className="sv-modal-content">
                                        <div className="sv-modal-qualities">
                                            {
                                                downloads.map(quality => (
                                                        // <div key={Math.random()}
                                                        //      className={this.state.qualitiesClassName[index]}
                                                        //      onClick={(_) => this.toggleTab(index)}>
                                                        //     <div className="sv-modal-quality-label">
                                                        //         <span>{quality}</span>
                                                        //     </div>
                                                        //     <div className="sv-modal-quality-content">
                                                        //         {downloads[quality].map(movie =>
                                                        //             <div key={Math.random()}
                                                        //                  className="sv-modal-single-download-link">
                                                        //                 <div className="url-link"
                                                        //                      onClick={() => window.open(movie.link, '_blank')}>
                                                        //                     {movie.title}
                                                        //                 </div>
                                                        //             </div>
                                                        //         )}
                                                        //     </div>
                                                        // </div>
                                                        <div key={Math.random()}
                                                             className="sv-modal-single-download-link">
                                                            {
                                                                console.log(quality)
                                                            }
                                                            <div className="url-link"
                                                                 onClick={() => window.open(quality['link'], '_blank')}>
                                                                {quality['title']}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }

                                        </div>
                                    </div>
                                    <div className="sv-modal-box-footer">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                <div className="sv-thumbnail">
                    {/*<VideoSVG/>*/}
                    <img alt="YTS DOWNLOADER" src={image} className="sv-thumbnail-image"/>
                    <div className="sv-video-duration">
                        {"duration"}
                    </div>
                </div>
                <div className="sv-detail">
                    <a href={url} target="_blank" rel="noopener noreferrer"
                       className="sv-title">{name}</a>
                    <div className="sv-metadata-line">
                        {/*<div className="sv-views">{`${main_language} (${country})`}</div>*/}
                        <div className="sv-published-date">{"year"}</div>
                    </div>
                    <div className="sv-description">{description}</div>
                </div>
                <div className="sv-download-link">
                    <div className="sv-download-audio" onClick={this.toggleDownloadLinks}>
                        Download Links
                        <DropSVG className="sv-dropdown-svg"/>
                    </div>
                    {
                        <div id="sv-download-audio-options" className={this.state.downloadAudioOptions}>
                        </div>
                    }
                </div>
            </div>
        );
    }

    handleClickOutside(e) {
        if (e.target.className === "sv-modal-overlay") {
            this.toggleDownloadLinks();
        }
    }

    toggleTab(index) {
        let qualitiesClassName_ = JSON.parse(JSON.stringify(this.qualitiesClassName_))
        qualitiesClassName_[index] = this.state.qualitiesClassName[index] === 'sv-modal-quality active' ? 'sv-modal-quality' : 'sv-modal-quality active'
        this.setState({qualitiesClassName: qualitiesClassName_})
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

export default SingleEducation