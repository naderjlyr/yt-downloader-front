import React from "react";
import MusicContext from "./MusicContext";

class MusicProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            musics: [],
            playing: false,
            index: null,
            music: {
                download_link: null,
            },
            music_details: {
                playedSeconds: 0,
                loaded: 0,
                played: 0,
                loadedSeconds: 0

            }
        }
    }

    updateMusicDetails = (music_details) => {
        this.setState({music_details: music_details})
    }

    updatePlaying = (index, value) => {
        this.setState({index: index, playing: value})
    }
    updateMusics = (musics) => {
        this.setState({musics: musics})
    }
    updateMusic = (music) => {
        this.setState({music: music})
    }

    render() {
        return (
            <MusicContext.Provider value={{
                playing: this.state.playing,
                updatePlaying: this.updatePlaying,
                music: this.state.music,
                index: this.state.index,
                updateMusic: this.updateMusic,
                music_details: this.state.music_details,
                updateMusicDetails: this.updateMusicDetails,
                updateMusics: this.updateMusics,
            }}>
                {this.props.children}
            </MusicContext.Provider>
        );
    }
}

export default MusicProvider