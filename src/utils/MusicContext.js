import React from "react";

const MyContext = React.createContext({
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
});
export default MyContext
