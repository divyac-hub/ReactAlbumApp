import React from 'react';
import './album.css';

const ListView = (props) => {


    return (
        <div key={props.ph.id} onClick={() => props.ablumClick(props.ph)}>
            <div className="albumList">
                <div className="tooltip">
                    <p><span className='ablumtitle'>Album Title:  </span>
                        <span className='ablumText'>{props.ph.albumText}</span></p>
                    <p><span className='ablumtitle'>User:  </span>
                        <span className='ablumText'>{props.ph.name}</span></p>
                    <p>
                        <span className="tooltiptext">click to see Album Photos</span>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default ListView;