// Script 2
// *******Color Change*******
// Setting colors
const colors = [
  {
    image: "",
    image: "Pink umbrella.png",
    primary: "rgb(255, 102, 178)",
    secondary: "rgb(255, 153, 204)",
    backgroundColor: "rgb(255,204,229)",
  },
  {
    image: "Blue umbrella.png",
    primary: "rgb(102, 178, 255)",
    secondary: "rgb(153, 204, 255)",
    backgroundColor: "rgb(204, 229, 255)",
    // backgroundColor: "rgba(0,0, 255, 0.5)",
  },
  {
    image: "Yello umbrella.png",
    primary: "rgb(255, 255, 51)",
    secondary: "rgb(255, 255, 153)",
    backgroundColor: "rgb(255, 255, 204)",
  },
];

/* Element References */
const body = document.body;

const umbrellaImage = document.getElementById("umbrella-image");
const loaderContainer = document.getElementById("umbrella-loader-container");
const loaderSvg = document.getElementById("loader-svg");

const logoContainer = document.getElementById("logo-container");
const logo = document.getElementById("logo");

const fileInput = document.getElementById("upload-file");
const uploadButton = document.getElementById("upload-button");
const buttonUploadIcon = document.getElementById("upload-icon");
const fileName = document.getElementById("upload-text");
const cancelUploadIcon = document.getElementById("upload-cancel");
const errorMessage = document.getElementById("upload-error-message");
const buttonLoader = document.getElementById("upload-loader");

const colorPalette = document.getElementById("color-palette");

const MAX_FILE_SIZE = 5 * 1024 * 1024; // in bytes

// Element References Ends

// Helper Functions
const resetColorButtons = (e) => {
  // Reset previous active style
  colorPalette.childNodes.forEach((element) => {
    element.className = "option";
  });

  // Apply active style to current element
  e.target.classList.add("option-active");
};

const setLoaderColor = (umbrellaLoaderColor) => {
  loaderSvg.childNodes[1].style.fill = umbrellaLoaderColor;
};

const logoFadeInEffect = () => {
  logo.classList.add("logo-hide");
  logo.classList.add("logo-show");
  logo.classList.remove("logo-hide");
};

const switchLoaders = (bool) => {
  // Show loaders on true
  loaderContainer.style.display = bool ? "flex" : "none";
  buttonLoader.style.display = bool ? "unset" : "none";

  // Hide umbrella and logo on true
  umbrellaImage.style.display = bool ? "none" : "unset";
  logo.style.display = bool ? "none" : "unset";
  buttonUploadIcon.style.display = bool ? "none" : "inline-block";
};

const updateUmbrella = (imageName) => {
  switchLoaders(true);
  umbrellaImage.src = `./assets/${imageName}`;

  umbrellaImage.onload = () => {
    switchLoaders(false);
  };
};

const updateTheme = ({ primary, backgroundColor }) => {
  body.style.backgroundColor = backgroundColor;
  uploadButton.style.backgroundColor = primary;
  setLoaderColor(primary);
  logoFadeInEffect();
};
// Helper Functions ends

// Generating color switches and related events
// from colors array
colors.forEach((umbrella, index) => {
  const { primary, secondary, image } = umbrella;
  const color = document.createElement("span");
  color.id = `color-${index}`;
  color.style.backgroundColor = primary;
  color.style.border = `0px solid ${secondary}`;

  color.className = "option";
  if (index === 0) {
    color.classList.add("option-active");
    updateUmbrella(image);
    updateTheme(umbrella);
  }

  colorPalette.appendChild(color);
});

// Handling color selection
colorPalette.addEventListener("click", (e) => {
  // Check if clicked on child element (switch)
  if (e.target.id === "color-palette") return;

  // Changing umbrella image
  const umbrellaIndex = /\-(.*)/.exec(e.target.id)[1];
  const umbrellaImage = colors[umbrellaIndex].image;

  updateUmbrella(umbrellaImage);
  resetColorButtons(e);
  updateTheme(colors[umbrellaIndex]);
});

// *******Handling Color Change Ends*******
