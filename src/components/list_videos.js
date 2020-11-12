import React from "react"
import SingleVideo from "./single_video";


class ListVideos extends React.Component {


    render() {
        const {all_videos} = this.props
        return (
            <div>
                {all_videos.map(single_video =>
                    <SingleVideo single_video={single_video}/>
                )}
            </div>
        )
    }
}

export default ListVideos