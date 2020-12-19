import React from "react"
import SingleEducation from "./single_education";
import SingleMusic from "./single_music";
import ReactPlayer from "react-player/lazy";
import sampleFile from "../assets/file.mp3"
import MusicProvider from "../utils/MusicProvider";
import MusicPlayer from "./music_player";
import MusicContext from "../utils/MusicContext";


class ListMusic extends React.Component {

    constructor(props) {
        super(props);
        this.musics = this.props.musics
        this.BASE_PLAYING = []
        this.props.musics.map(_ =>
            this.BASE_PLAYING.push(false)
        )

        this.state = {
            playing: this.BASE_PLAYING,
            music: null
        }
    }

    select_music = music => {
        // console.log("eeeee", music)
    }

    handlePlaying(e, index) {
        this.setState({music: this.musics[index]})
    }


    render() {
        return (
            <MusicProvider>
                {this.musics.map((item, index) =>
                    <SingleMusic
                        single_music={item}
                        key={Math.random()}
                        index={index}
                    />
                )}
                <MusicPlayer musics={this.musics}/>
            </MusicProvider>
        )
    }

}

export default ListMusic