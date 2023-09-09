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


export function previewFilesAsCanvas(file, elementToAppend, settings, mode) {
    let app = document.querySelector('#app');

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async function() {
        let div = document.createElement('div');
        div.classList.add('img-container');

        let originalImg = document.createElement('img');
        originalImg.src = reader.result;

        let newImg = document.createElement('img');

        if(mode === 'textWattermark') {
            newImg.src = watermakImageWithText(
                originalImg,
                settings
            );
        } else if (mode === 'logoWattermark') {
            newImg.src = await watermakImage(
                originalImg,
                settings
            );
        }

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


        function watermakImageWithText(originalImage, settings) {
            const {text, fontSize, transparency, position} = settings;
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
          
            const canvasWidth = originalImage.width;
            const canvasHeight = originalImage.height;
          
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
          
            // initializing the canvas with the original image
            context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);

            // adding a watermark text
            context.fillStyle = `rgba(255, 225, 225, ${transparency/100})`;
            context.font = `bold ${canvasWidth/250*fontSize}px sans-serif`;

            switch (position) {
                case 'Сверху слева':
                    context.textAlign = "start";
                    context.fillText(text, 30, 30+(canvasWidth/250*fontSize)/2);
                    break;
                case 'Сверху посередине':
                    context.textAlign = "center";
                    context.fillText(text, canvasWidth/2, 30+(canvasWidth/250*fontSize)/2);
                    break;
                case 'Сверху справа':
                    context.textAlign = "end";
                    context.fillText(text, canvasWidth-30, 30+(canvasWidth/250*fontSize)/2);
                    break;
                case 'Посередине слева':
                    context.textAlign = "start";
                    context.fillText(text, 30, canvasHeight/2);
                    break;
                case 'Посередине':
                    context.textAlign = "center";
                    context.fillText(text, canvasWidth/2, canvasHeight/2);
                    break;
                case 'Посередине справа':
                    context.textAlign = "end";
                    context.fillText(text, canvasWidth-30, canvasHeight/2);
                    break;
                case 'Снизу слева':
                    context.textAlign = "start";
                    context.fillText(text, 30, canvasHeight-40);
                    break;
                case 'Снизу посередине':
                    context.textAlign = "center";
                    context.fillText(text, canvasWidth/2, canvasHeight-40);
                    break;
                case 'Снизу справа':
                    context.textAlign = "end";
                    context.fillText(text, canvasWidth-30, canvasHeight-40);
                    break;
                default:
                    break;
            }

            return canvas.toDataURL();
        }

        async function watermakImage(originalImage, settings) {
            const {logo, size, transparency, position} = settings; 
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
          
            const canvasWidth = originalImage.width;
            const canvasHeight = originalImage.height;
          
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
          
            // initializing the canvas with the original image
            context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
          
            // loading the watermark image and transforming it into a pattern
            const result = await fetch(logo?.currentSrc);
            const blob = await result.blob();
            const image = await createImageBitmap(blob, { resizeHeight: canvasWidth/250*size }); 
            const pattern = context.createPattern(image, "no-repeat");

            // translating the watermark image to the bottom right corner
            switch (position) {
                case 'Сверху слева':
                    context.translate(10, 10);
                    break;
                case 'Сверху посередине':
                    context.translate(canvasWidth/2 - image.width/2, 10);
                    break;
                case 'Сверху справа':
                    context.translate(canvasWidth-image.width-10, 10);
                    break;
                case 'Посередине слева':
                    context.translate(10, canvasHeight/2 - image.height/2);
                    break;
                case 'Посередине':
                    context.translate(canvasWidth/2 - image.width/2, canvasHeight/2 - image.height/2);
                    break;
                case 'Посередине справа':
                    context.translate(canvasWidth-image.width-10, canvasHeight/2 - image.height/2);
                    break;
                case 'Снизу слева':
                    context.translate(10, canvasHeight-image.height-10);
                    break;
                case 'Снизу посередине':
                    context.translate(canvasWidth/2 - image.width/2, canvasHeight-image.height-10);
                    break;
                case 'Снизу справа':
                    context.translate(canvasWidth-image.width-10, canvasHeight-image.height-10);
                    break;
                default:
                    break;
            }
            context.rect(0, 0, canvasWidth, canvasHeight);
            context.fillStyle = pattern;
            context.globalAlpha = transparency/100;
        
            context.fill();
          
            return canvas.toDataURL();
        }

        elementToAppend.appendChild(div);
    }
}