import './PhotoUploader.css';

const PhotoUploader = () => {
    return (`
        <div id="drop-area" draggable="true">
            <form id="formAction">
                <p>Drag photo here</p>
                <p>or</p>
                <input type="file" id="fileElem" multiple accept="image/*" >
                <label class="button" for="fileElem">select from your computer</label>
            </form>
            <div id="gallery" /></div>
            <p id="maxCountOfPhoto">Maximum number of uploaded files - 9.</p>
        </div>
    `);
}

export default PhotoUploader;
