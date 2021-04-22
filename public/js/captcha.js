/**
 *
 * @author: lotiko
 * @date:  04/2021
 *
 * @summary: Custom captcha with canvas
 */

let arrImgObj = [
  { name: "bananes", path: "/images/svg/iconfinder_650369.svg" },
  { name: "citron", path: "/images/svg/iconfinder_2003309.svg" },
  { name: "mangue", path: "/images/svg/iconfinder_2003314.svg" },
  { name: "grenade", path: "/images/svg/iconfinder_2003308.svg" },
  { name: "fraise", path: "/images/svg/iconfinder_2003311.svg" },
];
const $canvas = document.querySelectorAll("canvas");
const $fruitToFind = document.getElementById("img-to-find");
let randomArrImg, fruitTofind, idFruitToFind;

/**
 * Return new Array with mixed values of the array in parameter
 *
 * @param {Array} arr
 * @returns {Array} - mixed array
 */
function mixArrayWithFisherYatesAlgo(arr) {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let newVal = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[newVal]] = [newArr[newVal], newArr[i]];
  }
  return newArr;
}
/**
 * Make image with src = imgObj.path, draw it in canvas with a className set to the id of the imgObj and call addEventOnCanvas
 *
 * @param {Object} canvas - HTMLcanvas object
 * @param {{name,path,id}} imgObj - Object with name, path and id properties
 */
function buildCanvasCaptcha(canvas, imgObj) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 40, 40);
  const img = new Image();
  img.onload = () => ctx.drawImage(img, 8, 8);
  img.src = imgObj.path;
  canvas.className = imgObj.id;
  addEventOnCanvas(canvas);
}
/**
 * Add event on canvas for the captcha, the event check if the good answer
 * if not reload a new captcha, else hide captcha and show submit button
 *
 * @param {Object} canvas - HTMLcanvas to add event
 */
function addEventOnCanvas(canvas) {
  canvas.onclick = () => {
    if (canvas.className !== idFruitToFind) {
      newCaptcha();
    } else {
      document.getElementById("submit-btn").hidden = false;
      document.getElementById("captcha").hidden = true;
    }
    return;
  };
}
/**
 * Mixe an array of image Object, then call buildcanvasCaptcha for each mixed array.
 * Insert name of fruit to find in Html, set idFruitToFind with the good value
 *
 */
function newCaptcha() {
  randomArrImg = mixArrayWithFisherYatesAlgo(arrImgObj);
  for (let i = 0; i < 5; i++) {
    randomArrImg[i].id = mixArrayWithFisherYatesAlgo([...randomArrImg[i].path]).join("");
    buildCanvasCaptcha($canvas[i], randomArrImg[i]);
  }
  fruitTofind = randomArrImg[Math.floor(Math.random() * randomArrImg.length)];
  idFruitToFind = fruitTofind.id;
  $fruitToFind.textContent = fruitTofind.name;
}
newCaptcha();
