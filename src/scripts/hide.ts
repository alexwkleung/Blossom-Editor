function hideShowButtons() {
    const hideButtonDiv = document.getElementById('hideButtons');
    if(hideButtonDiv.style.display === "none") {
      hideButtonDiv.style.display = "block";
    } else {
      hideButtonDiv.style.display = "none";
    }
};

function hideShowPreview() {
    const hidePrevDiv = document.getElementById('preview');
    if(hidePrevDiv.style.display === "block") {
        hidePrevDiv.style.display = "none";
    } else {
        hidePrevDiv.style.display = "block";
    }
};