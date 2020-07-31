// Script 3
// *******File Upload*******

// Helper Functions
const fileTypes = ["image/png", "image/jpg"];
const isValidFileType = ({ type }) => fileTypes.includes(type);
const isValidFileSize = ({ size }) => MAX_FILE_SIZE >= size;
const setCancelUploadIcon = (bool) =>
  (cancelUploadIcon.style.display = bool ? "inline-block" : "none");
const resetFileUpload = () => {
  logo.src = "";
  fileName.innerHTML = "UPLOAD LOGO";
  fileInput.value = "";

  setCancelUploadIcon(false);
};
// Helper Functions Ends

cancelUploadIcon.onmousedown = () => {
  resetFileUpload();
};

const imageOnChangeHandler = (e) => {
  const file = fileInput.files[0];

  if (file) {
    if (!isValidFileType(file)) {
      errorMessage.textContent = `Invalid file type.`;
    } else if (!isValidFileSize(file)) {
      errorMessage.textContent = `File exceeding ${MAX_FILE_SIZE / 1024} mb.`;
    } else {
      fileName.innerHTML = file.name;
      logo.src = URL.createObjectURL(file);

      logoContainer.appendChild(logo);
      setCancelUploadIcon(true);
      startUpload();
    }
  }
};

// Tracking file upload progress
// for managing loaders
const startUpload = () => {
  var data = new FormData();
  data.append("file", fileInput.files[0]);

  const request = new XMLHttpRequest();
  request.open("post", "codeswim.in");

  // Upload starts
  request.upload.addEventListener("onloadstart", () => switchLoaders(true));

  // Uploaded
  request.addEventListener("load", () => switchLoaders(false));

  // send POST request to server side script
  request.send(data);
};

// Hooking input components
fileInput.addEventListener("change", imageOnChangeHandler);

// *******File Upload Ends*******
