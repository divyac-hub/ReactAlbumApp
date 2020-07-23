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
            thumbnailImg: false,
            thumbnailData: [],
            errorMessage: '',
            ph: [],
            piFlag: false,
            insertPh: [],
            fetchedpic: []
        }
    }

    async componentDidMount() {
        let that = this; //global scope
        let d = [];
        let p = [];
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                res.data.forEach(function (person) {
                    axios.get("https://jsonplaceholder.typicode.com/albums")
                        .then(res1 => {
                            res1.data.forEach(function (albumData, index) {
                                let nat = {
                                    "name": person.username,
                                    "id": index + 1,
                                    "albumText": albumData.title
                                }
                                if (person.id === albumData.userId) {
                                    p.push(nat);
                                    that.setState({ ph: p });
                                    axios.get("https://jsonplaceholder.typicode.com/photos")
                                        .then(res2 => {
                                            res2.data.forEach(function (photoData, index) {
                                                let b = {
                                                    "photourl": photoData.thumbnailUrl,
                                                    "photoS": photoData.url,
                                                    "ptitle": photoData.title,
                                                    "id": index + 1,
                                                    "albumText": albumData.title
                                                }
                                                if (albumData.userId === photoData.albumId) {
                                                    d.push(b);
                                                    that.setState({ insertPh: d });
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


    getImage = (fetchedpic, imgS) => {
        let that = this;
        let imgPic = []
        that.state.fetchedpic.forEach(function (p) {
            let iPic = {
                "imgS": p.photoS
            }
            if (p.ptitle === fetchedpic) {
                imgPic.push(iPic)
                that.setState({
                    thumbnailImg: true, thumbnailData: imgPic
                })
            }

        })
    }
    goBackClick = () => {
        this.setState({
            piFlag: false, thumbnailImg: false
        })
    }

    getImageClose=()=>{
        this.setState({
            thumbnailImg: false
        })
    }


    ablumClick = (ph) => {
        let that = this;
        let dd = [];


        that.state.insertPh.forEach(function (bb, index) {
            const b = {
                "photourl": bb.photourl,
                "photoS": bb.photoS,
                "ptitle": bb.ptitle,
                "id": index + 1
            }
            if (ph.albumText === bb.albumText) {
                dd.push(b)
                that.setState({ fetchedpic: dd, piFlag: true })
            }
        })
    }

    render() {
        return (
            <div className="ablumData">
                {this.state.piFlag ? <div> <Thumbnail fetchedpic={this.state.fetchedpic}
                    getImage={this.getImage}
                    thumbnailData={this.state.thumbnailData}
                    goBackClick={this.goBackClick} thumbnailImg={this.state.thumbnailImg} 
                    getImageClose={this.getImageClose}/></div> :
                    <div>
                        {this.state.ph.length > 0 ?
                            <div>
                                <div className="cardHeader">
                                    ALBUM TITLES
                                </div>
                                {this.state.ph.map((ph) => {
                                    return (
                                        <ListView ph={ph} ablumClick={this.ablumClick} />
                                    )
                                })}
                            </div> :
                            <Spinner />
                        }
                    </div>
                }
                <p className='errorMessage'>{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default ListOfAlbum;