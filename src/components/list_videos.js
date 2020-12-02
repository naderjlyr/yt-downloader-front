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
                {all_videos.map(items => {
                    switch (items['type']) {
                        case 'movie':
                            return items['data'].map(item => <SingleMovie key={Math.random()} single_video={item}/>)
                        case 'adult':
                            return <SingleAdult single_video={items}/>
                        case 'educational':
                            return <SingleEducation single_video={items}/>
                        case 'youtube':
                            return <SingleYoutube single_video={items}/>
                    }
                })}
            </div>
        )
    }
}

export default ListVideos