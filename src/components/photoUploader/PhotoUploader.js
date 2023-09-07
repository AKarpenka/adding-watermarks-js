import './PhotoUploader.css';

const PhotoUploader = () => {
    return (`
        <div id="drop-area" draggable="true">
            <form id="formAction">
                <p>Перетащите фото сюда</p>
                <p>или</p>
                <input type="file" id="fileElem" multiple accept="image/*" >
                <label class="button" for="fileElem">выберите со своего копьютера</label>
            </form>
            <div id="gallery" /></div>
            <p id="maxCountOfPhoto">Максимальное колличество загружаемых файлов - 9.</p>
        </div>
    `);
}

export default PhotoUploader;
