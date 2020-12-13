import React from "react"
import ReactPlayer from "react-player";

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
        let playing_text = playing ? "Playing..." : "Pause"
        return (
            <>
                <div style={{top: 0}}>
                    <ReactPlayer height={0} width={0}
                                 ref={this.ref}
                                 onProgress={(state) => this.setState(state)}

                                 url="https://free.mp3-download.best/-mqyCvH:BstBN" playing={playing}/>
                    <div onClick={this.togglePlaying}>
                        {playing_text}
                    </div>
                    LOADED
                    <progress max={1} value={loaded}/>
                    PLAYED ({parseInt(playedSeconds)})
                    <progress max={1} value={played}/>
                    SEEK
                    <input
                        type='range' min={0} max={0.999999} step='any'
                        value={played}
                        onMouseDown={this.handleSeekMouseDown}
                        onChange={this.handleSeekChange}
                        onMouseUp={this.handleSeekMouseUp}
                    />
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