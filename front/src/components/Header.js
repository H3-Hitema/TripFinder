import React from 'react';

const Header = () => {
    return (
        <div className="container_video">
            <video width="" height="" autoPlay muted loop id="bgvid">
                <source src="https://allwebsite.ovh/video-back.mp4" type="video/webm" />
            </video>
        </div>
    )
}

export default Header