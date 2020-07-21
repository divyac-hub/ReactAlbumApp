import React, { Component } from "react";
import axios from "axios";
import "./album.css";
import Thumbnail from './thumbnail';
import Spinner from './spinner';
import ListView from "./listView";


class ListOfAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnail:false,
            thumbnailImg:false,
            thumbnailData:[],
            details: [],
            errorMessage:''
        }
    }

    async componentDidMount() {
        let that = this; //global scope
        let d = [];
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                res.data.forEach(function (person) {
                    axios.get("https://jsonplaceholder.typicode.com/albums")
                        .then(res1 => {
                            res1.data.forEach(function (albumData) {
                                if (person.id === albumData.userId) {
                                    axios.get("https://jsonplaceholder.typicode.com/photos")
                                        .then(res2 => {
                                            res2.data.forEach(function (photoData, index) {
                                                let a = {
                                                    "name": person.username,
                                                    "id": index + 1,
                                                    "albumText": albumData.title,
                                                    "photourl": photoData.thumbnailUrl,
                                                    "photoS": photoData.url
                                                }
                                                if (albumData.userId === photoData.albumId) {
                                                    d.push(a)
                                                    that.setState({ details: d })
                                                }
                                            })
                                        }).catch(function (error) {
                                            that.setState({ errorMessage: error.message });
                                        })
                                }
                            })
                        }).catch(function (error) {
                            that.setState({ errorMessage: error.message });
                        })
                });
            }).catch(function (error) {
                that.setState({ errorMessage: error.message });
            })
    }


    ablumClick = (albumName) => {
        let thumbnailDetails={
            'imgSrc':albumName.photourl,
            'imgAlt':albumName.name,
            'imgSecond':albumName.photoS
        }
        this.setState({ thumbnail: true, thumbnailData: thumbnailDetails});
    }

    imgClick=(thumbnailData)=>{
        this.setState({
            thumbnailImg:true
        })
    }
    goBackClick=(thumbnailData)=>{
        this.setState({
            thumbnail: false,
            thumbnailImg:false
        })
    }

    render() {
        return (
            <div className="ablumData">
                <p className='errorMessage'>{this.state.errorMessage}</p>
                {this.state.thumbnail ? <div> <Thumbnail thumbnailData={this.state.thumbnailData}
                imgClick={this.imgClick}
                goBackClick={this.goBackClick} thumbnailImg={this.state.thumbnailImg} /></div> :
                    <div>
                        {this.state.details.length > 0 ?
                            <div>
                                <div className="cardHeader">
                                    ALBUM TITLES
                                </div>
                                {this.state.details.map((albumName) => {
                                    return (
                                        <ListView albumName={albumName} ablumClick={this.ablumClick} />
                                    );
                                })}
                            </div> :
                            <Spinner />
                        }
                    </div>
                }
            </div>
        );
    }
}

export default ListOfAlbum;