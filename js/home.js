let about = document.querySelector('#about');
let content = about.textContent;

let read = document.querySelector("#read");

read.addEventListener('click',()=>{
    about.textContent=content;
    read.style.display="none";
})
function resizeWin(){
    if(window.innerWidth < 992){
        about.textContent= `${content.substring(0,200)}....`;
        read.style.display="block";
    }
    else {
        about.textContent= `${content.substring(0,content.length)}....`;
        read.style.display="none";
    }
}
resizeWin();
window.addEventListener('resize',()=>{
   resizeWin();
});