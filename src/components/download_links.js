import React from "react"

class DownloadLinkModal extends React.Component {

    constructor(props) {
        super(props);
        this.all_qualities = this.props.download_links
        this.qualitiesClassName_ = this.all_qualities.map(_ => 'sv-modal-quality')
        this.state = {qualitiesClassName: this.qualitiesClassName_}
        this.toggleTab = this.toggleTab.bind(this)

    }

    render() {
        const {name, downloads, isOpen, close} = this.props
        return (
            <div className={`sv-modal-overlay ${isOpen && "open"}`} id="sv-modal-overlay"
                 onClick={(e) => {
                     e.target.id === "sv-modal-overlay" && close()
                 }}>
                <div className={`sv-modal-container ${isOpen && "open"}`}>
                    <div className="sv-modal-head">
                        <h3>{name}</h3>
                        <div className="sv-modal-close-button" onClick={close}>X</div>
                    </div>
                    <div className="sv-modal-item">
                        <div className="sv-modal-item-body">
                            <div className="sv-modal-box">
                                <div className="sv-modal-content">
                                    <div className="sv-modal-qualities">
                                        {
                                            Object.keys(downloads).map((quality, index) => (
                                                    <div key={Math.random()}
                                                         className={this.state.qualitiesClassName[index]}
                                                         onClick={(_) => this.toggleTab(index)}>
                                                        <div className="sv-modal-quality-label">
                                                            <span>{quality}</span></div>
                                                        <div className="sv-modal-quality-content">
                                                            {downloads[quality].map(movie =>
                                                                <div key={Math.random()}
                                                                     className="sv-modal-single-download-link">
                                                                    <div className="url-link"
                                                                         onClick={() => window.open(movie.link, '_blank')}>
                                                                        {movie.title}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        }

                                    </div>
                                </div>
                                <div className="sv-modal-box-footer">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    toggleTab(index) {
        let qualitiesClassName_ = JSON.parse(JSON.stringify(this.qualitiesClassName_))
        qualitiesClassName_[index] = this.state.qualitiesClassName[index] === 'sv-modal-quality active' ? 'sv-modal-quality' : 'sv-modal-quality active'
        this.setState({qualitiesClassName: qualitiesClassName_})
    }

}

export default DownloadLinkModal