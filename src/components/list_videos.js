import React from "react"
import SingleVideo from "./single_video";


class ListVideos extends React.Component {


    render() {
        const all_videos = [{
            published_time_text: "TEST",
            video_duration: "TEST",
            view_count_text: "TEST",
            owner_text: "TEST",
            video_id: "TEST",
            url: "TEST",
            image: "https://i.ytimg.com/vi/8AZ8GqW5iak/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC-t1W0_qgljkVFmAgT66HdyumNhA",
            title: "TEST",
            description: "TEST",
            downloadable_links: "TEST",

        }, {
            published_time_text: "TEST",
            video_duration: "TEST",
            view_count_text: "TEST",
            owner_text: "TEST",
            video_id: "TEST",
            url: "TEST",
            image: "https://i.ytimg.com/vi/8AZ8GqW5iak/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC-t1W0_qgljkVFmAgT66HdyumNhA",
            title: "TEST",
            description: "TEST",
            downloadable_links: "TEST",

        }, {
            published_time_text: "TEST",
            video_duration: "TEST",
            view_count_text: "TEST",
            owner_text: "TEST",
            video_id: "TEST",
            url: "TEST",
            image: "https://i.ytimg.com/vi/8AZ8GqW5iak/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC-t1W0_qgljkVFmAgT66HdyumNhA",
            title: "TEST",
            description: "TEST",
            downloadable_links: "TEST",

        }]
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