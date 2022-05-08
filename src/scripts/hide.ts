function hideButtons() {
    const hideButtonDiv = document.getElementById('hideButtons');
    if(hideButtonDiv.style.display === "none") {
      hideButtonDiv.style.display = "block";
    } else {
      hideButtonDiv.style.display = "none";
    }
};

function hidePreview() {
    const hidePrevDiv = document.getElementById('preview');
    if(hidePrevDiv.style.display === "none") {
      hidePrevDiv.style.display = "block";
    } else {
      hidePrevDiv.style.display = "none";
    }
};