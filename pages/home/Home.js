import './Home.css';
import BtnBlue from '../../components/btnBlue/BtnBlue';
import PhotoUploader from '../../components/photoUploader/PhotoUploader';

const Home = () => {
    const onClickHandle = () => {
        console.log('work');
    }

    return (`
        <div class="homePage">
            <h1>Выберите фото,<br> на которые вы хотели бы наложить водяной знак</h1>
            ${PhotoUploader()}
            ${BtnBlue('Далее', 'nextBtn', true, onClickHandle)}
        </div>
    `)
}

export default Home;
