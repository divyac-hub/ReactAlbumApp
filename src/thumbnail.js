import React from 'react';
import "./album.css";
import Spinner from './spinner';

const Thumbnail = (props) => {

    return (
        <div>
            <button className="GoBackBtn" onClick={() => props.goBackClick(props.fetchedpic)}>Go Back</button>

            <div className="thumbnail">

                <p className="clickmetext">Click Me!!!</p>

                {props.thumbnailImg ? props.thumbnailData.map((a) => {
                    return (<div onClick={() => { props.getImageClose(a.ptitle, a.photoS) }} className='content'><div><img src={a.imgS} alt="Data" /></div></div>)
                }) : null}

                <div className='flexContainer'>
                    {!props.piFlag ? props.fetchedpic.map((a) => {
                        return (<div key={a.id} onClick={() => { props.getImage(a.ptitle, a.photoS) }} className="tooltip"><img src={a.photourl} alt={a.ptitle} />
                            <p>
                                <span className="tooltiptext">{a.ptitle}</span>
                            </p></div>)
                    }) : <Spinner />}
                </div>




            </div>
        </div>
    );
}

export default Thumbnail;

