import React from "react"
import DropSVG from "../assets/icons/dropSVG";
import Mp3 from "../assets/icons/mp3SVG";
import Mp4 from "../assets/icons/mp4SVG";
import API from "../utils/API";

class SingleAdult extends React.Component {

    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.all_qualities = [
            {
                title: '480P',
                all_movies: [
                    {
                        'title': 'The Shawshank Redemption Ganool Encode',
                        'main_language': 'English',
                        'link': 'https://kosshertv.com'
                    },
                    {
                        'title': 'The Shawshank Redemption MKVCage',
                        'main_language': 'Farsi',
                        'link': 'https://kosshertv.mamadeshan.com'
                    },
                    {
                        'title': 'The Shawshank Redemption PLAXA',
                        'main_language': 'Pashto',
                        'link': 'https://kosshertv.com'
                    },
                    {'title': 'The Shawshank Redemption BOB', 'main_language': 'Ordu', 'link': 'https://kosshertv.com'},
                ]
            }, {
                title: '720P',
                all_movies: [
                    {'title': 'The Shawshank Redemption', 'main_language': 'English', 'link': 'https://kosshertv.com'},
                    {'title': 'The Raw', 'main_language': 'Farsi', 'link': 'https://kosshertv.mamadeshan.com'},
                    {'title': 'The Black Hawk Down', 'main_language': 'Pashto', 'link': 'https://kosshertv.com'},
                    {
                        'title': 'Everything Happen For a Reason',
                        'main_language': 'Ordu',
                        'link': 'https://kosshertv.com'
                    },
                ]
            },
        ];
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
            published_time_text,
            video_duration,
            view_count_text,
            owner_text,
            video_id,
            url,
            image,
            title,
            description,
            downloadable_links,

        } = single_video
        // let {allVideoLinks, allAudioLinks} = this.props
        const allVideoLinks = [{
            url: "https://r1---sn-u0g3jxaa-5qce.googlevideo.com/videoplayback?expire=1604706821&ei=pY2lX7CuKtDt-gb-0Z7oAw&ip=178.244.186.3&id=o-AMg84a_rqAOm35mHJzKVuzdelzW_QeA-BQG1NYKwTCrh&itag=250&source=youtube&requiressl=yes&mh=ec&mm=31%2C29&mn=sn-u0g3jxaa-5qce%2Csn-nv47ln7l&ms=au%2Crdu&mv=m&mvi=1&pl=18&initcwndbps=555000&vprv=1&mime=audio%2Fwebm&gir=yes&clen=39240496&dur=4354.721&lmt=1552375482318511&mt=1604685163&fvip=6&keepalive=yes&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMVYysITjcYxigAEOXyUo4tZ2XToq6yMvsiXE7m3YE34AiEAxyCPK7TmVRp9e5Y9nnJWSRFU5mBErjjS5PKhlt5_Y5s%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgF4Zkfos6x3ZepoY_ETv8hhUYFebHxnmmP-0Jr7f1OpkCIDDQT_q-e4oQe_T156Fp_Vq20QduzMBa5bOFmbUsqcIi&ratebypass=yes"
            , extension: "480 (mp4)"
        }, {
            url: "https://r1---sn-u0g3jxaa-5qce.googlevideo.com/videoplayback?expire=1604706821&ei=pY2lX7CuKtDt-gb-0Z7oAw&ip=178.244.186.3&id=o-AMg84a_rqAOm35mHJzKVuzdelzW_QeA-BQG1NYKwTCrh&itag=250&source=youtube&requiressl=yes&mh=ec&mm=31%2C29&mn=sn-u0g3jxaa-5qce%2Csn-nv47ln7l&ms=au%2Crdu&mv=m&mvi=1&pl=18&initcwndbps=555000&vprv=1&mime=audio%2Fwebm&gir=yes&clen=39240496&dur=4354.721&lmt=1552375482318511&mt=1604685163&fvip=6&keepalive=yes&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMVYysITjcYxigAEOXyUo4tZ2XToq6yMvsiXE7m3YE34AiEAxyCPK7TmVRp9e5Y9nnJWSRFU5mBErjjS5PKhlt5_Y5s%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgF4Zkfos6x3ZepoY_ETv8hhUYFebHxnmmP-0Jr7f1OpkCIDDQT_q-e4oQe_T156Fp_Vq20QduzMBa5bOFmbUsqcIi&ratebypass=yes"
            , extension: "360"
        }, {
            url: "https://r1---sn-u0g3jxaa-5qce.googlevideo.com/videoplayback?expire=1604706821&ei=pY2lX7CuKtDt-gb-0Z7oAw&ip=178.244.186.3&id=o-AMg84a_rqAOm35mHJzKVuzdelzW_QeA-BQG1NYKwTCrh&itag=250&source=youtube&requiressl=yes&mh=ec&mm=31%2C29&mn=sn-u0g3jxaa-5qce%2Csn-nv47ln7l&ms=au%2Crdu&mv=m&mvi=1&pl=18&initcwndbps=555000&vprv=1&mime=audio%2Fwebm&gir=yes&clen=39240496&dur=4354.721&lmt=1552375482318511&mt=1604685163&fvip=6&keepalive=yes&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMVYysITjcYxigAEOXyUo4tZ2XToq6yMvsiXE7m3YE34AiEAxyCPK7TmVRp9e5Y9nnJWSRFU5mBErjjS5PKhlt5_Y5s%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgF4Zkfos6x3ZepoY_ETv8hhUYFebHxnmmP-0Jr7f1OpkCIDDQT_q-e4oQe_T156Fp_Vq20QduzMBa5bOFmbUsqcIi&ratebypass=yes"
            , extension: "240"
        }]
        const allAudioLinks = [{
            url: "https://r1---sn-u0g3jxaa-5qce.googlevideo.com/videoplayback?expire=1604706821&ei=pY2lX7CuKtDt-gb-0Z7oAw&ip=178.244.186.3&id=o-AMg84a_rqAOm35mHJzKVuzdelzW_QeA-BQG1NYKwTCrh&itag=250&source=youtube&requiressl=yes&mh=ec&mm=31%2C29&mn=sn-u0g3jxaa-5qce%2Csn-nv47ln7l&ms=au%2Crdu&mv=m&mvi=1&pl=18&initcwndbps=555000&vprv=1&mime=audio%2Fwebm&gir=yes&clen=39240496&dur=4354.721&lmt=1552375482318511&mt=1604685163&fvip=6&keepalive=yes&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMVYysITjcYxigAEOXyUo4tZ2XToq6yMvsiXE7m3YE34AiEAxyCPK7TmVRp9e5Y9nnJWSRFU5mBErjjS5PKhlt5_Y5s%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgF4Zkfos6x3ZepoY_ETv8hhUYFebHxnmmP-0Jr7f1OpkCIDDQT_q-e4oQe_T156Fp_Vq20QduzMBa5bOFmbUsqcIi&ratebypass=yes"
            , extension: "240"
        }, {
            url: "https://r1---sn-u0g3jxaa-5qce.googlevideo.com/videoplayback?expire=1604706821&ei=pY2lX7CuKtDt-gb-0Z7oAw&ip=178.244.186.3&id=o-AMg84a_rqAOm35mHJzKVuzdelzW_QeA-BQG1NYKwTCrh&itag=250&source=youtube&requiressl=yes&mh=ec&mm=31%2C29&mn=sn-u0g3jxaa-5qce%2Csn-nv47ln7l&ms=au%2Crdu&mv=m&mvi=1&pl=18&initcwndbps=555000&vprv=1&mime=audio%2Fwebm&gir=yes&clen=39240496&dur=4354.721&lmt=1552375482318511&mt=1604685163&fvip=6&keepalive=yes&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMVYysITjcYxigAEOXyUo4tZ2XToq6yMvsiXE7m3YE34AiEAxyCPK7TmVRp9e5Y9nnJWSRFU5mBErjjS5PKhlt5_Y5s%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgF4Zkfos6x3ZepoY_ETv8hhUYFebHxnmmP-0Jr7f1OpkCIDDQT_q-e4oQe_T156Fp_Vq20QduzMBa5bOFmbUsqcIi&ratebypass=yes"
            , extension: "240"
        }]

        return (
            <div className="sv-parent">
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
                                                this.all_qualities.map((quality, index) => (
                                                        <div className={this.state.qualitiesClassName[index]}
                                                             onClick={(_) => this.toggleTab(index)}>
                                                            <div className="sv-modal-quality-label">
                                                                <span>{quality.title}</span></div>
                                                            <div className="sv-modal-quality-content">
                                                                {quality.all_movies.map(movie =>
                                                                    <div className="sv-modal-single-download-link">
                                                                        <div className="url-link"
                                                                             onClick={() => window.open(movie.link, '_blank')}>
                                                                            {movie.title}
                                                                        </div>
                                                                    </div>
                                                                )}
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
                        {video_duration}
                    </div>
                </div>
                <div className="sv-detail">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="sv-title">{title}</a>
                    <div className="sv-metadata-line">
                        <div className="sv-views">{view_count_text}</div>
                        <div className="sv-published-date">{published_time_text}</div>
                    </div>
                    <div className="sv-owner">{owner_text}</div>
                    <div className="sv-description">{description}</div>
                </div>
                <div className="sv-download-link">
                    <div className="sv-download-video" onClick={this.toggleDownloadVideoOpen}>
                        <div className="sv-quick-download">
                            <Mp3 className="sv-quick-download-icon"/>
                            <span className="sv-quick-download-icon-text">
                            MP3</span>
                        </div>
                        <div className="sv-quick-download">
                            <Mp4 className="sv-quick-download-icon"/>
                            <span className="sv-quick-download-icon-text">
                            360p</span>
                        </div>
                        <div className="sv-quick-download">
                            <Mp4 className="sv-quick-download-icon"/>
                            <span className="sv-quick-download-icon-text">
                            480p</span>
                        </div>
                    </div>
                    {
                        <div id="sv-download-video-options" className={this.state.downloadVideoOptions}>
                            {allVideoLinks.map(videoLink =>
                                <div className="sv-download-video-option">
                                    <a href={videoLink['url']}>{videoLink['extension']}</a>
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
                            {allAudioLinks.map(audioLink =>
                                <div className="sv-download-audio-option">
                                    <a href={audioLink['url']}>{audioLink['extension']}</a>
                                </div>
                            )}
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

export default SingleAdult