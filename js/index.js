const body = document.querySelector("body");

const footer = document.createElement("footer");

body.appendChild(footer);

const today = new Date();

const thisYear = today.getFullYear();

const copyright = document.createElement("p");

copyright.innerHTML = `Joseph Peck © ${thisYear}`;

footer.appendChild(copyright);

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "DOM Manipulation",
  "Fetch API",
  "API Integration",
  "Git",
  "GitHub",
  "Responsive Web Design",
  "Debugging"
];

const skillsSection = document.querySelector("#skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");

  skill.innerText = skills[i];

  skillsList.appendChild(skill);
}

// real time date update

const relicsSection = document.querySelector("#Relics");

const liveDate = document.querySelector(".live-date");

liveDate.classList.add("live-date");

function updateLiveDate() {
  const now = new Date();

  liveDate.textContent = now.toLocaleString();

  liveDate.setAttribute("datetime", now.toISOString());
}

updateLiveDate();

setInterval(updateLiveDate, 1000);


// lesson 8 
const messageForm = document.querySelector('form[name="leave_message"]');

if (messageForm) {
  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");

    const newMessage = document.createElement("li");

    newMessage.innerHTML = `
      <a href="mailto:${usersEmail}">${usersName}</a>
      <span>${usersMessage}</span>
    `;

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function () {
      const entry = removeButton.parentNode;
      entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();
  });
}

// lesson 9 fetch api assignment

fetch("https://api.github.com/users/Joeypeck1987/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("GitHub repositories could not be loaded.");
    }

    return response.json();
  })
  .then((repositories) => {
    console.log(repositories);

    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector(".project-list");

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");

      const projectLink = document.createElement("a");

        projectLink.innerText = repositories[i].name;
        projectLink.href = repositories[i].html_url;
        projectLink.target = "_blank";
        projectLink.rel = "noopener noreferrer";

        project.appendChild(projectLink);

        projectList.appendChild(project);
    }
  })
  .catch((error) => {
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector(".project-list");

    const errorMessage = document.createElement("li");

    errorMessage.innerText = "Repositories could not be loaded. Please try again later.";

    projectList.appendChild(errorMessage);

    console.error("An error occurred:", error);
  });