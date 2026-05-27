const body = document.querySelector("body");

const footer = document.createElement("footer");

body.appendChild(footer);

const today = new Date();

const thisYear = today.getFullYear();

const copyright = document.createElement("p");

copyright.innerHTML = `Joseph Peck © ${thisYear}`;

footer.appendChild(copyright);

const skills = [
  "HTML structure",
  "CSS layout and atmosphere",
  "JavaScript fundamentals",
  "Git and GitHub workflow",
  "Song and lyric",
  "Visual world-building"
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