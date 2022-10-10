import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom'
import './welcome.css';

const styles = {};

class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            favorite: []
        }
    }

    componentWillMount() {
        if (!localStorage.getItem('login')) {
            let user = this.setState({ redirect: true });
            console.log(user)
        }
        let user = JSON.parse(localStorage.getItem('login'))
        if (user != null) {
            this.setState({'favorite': user.favorite})
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
                        this.state.favorite.map((item, index) => (
                            <li key={index}>
                                <img style={styles.img} alt="" src={item}/>
                            </li>
                        ))}
                </ul>
                <p>
                    <button onClick={this.showMainPics}>CHANGE A BATCH OF DOG PICS</button>
                </p>
            </div>
        )
    }
}

export default Favourite;
