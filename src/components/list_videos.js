import React from "react"
import SingleAdult from "./single_adult";
import SingleEducation from "./single_education";
import SingleYoutube from "./single_youtube";
import SingleMovie from "./single_movie";


class ListVideos extends React.Component {


    render() {
        const {all_videos} = this.props
        return (
            <div>
                {all_videos.map(single_video => {
                    switch (single_video['type']) {
                        case 'movie':
                            return <SingleMovie single_video={single_video}/>
                        case 'adult':
                            return <SingleAdult single_video={single_video}/>
                        case 'educational':
                            return <SingleEducation single_video={single_video}/>
                        case 'youtube':
                            return <SingleYoutube single_video={single_video}/>
                    }
                })}
            </div>
        )
    }
}

export default ListVideos