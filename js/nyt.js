/* script.js */
// NYT API key
const apiKey = "YEtmDbZwIW8CHuWSwTKaRsRHZWVEfbe8";

// DOM elements
const sectionSelect = document.querySelector("#section-select");
const refreshButton = document.querySelector("#refresh-button");
const storiesContainer = document.querySelector("#stories-container");

// Load stories on page load
window.addEventListener("load", () => {
  loadStories(sectionSelect.value);
});

// Load stories when section is changed
sectionSelect.addEventListener("change", () => {
  loadStories(sectionSelect.value);
});

// Load stories when refresh button is clicked
refreshButton.addEventListener("click", () => {
  loadStories(sectionSelect.value);
});

// Adds time and date to the page
function updateTimeAndDate() {
    const dateToday = document.querySelector("#dateToday");
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
    const date = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    dateToday.innerText = "Today's Paper" + `\n${date} - ${time}`;
}
// update the time every second
updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);

// Load stories from API
function loadStories(section) {
  fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Clear stories container
      storiesContainer.innerHTML = "";
      // Display stories
      data.results.forEach(story => {
        const storyCard = document.createElement("div");
        storyCard.classList.add("card");

        // display the image, the content, title, writer etc..
        const storyImage = document.createElement("img");
        storyImage.src = story.multimedia[0].url;
        storyImage.alt = story.multimedia[0].caption.slice(0, 15) + "...";

        const storyContent = document.createElement("div");
        storyContent.classList.add("card-content");

        const storySection = document.createElement("h2");
        storySection.textContent = story.section;
        storySection.classList.add("card-section");

        const storyTitle = document.createElement("a");
        storyTitle.href = story.url;
        storyTitle.textContent = story.title;
        storyTitle.classList.add("card-title");

        const storyAbstract = document.createElement("p");
        storyAbstract.textContent = story.abstract;
        storyAbstract.classList.add("card-abstract");

        const storyByline = document.createElement("p");
        storyByline.textContent = story.byline;
        storyByline.classList.add("card-byline");

        const storyDate = document.createElement("p");
        storyDate.textContent = new Date(story.published_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        storyDate.classList.add("card-date");

        storyContent.appendChild(storyTitle);
        storyContent.appendChild(storySection);
        storyContent.appendChild(storyAbstract);
        storyContent.appendChild(storyByline);
        storyContent.appendChild(storyDate);

        storyCard.appendChild(storyImage);
        storyCard.appendChild(storyContent);

        storiesContainer.appendChild(storyCard);
      });
    })
    .catch(error => console.error(error));
}