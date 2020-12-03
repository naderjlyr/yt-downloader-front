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
                            // return <SingleMovie key={Math.random()} single_video={items['data'][5]}/>
                            return items['data'].map(item => <SingleMovie key={Math.random()} single_video={item}/>)
                        case 'adult':
                            return items['data'].map(item => <SingleAdult single_video={item} key={Math.random()}/>)
                        case 'educational':
                            return items['data'].map(item => <SingleEducation single_video={item} key={Math.random()}/>)
                        case 'youtube':
                            return <SingleYoutube single_video={items}/>
                    }
                })}
            </div>
        )
    }
}

export default ListVideos