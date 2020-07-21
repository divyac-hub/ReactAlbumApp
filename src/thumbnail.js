import React from 'react';
import "./album.css";

const Thumbnail = (props) => {

    return (
        <div>
            <button className="GoBackBtn" onClick={() => props.goBackClick(props.thumbnailData)}>Go Back</button>

            <div className="thumbnail">

                <p className="clickmetext">Click Me!!!</p>

                {props.thumbnailImg ?
                    <img src={props.thumbnailData.imgSecond} alt={props.thumbnailData.imgAlt} />
                    : null}

                {!props.thumbnailImg ? <img onClick={() => props.imgClick(props.thumbnailData)}
                    src={props.thumbnailData.imgSrc} alt={props.thumbnailData.imgAlt} /> : null}



            </div>
        </div>
    );
}

export default Thumbnail;

