import './PreviewFile.css';

export function previewFileAsImg(file, elementToAppend, handleDelete) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let div = document.createElement('div');
        div.classList.add('img-container');

        let img = document.createElement('img');
        img.src = reader.result;
        img.id = file.lastModified;

        div.append(img);

        let trash = document.createElement('div');
        trash.classList.add('trash');
        trash.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>`;
        trash.addEventListener('click', handleDelete);
        div.append(trash);

        elementToAppend.appendChild(div);
    }
}


export function previewFilesAsCanvas(file, elementToAppend) {
    let app = document.querySelector('#app');

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let div = document.createElement('div');
        div.classList.add('img-container');

        let originalImg = document.createElement('img');
        originalImg.src = reader.result;

        let newImg = document.createElement('img');
        newImg.src = watermakImageWithText(
            originalImg,
            "some text"
          );
        newImg.id = file.lastModified; 

        div.append(newImg);

        let eye = document.createElement('div');
        eye.classList.add('eye');
        eye.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
            </svg>
        `
        eye.addEventListener('click', () => {
            let div = document.createElement('div');
            div.id = 'bigImgContainer';

            let bigImg = document.createElement('img');
            bigImg.src = newImg.src;
            bigImg.id = "bigImg";

            let closeBtn = document.createElement('a');
            closeBtn.id = 'closeBigImg';
            closeBtn.innerText = 'x';
            closeBtn.addEventListener('click', () => {
                app.removeChild(div);
            });

            div.append(bigImg, closeBtn);
            app.appendChild(div);
        });
        div.append(eye);


        function watermakImageWithText(originalImage, watermarkText) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
          
            const canvasWidth = originalImage.width;
            const canvasHeight = originalImage.height;
          
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
          
            // initializing the canvas with the original image
            context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

            // adding a watermark text
            context.fillStyle = "white";
            context.textBaseline = "middle";
            context.font = "bold 25pt serif";
            context.fillText(watermarkText, canvasWidth - 100, canvasHeight - 20);
          
            return canvas.toDataURL();
        }

        elementToAppend.appendChild(div);
    }
}