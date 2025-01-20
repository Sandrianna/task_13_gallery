function showLoader() {
  console.log("showLoader");
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  console.log("hideLoader");
  document.getElementById("loader").style.display = "none";
}

function promiseHandler() {
  let randomNum = Math.random();
  return new Promise((resolve, reject) =>
    setTimeout(function () {
      if (randomNum > 0.5) {
        reject("Неудача");
      } else {
        resolve("Успех!");
      }
    }, 3000)
  );
}

const downloadButton = document.querySelector(".download");
const url = "https://dog.ceo/api/breeds/image/random/20";
const images = document.querySelector(".images");

const fetchData = async () => {
    try {
        console.log("first");
        showLoader();
        console.log("second");
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();
        
        if (!apiResponse.ok) {
            throw new Error(`Ошибка при получении данных: ${apiResponse.status}`);
        }
        console.log("third");
        images.innerHTML = "";

        data.message.forEach(imageUrl => {
          const imgElement = document.createElement("img");
          imgElement.src = imageUrl;
          imgElement.alt = "Random Dog";
          imgElement.style.width = "200px";
          imgElement.style.margin = "10px";
          images.appendChild(imgElement);
          console.log("fourth");
      });
    } catch (error) {
        console.error("Произошла ошибка:", error);
    } finally {
        hideLoader();
        console.log("fifth");
    }
};

downloadButton.addEventListener("click", async () => {
  console.log("1");
  showLoader();
  console.log("2");
  try {
      console.log("3");
      await fetchData();
      console.log("4");
  } catch (err) {
      console.log("5");
      console.error("Ошибка:", err);
  } finally {
      console.log("6");
      hideLoader();
  }
});
