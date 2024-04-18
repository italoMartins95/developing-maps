import './Home.css';
import mainImage from '../../images/map-animation-rtkyOpLjWi.png';
import googleImage from '../../images/Group 1.png'

const Home = () => {

    return (
        <section className='home-page'>
            <h2>
                DEVELOPING MAPS
            </h2>
            <img className='image-map' src={mainImage}/>
            <img className='image-google' src={googleImage}/>
        </section>
    )
}

export default Home;