import React from "react"
import ReactPlayer from "react-player/lazy";
import sampleImage from "../assets/image/artworks-000114458540-d58dfh-t500x500.jpg"
import sampleFile from "../assets/file.mp3"
import MusicContext from "../utils/MusicContext";

class SingleMusic extends React.Component {
    static contextType = MusicContext

    constructor(props) {
        super(props);
        this.state = {
            loaded: 0,
            playedSeconds: 0,
            played: 0,
            playing: false,
        }
        this.togglePlaying = this.togglePlaying.bind(this)
    }

    //
    // ref = player => {
    //     this.player = player
    // }

    render() {
        const {single_music, index} = this.props
        let playing = false
        if (index === this.context.index) {

            playing = this.context.playing
        }
        const {name, artist, image, duration} = single_music
        return (
            <div>
                <div className="sm-parent">
                    <div className="sm-song">
                        <div className="sm-thumbnail">
                            <img src={image !== null ? image : sampleImage} className="sm-thumbnail-image"
                                 alt="filename"
                                 onClick={this.togglePlaying}/>
                            <div className={playing ? "icon-pause" : "icon-play"}/>
                        </div>
                        <div className="sm-details">
                            <div className="sm-title">
                                <div className="sm-name">{name}</div>
                                <div className="sm-artist">By {artist}</div>
                            </div>
                            <div className="sm-duration">{duration}</div>
                            <div className="sm-download-links">
                                <div className="icon-download2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    togglePlaying(_) {
        if (this.props.index !== this.context.index) {
            this.context.updateMusic(this.props.single_music)
            this.context.updatePlaying(this.props.index, true)
        } else this.context.updatePlaying(this.props.index, !this.context.playing)
    }
}

export default SingleMusic