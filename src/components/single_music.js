import React from "react"
import ReactPlayer from "react-player";

class SingleMusic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <ReactPlayer
                url="https://free.mp3-download.best/-mqyCvH:BstBN" playing={false}/>
        );
    }
}

export default SingleMusic