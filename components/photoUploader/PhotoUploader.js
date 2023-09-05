import './PhotoUploader.css';

const PhotoUploader = () => {
    return (`
    <div id="drop-area">
        <form class="my-form">
            <p>Перетащите фото сюда</p>
            <p>или</p>
            <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)">
            <label class="button" for="fileElem">выберите со своего копьютера</label>
        </form>
    </div>  
    `)
}

export default PhotoUploader;
