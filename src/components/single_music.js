import React from "react"
import ReactPlayer from "react-player";
import sampleImage from "../assets/image/artworks-000114458540-d58dfh-t500x500.jpg"
import sampleFile from "../assets/file.mp3"
class SingleMusic extends React.Component {

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

    ref = player => {
        this.player = player
    }

    render() {
        const {playing, loaded, played, playedSeconds} = this.state
        let playing_text = playing ? "pause" : "play"
        return (
            <>
                <div className="sm-parent">
                    <div className="sm-song">
                        <div className="sm-thumbnail">
                            <img src={sampleImage} className="sm-thumbnail-image" alt="filename" onClick={this.togglePlaying}/>
                            <div className={"icon-" + playing_text} />
                        </div>
                        <div className="sm-details">
                            <div className="sm-title">
                                <div className="sm-name">Someone Like You</div>
                                <div className="sm-artist">By Adele</div>
                            </div>
                            <div className="sm-duration">03:24</div>
                            <div className="sm-download-links">
                                <div className="icon-download2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="sm-player">
                        <ReactPlayer height={0} width={0}
                                                            ref={this.ref}
                                                            onProgress={(state) => this.setState(state)}
                                                            url={sampleFile}
                                                            playing={playing} />
                        <div className="sm-player-controls">
                            <div className="icon-play3" />
                        </div>
                        <div className="sm-player-elapsed">{playedSeconds}</div>
                        <div className="sm-player-progress">
                            <div className="loaded" style={{width: `${loaded * 100}%`}}/>
                            <div className="played" style={{width: `${played * 100}%`}}/>
                            <input
                                type='range' min={0} max={0.999999} step='any'
                                value={played}
                                onMouseDown={this.handleSeekMouseDown}
                                onChange={this.handleSeekChange}
                                onMouseUp={this.handleSeekMouseUp}
                                className="seek"/>
                        </div>
                        <div className="sm-player-duration">4:55</div>
                        <div className="sm-player-volume"><div className="icon-volume-medium"></div></div>
                    </div>

                </div>

            </>
        );
    }

    handleSeekMouseDown = _ => this.setState({seeking: true})
    handleSeekChange = e => this.setState({played: parseFloat(e.target.value)})
    handleSeekMouseUp = e => {
        this.setState({seeking: false})
        this.player.seekTo(parseFloat(e.target.value))
    }

    togglePlaying(_) {
        this.setState({playing: !this.state.playing})
    }
}

export default SingleMusic