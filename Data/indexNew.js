let galleryImages = document.querySelectorAll('.gallery-item');
let getLatestOpenedImg;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
console.log(innerWidth);

if (galleryImages) {
    galleryImages.forEach(function(item, index) {
        item.addEventListener('click', function() {
            let image = item.querySelector('img');
            let getFullImgUrl = image.getAttribute('src');
            let getImageUrlPos = getFullImgUrl.split("https://source.unsplash.com/1600x900/");
            let setNewImgUrl = getImageUrlPos[1].replace(",", "");

            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImageWindow = document.createElement('div');
            container.appendChild(newImageWindow);
            newImageWindow.setAttribute("class", "img-window");
            newImageWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img");
            newImageWindow.appendChild(newImg);
            newImg.setAttribute("src", "https://source.unsplash.com/1600x900/" + setNewImgUrl);
            newImg.setAttribute("id", "current-image");

            let newTxt = document.createElement("div");
            newImageWindow.appendChild(newTxt);
            let imgAlt = image.getAttribute("alt");
            newTxt.innerHTML = imgAlt;
            newTxt.setAttribute("class", "imgTxt");

            newImg.onload = function() {
                let imgWidth = this.width;
                let imgHeight = this.height;
                let calcImgToEdgeX = ((windowWidth - imgWidth)/2);
                let calcImgToEdgeY = ((windowHeight - imgHeight)/2);

                // anchor build here normally but left out in this code
                let btnPrevImg = document.createElement("img");
                container.appendChild(btnPrevImg);
                btnPrevImg.setAttribute("src", "Style/img/left-chevron.png");
                btnPrevImg.setAttribute("class", "img-btn-prev");
                btnPrevImg.setAttribute("id", "leftArrow");
                btnPrevImg.setAttribute("onclick", "changeImg(0)");
                btnPrevImg.style.cssText = "left: " + calcImgToEdgeX + "px; top: " + calcImgToEdgeY + "px;";

                let btnNextImg = document.createElement("img");
                container.appendChild(btnNextImg);
                btnNextImg.setAttribute("src", "Style/img/right-chevron.png");
                btnNextImg.setAttribute("class", "img-btn-next");
                btnNextImg.setAttribute("id", "rightArrow");
                btnNextImg.setAttribute("onclick", "changeImg(1)");
                btnPrevImg.style.cssText = "right: " + calcImgToEdgeX + "px; top: " + calcImgToEdgeY + "px;";


            }
        })
    })
}


function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector("#rightArrow").remove();
    document.querySelector("#leftArrow").remove();
    document.querySelector('.imgTxt').remove(); 
}

function changeImg(direction) {
    document.querySelector("#current-image").remove();
    document.querySelector('.imgTxt').remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    let nextTxt = document.createElement("div");
    getImgWindow.appendChild(newImg);
    getImgWindow.appendChild(nextTxt);

    let calcNewImg;
    if (direction == 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    } else if (direction == 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    let wordCalcNewImg = convertNumberToWords(calcNewImg);


    let thisImage = document.querySelector("." + wordCalcNewImg);
    let getFullImgUrl = thisImage.getAttribute('src');
    let getImageUrlPos = getFullImgUrl.split("https://source.unsplash.com/1600x900/");
    let setNewImgUrl = getImageUrlPos[1].replace(",", "");
    newImg.setAttribute("src", "img")
    newImg.setAttribute("src", "https://source.unsplash.com/1600x900/" + setNewImgUrl);
    newImg.setAttribute("id", "current-image");
    nextTxt.innerHTML = thisImage.getAttribute("alt");
    nextTxt.setAttribute("class", "imgTxt");
    getLatestOpenedImg = calcNewImg;


    newImg.onload = function() {
    let imgWidth = this.width;
    let calcImgToEdge = ((windowWidth - imgWidth)/2) - 80;

    let  nextBtn = document.querySelector(".img-btn-next");
    nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

    let  prevBtn = document.querySelector(".img-btn-prev");
    prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
    }
}



// Define an object that maps numbers to their word form
const numbersToWords = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };
  
  // Define the convertNumberToWords function
  function convertNumberToWords(number) {
    // if number present in object no need to go further
    if (number in numbersToWords) return numbersToWords[number];
  
    // Initialize the words variable to an empty string
    let words = "";
  
    // If the number is greater than or equal to 100, handle the hundreds place (ie, get the number of hundres)
    if (number >= 100) {
      // Add the word form of the number of hundreds to the words string
      words += convertNumberToWords(Math.floor(number / 100)) + " hundred";
  
      // Remove the hundreds place from the number
      number %= 100;
    }
  
    // If the number is greater than zero, handle the remaining digits
    if (number > 0) {
      // If the words string is not empty, add "and"
      if (words !== "") words += " and ";
  
      // If the number is less than 20, look up the word form in the numbersToWords object
      if (number < 20) words += numbersToWords[number];
      else {
        // Otherwise, add the word form of the tens place to the words string
        //if number = 37, Math.floor(number /10) will give you 3 and 3 * 10 will give you 30
        words += numbersToWords[Math.floor(number / 10) * 10];
  
        // If the ones place is not zero, add the word form of the ones place
        if (number % 10 > 0) {
          words += "-" + numbersToWords[number % 10];
        }
      }
    }
  
    // Return the word form of the number
    return words;
  }
  
  console.log(convertNumberToWords(24));
  