//Assigning variables to DOM elements
let dropControl = document.getElementById("drop-control")
let dropMenu = document.getElementById("drop-menu")
let dropItems = Array.from(document.getElementsByClassName("drop-item"))
let dropNav = document.getElementById("drop-nav")
//initializes inline display style to ensure first click works
dropNav.style.height="50px"

//Adding click event listener to drop down button
dropNav.addEventListener("mouseover", handleDropDown)
dropNav.addEventListener("mouseout", handleDropDown)

dropItems.forEach((element) => {
  element.addEventListener("click", handleDropDown)
})

//Callback function for drop down event listeners
function handleDropDown (event) {
  if (dropNav.style.height === "50px") {
    dropNav.style.height = "160px"
  } else {
    dropNav.style.height = "50px"
  }
}