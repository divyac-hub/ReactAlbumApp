import React from 'react';
import './album.css';

const ListView = (props)=> {


    return (
        <div key={props.albumName.id}  onClick={()=> props.ablumClick(props.albumName)}>
            <div className="albumList">
                               <p><span className='ablumtitle'>Album Title:  </span>
                               <span className='ablumText'>{props.albumName.albumText}</span></p>
                               <p><span className='ablumtitle'>User:  </span> 
                               <span className='ablumText'>{props.albumName.name}</span></p>
                            </div>
       
      </div>
    );
}

export default ListView;