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
            playing: false
        }
        this.togglePlaying = this.togglePlaying.bind(this)
    }

    ref = player => {
        this.player = player
    }

    render() {
        const {playing, loaded, played, playedSeconds} = this.state
        let playing_text = playing ? "pause" : "playing"
        return (
            <>
                <div className="sm-parent">
                    <div className="sm-thumbnail">
                        <img src={sampleImage} className="sm-thumbnail-image" alt="filename"/>
                    </div>
                    <div className="sm-player">
                        <div className="sm-details">
                            <div className="sm-title">Adele - Someone Like You</div>
                        </div>
                        <ReactPlayer height={0} width={0}
                                     ref={this.ref}
                                     onProgress={(state) => this.setState(state)}
                                     url={sampleFile}
                                     playing={playing} />
                        {/*{playing_text}*/}
                        <div className={"icon-" + playing_text} onClick={this.togglePlaying} />
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