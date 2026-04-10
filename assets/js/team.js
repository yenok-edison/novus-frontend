document.addEventListener("DOMContentLoaded", () => {
  fetch(`${window.APP_CONFIG.API_BASE_URL}/api/members/`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load team");
      return res.json();
    })
    .then(members => {
      const container = document.getElementById("team-container");
      container.innerHTML = "";

      members.forEach((member, index) => {
        const isReverse = index % 2 !== 0 ? "reverse" : "";

        // src="${window.APP_CONFIG.API_BASE_URL}${member.image}"
        const teamHTML = `
          <div class="team-row ${isReverse}" data-aos="fade-up">
            <div class="team-img">
              <img
                src="${member.image}"
                alt="${member.name}"
                loading="lazy"
              >
            </div>

            <div class="team-content">
              <h3>${member.name}</h3>
              <p>${member.description}</p>
            </div>
          </div>
        `;

        container.insertAdjacentHTML("beforeend", teamHTML);
      });
    })
    .catch(err => console.error("Team load error:", err));
});

