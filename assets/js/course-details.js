const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

if (!courseId) {
  document.querySelector(".container").innerHTML =
    "<h3>Invalid course</h3>";
  throw new Error("No course ID");
}

fetch(`${window.APP_CONFIG.API_BASE_URL}/course/${courseId}/`)
  .then(res => {
    if (!res.ok) throw new Error("Course not found");
    return res.json();
  })
  .then(course => {

    document.getElementById("course-image").src = course.image;
    document.getElementById("course-image").alt = course.title;
    document.getElementById("course-title").innerText = course.title;
    document.getElementById("course-description").innerText = course.description;
    document.getElementById("course-category").innerText = course.category;

    document.getElementById("enquirySubject").value = course.title

    document.getElementById("course-image").src = course.image
    // `{course.image}`;


    const pointsList = document.getElementById("course-points");
    pointsList.innerHTML = "";

    if (course.points?.length) {
      course.points.forEach(point => {
        const li = document.createElement("li");
        li.innerHTML = `
          <i class="bi bi-check-circle-fill"></i>
          <span>${point}</span>
        `;
        pointsList.appendChild(li);
      });
    }
  })
  .catch(err => {
    console.error(err);
    document.querySelector(".container").innerHTML =
      "<h3>Course not found</h3>";
  });

