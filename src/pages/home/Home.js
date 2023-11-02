import './Home.css';
import BtnBlue from '../../components/btnBlue/BtnBlue';
import PhotoUploader from '../../components/photoUploader/PhotoUploader';

const Home = () => {
    return (`
        <div class="home-page">
            <div class="home-container">
                <h1>Choose a photo, <br>to which you would like to add a watermark</h1>
                ${PhotoUploader()}
                ${BtnBlue('Next', 'nextBtn', true)}
            </div>
        </div>
    `)
}

export default Home;
