(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&r(g)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const V=(l,u,n)=>`
        <button id=${u} role="button" disabled=${n} >${l}</button>
    `;const J=()=>`
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
    `,Q=()=>`
        <div class="homePage">
            <h1>Выберите фото,<br> на которые вы хотели бы наложить водяной знак</h1>
            ${J()}
            ${V("Далее","nextBtn",!0)}
        </div>
    `;document.querySelector("#app").innerHTML=Q();function O(l,u,n){let r=new FileReader;r.readAsDataURL(l),r.onloadend=function(){let a=document.createElement("div");a.classList.add("img-container");let o=document.createElement("img");o.src=r.result,o.id=l.lastModified,a.append(o);let g=document.createElement("div");g.classList.add("trash"),g.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                            </svg>`,g.addEventListener("click",n),a.append(g),u.appendChild(a)}}function j(l,u,n,r){let a=document.querySelector("#app"),o=new FileReader;o.readAsDataURL(l),o.onloadend=async function(){let g=document.createElement("div");g.classList.add("img-container");let y=document.createElement("img");y.src=o.result;let E=document.createElement("img");r==="textWattermark"?E.src=c(y,n):r==="logoWattermark"&&(E.src=await h(y,n)),E.id=l.lastModified,g.append(E);let w=document.createElement("div");w.classList.add("eye"),w.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
            </svg>
        `,w.addEventListener("click",()=>{let i=document.createElement("div");i.id="bigImgContainer";let s=document.createElement("img");s.src=E.src,s.id="bigImg";let d=document.createElement("a");d.id="closeBigImg",d.innerText="x",d.addEventListener("click",()=>{a.removeChild(i)}),i.append(s,d),a.appendChild(i)}),g.append(w);function c(i,s){const{text:d,fontSize:L,transparency:x,position:C}=s,v=document.createElement("canvas"),t=v.getContext("2d"),m=i.width,f=i.height;switch(v.width=m,v.height=f,t.drawImage(i,0,0,m,f),t.fillStyle=`rgba(255, 225, 225, ${x/100})`,t.font=`bold ${L}pt sans-serif`,C){case"Сверху слева":t.textAlign="start",t.fillText(d,30,40);break;case"Сверху посередине":t.textAlign="center",t.fillText(d,m/2,40);break;case"Сверху справа":t.textAlign="end",t.fillText(d,m-30,40);break;case"Посередине слева":t.textAlign="start",t.fillText(d,30,f/2);break;case"Посередине":t.textAlign="center",t.fillText(d,m/2,f/2);break;case"Посередине справа":t.textAlign="end",t.fillText(d,m-30,f/2);break;case"Снизу слева":t.textAlign="start",t.fillText(d,30,f-40);break;case"Снизу посередине":t.textAlign="center",t.fillText(d,m/2,f-40);break;case"Снизу справа":t.textAlign="end",t.fillText(d,m-30,f-40);break}return v.toDataURL()}async function h(i,s){const{logo:d,size:L,transparency:x,position:C}=s,v=document.createElement("canvas"),t=v.getContext("2d"),m=i.width,f=i.height;v.width=m,v.height=f,t.drawImage(i,0,0,m,f);const k=await(await fetch(d==null?void 0:d.currentSrc)).blob(),p=await createImageBitmap(k,{resizeHeight:L}),b=t.createPattern(p,"no-repeat");switch(C){case"Сверху слева":t.translate(10,10);break;case"Сверху посередине":t.translate(m/2-p.width/2,10);break;case"Сверху справа":t.translate(m-p.width-10,10);break;case"Посередине слева":t.translate(10,f/2-p.height/2);break;case"Посередине":t.translate(m/2-p.width/2,f/2-p.height/2);break;case"Посередине справа":t.translate(m-p.width-10,f/2-p.height/2);break;case"Снизу слева":t.translate(10,f-p.height-10);break;case"Снизу посередине":t.translate(m/2-p.width/2,f-p.height-10);break;case"Снизу справа":t.translate(m-p.width-10,f-p.height-10);break}return t.rect(0,0,m,f),t.fillStyle=b,t.globalAlpha=x/100,t.fill(),v.toDataURL()}u.appendChild(g)}}const X=["/logo-1.png","/logo-2.png","/logo-3.png","/logo-4.png","/logo-5.png","/logo-6.png","/logo-7.png","/logo-8.png"],Y=l=>{let u=document.querySelector("#app"),n=document.createElement("div");n.id="editMenu";let r=document.createElement("input");r.type="button",r.id="addTextBtn",r.value="Добавить текст";let a=document.createElement("input");a.type="button",a.id="addLogoBtn",a.value="Добавить логотип",o();function o(){n.appendChild(r),n.innerHTML+="<p>или</p>",n.appendChild(a),n.querySelector("#addTextBtn").addEventListener("click",g),n.querySelector("#addLogoBtn").addEventListener("click",y)}function g(){let c=document.createElement("input");c.type="text",c.id="textValue",c.placeholder="Ваш текст",E("textWattermark",c)}function y(){n.innerHTML="";let c=document.createElement("a");c.innerText="< Назад";let h=document.createElement("input");h.type="button",h.id="addLogoFromGallery",h.value="Выбрать из галереи";let i=document.createElement("label");i.classList.add("input-file");let s=document.createElement("input");s.type="file",s.accept="image/*";let d=document.createElement("span");d.innerText="Выбрать из файлов",i.append(s,d),n.append(c,h,i),n.querySelector("a").addEventListener("click",()=>{n.innerHTML="",o()}),n.querySelector("#addLogoFromGallery").addEventListener("click",w),s.addEventListener("change",L=>{var C;let x=new FileReader;x.readAsDataURL((C=L.target)==null?void 0:C.files[0]),x.onloadend=function(){let v=document.createElement("img");v.src=x.result,E("logoWattermark",v)}})}function E(c,h){n.innerHTML="";let i=document.createElement("a");i.innerText="< Назад";let s=document.createElement("form"),d=document.createElement("select");if(c==="textWattermark")for(let e=10;e<=42;e+=2)m(e,d,"pt");else if(c==="logoWattermark")for(let e=10;e<=300;e+=10)m(e,d,"px");let L=document.createElement("select");for(let e=10;e<=100;e+=10)m(e,L,"%");let x=document.createElement("select");["Сверху слева","Сверху посередине","Сверху справа","Посередине слева","Посередине","Посередине справа","Снизу слева","Снизу посередине","Снизу справа"].forEach(e=>{m(e,x)});let v=document.createElement("input");v.type="submit",v.value="Применить",c==="textWattermark"?s.append(t("Текст",h)):c==="logoWattermark"&&s.append(t("Выбранный логотип",h)),s.append(t("Размер",d),t("Прозрачность",L),t("Позиция",x),v),n.append(i,s),n.querySelector("a").addEventListener("click",()=>{n.innerHTML="",o()}),n.querySelector("form").addEventListener("submit",e=>{f(e,c,h)});function t(e,k){let p=document.createElement("div");p.classList.add("setting");let b=document.createElement("p");return b.innerText=e,p.append(b,k),p}function m(e,k,p=""){let b=document.createElement("option");b.value=e,b.innerText=`${e}${p}`,k.appendChild(b)}function f(e,k,p){var F,I,q,P,D,W,$;e.preventDefault();let b={};k==="textWattermark"?b={text:((F=e==null?void 0:e.target[0])==null?void 0:F.value)||"Ваш текст",fontSize:(I=e==null?void 0:e.target[1])==null?void 0:I.value,transparency:(q=e==null?void 0:e.target[2])==null?void 0:q.value,position:(P=e==null?void 0:e.target[3])==null?void 0:P.value}:k==="logoWattermark"&&(b={logo:p,size:(D=e==null?void 0:e.target[0])==null?void 0:D.value,transparency:(W=e==null?void 0:e.target[1])==null?void 0:W.value,position:($=e==null?void 0:e.target[2])==null?void 0:$.value});let A=document.querySelector("#editGallery");A.innerHTML="",l.forEach(K=>j(K,A,b,k))}}function w(){let c=document.createElement("div");c.classList.add("logo-outer-container");let h=document.createElement("div");h.id="logoContainer";let i=document.createElement("a");i.innerText="x",X.forEach(s=>{let d=document.createElement("div");d.classList.add("logo-btn");let L=document.createElement("img");L.src=s,L.height="70",d.appendChild(L),h.appendChild(d)}),i.addEventListener("click",()=>{u.removeChild(c)}),h.addEventListener("click",s=>{E("logoWattermark",s==null?void 0:s.target),u.removeChild(c)}),c.append(h,i),u.appendChild(c)}return n},Z=(l,u={text:"",fontSize:0,transparency:0,position:0})=>{let n=document.createElement("div");n.classList.add("edit-container"),n.innerHTML=`
        <div id="editHeader"> 
        </div>
        <div id="editContent">
        </div>
    `;let r=document.createElement("a");r.innerText="< Назад";let a=document.createElement("button");a.id="downloadFiles",a.innerText="Скачать файлы";let o=document.createElement("div");o.id="editGallery",l.forEach(y=>j(y,o,u,"textWattermark")),n.querySelector("#editHeader").append(r,a),n.querySelector("#editContent").append(o,Y(l)),n.querySelector("#editHeader a").addEventListener("click",()=>{location.reload()}),n.querySelector("#downloadFiles").addEventListener("click",()=>{document.querySelectorAll(".img-container>img").forEach((E,w)=>{g(E==null?void 0:E.currentSrc,`img-${w+1}`).then(()=>{console.log("The image has been downloaded")}).catch(c=>{console.log("Error downloading image: ",c)})})});async function g(y,E="my-image.png"){const c=await(await fetch(y)).blob(),h=URL.createObjectURL(c),i=document.createElement("a");i.href=h,i.download=E,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(h)}return n};let B=document.getElementById("drop-area"),_=document.getElementById("fileElem"),z=document.getElementById("maxCountOfPhoto"),R=document.getElementById("formAction"),S=document.getElementById("gallery"),H=document.getElementById("nextBtn"),U=document.querySelector("#app");_.addEventListener("change",M);H.addEventListener("click",ae);let T=[];["dragenter","dragover","dragleave","drop"].forEach(l=>{B.addEventListener(l,G,!1),document.body.addEventListener(l,G,!1)});["dragenter","dragover"].forEach(l=>{B.addEventListener(l,ee,!1)});["dragleave","drop"].forEach(l=>{B.addEventListener(l,te,!1)});B.addEventListener("drop",ne,!1);function G(l){l.preventDefault(),l.stopPropagation()}function ee(){B.classList.add("highlight")}function te(){B.classList.remove("highlight")}function ne(l){let n=l.dataTransfer.files;M(n)}function M(l){var n;let u=[];if(l!=="delete"){let r;"target"in l?r=(n=l.target)==null?void 0:n.files:r=l,r=[...r],r.forEach(a=>{T.length<9&&(T.push(a),u.push(a))})}T.length>=9?(z.style.display="block",R.style.display="none"):(z.style.display="none",R.style.display="block"),T.length>0?H.disabled=!1:H.disabled=!0,l!=="delete"?u.forEach(r=>O(r,S,N)):(S.innerHTML="",T.forEach(r=>O(r,S,N)))}function N(l){var n,r,a,o,g;l.preventDefault();const u=(g=(o=(a=(r=(n=l==null?void 0:l.target)==null?void 0:n.parentNode)==null?void 0:r.parentNode)==null?void 0:a.parentNode)==null?void 0:o.childNodes[0])==null?void 0:g.id;T.splice(T.findIndex(y=>y.lastModified==u),1),M("delete")}function ae(){U.innerHTML="",U.appendChild(Z(T))}
