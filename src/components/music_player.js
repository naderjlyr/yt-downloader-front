import React from "react"
import ReactPlayer from "react-player/lazy";
import MusicContext from "../utils/MusicContext";
import {fancyTimeFormat} from "../utils/data";

class MusicPlayer extends React.Component {
    static contextType = MusicContext

    ref = player => {
        this.player = player
    }

    render() {
        let {music, playing, music_details, index} = this.context
        const {download_link, duration} = music
        const {playedSeconds, loaded, played, loadedSeconds} = music_details
        if (music_details.played === 1) {

        }

        return (
            <>
                {download_link && <div className="sm-player">

                    <ReactPlayer height={0} width={0}
                                 config={{
                                     file: {
                                         attributes: {
                                             onContextMenu: e => e.preventDefault(),
                                             controlsList: 'nodownload'
                                             , preload: 'none'
                                         }
                                     }
                                 }}
                                 controls
                                 ref={this.ref}
                                 onProgress={this.handleProgress}
                                 url={download_link}
                                 playing={playing}/>
                    <div className="sm-player-controls" onClick={(_)=>this.context.updatePlaying(this.props.index, !this.context.playing)}>
                        <div className={playing ? "icon-pause2" : "icon-play3"}/>
                    </div>
                    <div className="sm-player-elapsed">{fancyTimeFormat(playedSeconds)}</div>
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
                    <div className="sm-player-duration">{fancyTimeFormat(duration)}</div>
                    {/*<div className="sm-player-volume">*/}
                    {/*    <div className="icon-volume-medium"/>*/}
                    {/*</div>*/}
                </div>}
            </>
        );
    }

    handleSeekMouseDown = _ => this.setState({seeking: true})
    handleSeekChange = e => {
        this.context.updateMusicDetails({played: parseFloat(e.target.value)})
    }
    handleSeekMouseUp = e => {
        this.setState({seeking: false})
        this.player.seekTo(parseFloat(e.target.value))
    }


    handleProgress = (state) => {
        this.context.updateMusicDetails(state)
        let index = this.context.index
        if (state.played === 1 && this.props.musics.length > index + 1) {
            this.context.updateMusic(this.props.musics[index + 1])
            this.context.updatePlaying(index + 1, true)
            this.context.updateMusicDetails({
                playedSeconds: 0,
                loaded: 0,
                played: 0,
                loadedSeconds: 0

            })
        }
    }
}

export default MusicPlayer