// import wpcf7mc.js

const wpcf7mcEls = document.querySelectorAll(".wpcf7-form-control-wrap.wpcf7mc");

wpcf7mcEls.forEach((el) => {
    const wpcf7mc = new Wpcf7mc();
    wpcf7mc.init(el);
});
