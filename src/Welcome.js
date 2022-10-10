import React, {useReducer} from 'react';
import './welcome.css';
import axios from 'axios';
import {Redirect} from "react-router-dom";

const styles = {};

class Welcome extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: false,
            list: [],
            numberOfPics: [0, 1, 2, 3, 4, 5]
        };
    }

    componentWillMount() {
        if (!localStorage.getItem('login')) {
            let user = this.setState({ redirect: true });
            console.log(user)
        }
    }

    componentDidMount() {
        this.showMainPics()
    }

    getRandomImage = () => {
        axios
            .get("https://random.dog/woof.json")
            .then(response => {
                var url = response.data.url
                if (url.endsWith("mp4") || url.endsWith("webm")) {
                    this.getRandomImage()
                } else {
                    this.setState({
                        list: [...this.state.list, response.data.url]
                    })
                }
            })
            .catch(err => {
                console.log("error fetching image:", err);
            })
    }

    showMainPics = () => {
        this.state.list = []
        this.state.numberOfPics.forEach((item, index) => {
            this.getRandomImage()
        })
    }

    imageClick = (value) => {
        var res = window.confirm("Do you want to add it to your favorites?");
        if (res) {
            let user = JSON.parse(localStorage.getItem('login'))
            user.favorite.push(value)
            localStorage.setItem('login', JSON.stringify(user))
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={'/login'} />;
        }
        return (
            <div className={"container"}>
                <ul className={"image-gallery"}>
                    {
                        this.state.list.map((item, index) => (
                            <li key={index}>
                                <img style={styles.img} alt="" src={item} onClick={() => this.imageClick(item)}/>
                            </li>
                        ))}
                </ul>
                <p>
                    <button onClick={this.showMainPics}>CHANGE A BATCH OF DOG PICS</button>
                </p>
            </div>
        );
    }
}

export default Welcome;
