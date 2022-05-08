function hide() {
    const hideDiv = document.getElementById('hide');
    
    if(hideDiv.style.display === "none") {
      hideDiv.style.display = "block";
    } else {
      hideDiv.style.display = "none";
    }
};