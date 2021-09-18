// Select <main> tag
let main = document.querySelector("main");
let loading = document.querySelector('#loading');
let ImgView = document.querySelector('.preview');
let arr=[];

async function getData() {
  let res = await fetch("./db/gallery.json");
  if(res.ok){
    let data = await res.json();
    display(data);
  }
  else{
      loading.textContent="Sorry couldn't load data :(";
  }
}
getData();

ImgView.style.display="none";

ImgView.addEventListener('click',()=>{
    ImgView.style.display="none";
})

function display(data) {
  arr = data.album;
  arr.forEach((el) => {
    // Create a seperate Container
    let div = document.createElement("div");
    div.className="container ml-4 my-4 p-4 rounded-xl bg-light shadow";

    // Insert Heading and date
    let heading = document.createElement("div");
    heading.textContent = el.title;
    heading.className="h3 m-0"
    div.append(heading);

    let date = document.createElement("span");
    date.textContent = el.date;
    date.className="my-2 badge rounded-pill bg-primary"
    div.append(date);

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add('image_wrapper')
    div.append(image_wrapper)

    el.images.forEach((el) => {
      let pic = document.createElement("img");
      pic.classList.add("img-fluid", "images");
      pic.dataset.og=el.original;
      pic.src = el.thumb
      pic.addEventListener('click',(e)=>preview(e));
      image_wrapper.append(pic);
    });

    loading.replaceWith(div);
    main.append(div)

  });
}

function preview(e){
  document.querySelector('.previewImg').src=e.target.dataset.og;
  ImgView.style.display="flex";
}