var urlParams = new URLSearchParams(window.location.search);
var courseId = urlParams.get('course');

let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = 'block';
  dots[slideIndex-1].className += " active";
}

fetch("https://salma-eletreby.github.io/Etmahy/files/json/"+courseId.split(/\d/)[0]+".json")
.then((response) => response.json())
.then((data) => {
    course = data.find(c => c.id == courseId);

    document.getElementById("title").textContent = `${course.name}`;
    document.getElementById("shortDesc").textContent = `${course.short_description}`;

    const videos = `
    <h3>Course Description</h3>
    <p>${course.long_description}</p>
    <br>
    <h3>Lectures</h3>
    <div class="slideshow-container">
  <div class="mySlides fade">
    <div class="numbertext">1 / 2</div>
    ${course.videos[0].code}
  </div>

  <div class="mySlides fade">
    <div class="numbertext">2 / 2</div>
    ${course.videos[1].code}
  </div>


  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<!-- The dots/circles -->
<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
</div>

<div id="warning">
<p>Please note that the rights of these videos belong to their respective owner</p>
</div>
    `

    document.getElementById('sched-Area').innerHTML = videos
    showSlides(slideIndex);
})
.catch((error) => {
  console.error("Error:", error);
});

