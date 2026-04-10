document.addEventListener("DOMContentLoaded", () => {
  fetch(`${window.APP_CONFIG.API_BASE_URL}/courses/`)
    .then(res => {
      if (!res.ok) throw new Error("API error");
      return res.json();
    })
    .then(data => {
      const courses = data.courses;
      const container = document.getElementById("courses-container");
      const filter = document.getElementById("course-filter");

      // Render courses
      // <img src="${window.APP_CONFIG.API_BASE_URL}${course.image}" class="img-fluid w-100" alt="${course.title}">
      const renderCourses = (list) => {
        container.innerHTML = "";
        list.forEach(course => {
          container.innerHTML += `
            <div class="col-lg-4 col-md-6">
              <div class="course-item h-100 d-flex flex-column shadow-sm rounded-4 overflow-hidden">

                <img src="${course.image}" class="img-fluid w-100" alt="${course.title}">

                <div class="course-content p-4 d-flex flex-column flex-grow-1">

                  <div class="mb-3">
                    <span class="badge category-badge">${course.category}</span>
                  </div>

                  <h3 class="fs-5 fw-semibold mb-2">
                    ${course.title}
                  </h3>

                  <p class="text-muted small mb-4 flex-grow-1">
                    ${course.description.substring(0, 120)}...
                  </p>

                  <a href="course-details.html?id=${course.id}"
                     class="btn btn-outline-primary btn-sm w-100 mt-auto">
                    View More
                  </a>

                </div>
              </div>
            </div>
          `;
        });
      };

      // Populate filter
      const categories = [...new Set(courses.map(c => c.category))];
      categories.forEach(cat => {
        filter.innerHTML += `<option value="${cat}">${cat}</option>`;
      });

      // Initial render
      renderCourses(courses);

      // Filter change
      filter.addEventListener("change", () => {
        const value = filter.value;
        value === "all"
          ? renderCourses(courses)
          : renderCourses(courses.filter(c => c.category === value));
      });
    })
    .catch(err => {
      console.error("Fetch error:", err);
      document.getElementById("courses-container").innerHTML =
        "<p class='text-center'>Unable to load courses</p>";
    });
});
