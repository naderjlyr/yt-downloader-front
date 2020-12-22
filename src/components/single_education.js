import React from "react"
import DropSVG from "../assets/icons/dropSVG";
import Mp3 from "../assets/icons/mp3SVG";
import Mp4 from "../assets/icons/mp4SVG";
import API from "../utils/API";
import DownloadLinkModal from "./download_links";

class SingleEducation extends React.Component {

    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.all_qualities = this.props.single_video['download_links']
        this.qualitiesClassName_ = this.all_qualities.map(_ => 'sv-modal-quality')

        this.downloads = {"Download Links": []}
        props.single_video.download_links.map(download_link =>
            this.downloads['Download Links'].push(download_link)
        )
        this.state = {
            downloadVideoOpen: false,
            downloadAudioOpen: false,
            isDownloadLinkOpen: null,
            qualitiesClassName: this.qualitiesClassName_
        }
        this.toggleDownloadVideoOpen = this.toggleDownloadVideoOpen.bind(this)
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
            description,
            categories,
            image,
            download_links,
            url,

        } = single_video

        return (
            <>
                <DownloadLinkModal
                    name={name}
                    downloads={this.downloads}
                    download_links={download_links}
                    isOpen={isDownloadLinkOpen}
                    close={this.toggleDownloadLinks}/>

                <div className="sv-parent" key={Math.random()}>
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
            </>
        );
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