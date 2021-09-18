function scrollUp(){
    window.scrollTo(0,0);
}

window.addEventListener('scroll', function () {
    let header = document.querySelector('header');
    header.classList.toggle('scrolling-active', window.scrollY > 0);
    let exp = this.document.querySelector('#expander');

    exp.classList.toggle('expander',window.scrollY>0);

})