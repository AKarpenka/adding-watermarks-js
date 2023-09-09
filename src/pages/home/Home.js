import './Home.css';
import BtnBlue from '../../components/btnBlue/BtnBlue';
import PhotoUploader from '../../components/photoUploader/PhotoUploader';

const Home = () => {
    return (`
        <div class="home-page">
            <div class="home-container">
                <h1>Выберите фото,<br> на которые вы хотели бы наложить водяной знак</h1>
                ${PhotoUploader()}
                ${BtnBlue('Далее', 'nextBtn', true)}
            </div>
        </div>
    `)
}

export default Home;
