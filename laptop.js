document.addEventListener("DOMContentLoaded", function () {
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
const dropBtn = dropdown.querySelector(".dropbtn");
const dropdownContent = dropdown.querySelector(".dropdown-content");

dropBtn.addEventListener("click", function (event) {
event.stopPropagation();

dropdowns.forEach(d => {
if (d !== dropdown) {
    d.querySelector(".dropdown-content").classList.remove("show");
}
});

dropdownContent.classList.toggle("show");
});
});

document.addEventListener("click", function () {
dropdowns.forEach(dropdown => {
dropdown.querySelector(".dropdown-content").classList.remove("show");
});
});
});

const minSlider = document.getElementById("minPrice");
const maxSlider = document.getElementById("maxPrice");
const minLabel = document.getElementById("minPriceLabel");
const maxLabel = document.getElementById("maxPriceLabel");
const applyBtn = document.getElementById("applyPrice");

function updatePriceLabels() {
let minVal = parseInt(minSlider.value);
let maxVal = parseInt(maxSlider.value);

if (minVal > maxVal - 1000) {
minVal = maxVal - 1000;
minSlider.value = minVal;
}
if (maxVal < minVal + 1000) {
maxVal = minVal + 1000;
maxSlider.value = maxVal;
}

minLabel.vale = minVal;
maxLabel.vale = maxVal;
}

minSlider.addEventListener("input", updatePriceLabels);
maxSlider.addEventListener("input", updatePriceLabels);

applyBtn.addEventListener("click", () => {
const selectedBrands = [...document.querySelectorAll("input[name='brand']:checked")].map(el => el.value);
const selectedSizes = [...document.querySelectorAll("input[name='size']:checked")].map(el => el.value);
const selectedDiscounts = [...document.querySelectorAll("input[name='discount']:checked")].map(el => parseInt(el.value));
const minPrice = parseInt(minSlider.value);
const maxPrice = parseInt(maxSlider.value);

console.log("Filters applied:");
console.log("Brands:", selectedBrands);
console.log("Sizes:", selectedSizes);
console.log("Discounts:", selectedDiscounts);
console.log("Price range: ₦" + minPrice + " - ₦" + maxPrice);

});

updatePriceLabels();

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector("button.dropbtn, label.dropbtn");

    if (trigger && trigger.classList.contains("dropbtn-2")) {
      return;
    }

    if (trigger && !trigger.querySelector(".caret")) {
      const caret = document.createElement("span");
      caret.classList.add("caret");
      trigger.appendChild(caret);
    }

    const content = dropdown.querySelector(".dropdown-content");

    if (trigger) {
      trigger.addEventListener("click", function (event) {
        event.stopPropagation();

        const isActive = dropdown.classList.contains("active");

        dropdowns.forEach(d => {
          d.classList.remove("active");
          const otherContent = d.querySelector(".dropdown-content");
          if (otherContent) otherContent.classList.remove("show");
        });

        if (!isActive) {
          dropdown.classList.add("active");
          if (content) {
            content.classList.add("show");
          }
        }
      });
    }
  });

  document.addEventListener("click", function () {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("active");
      const content = dropdown.querySelector(".dropdown-content");
      if (content) content.classList.remove("show");
    });
  });
});

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById("productsContainer");

    products.forEach(p => {

      const newPrice = parseInt(p.price.replace(/[^\d]/g, ""));
      const oldPrice = parseInt(p.oldPrice.replace(/[^\d]/g, ""));

      const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

      const article = `
        <a href="index.html" style="text-decoration: none;">
          <article class="product-container">
            <div class="image-wrapper">
              <img src="${p.image}" alt="">
              <svg class="corner-icon" style="color: #f68b1e;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84Zm-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"/>
              </svg>
            </div>
            <div class="product-info">
              <h3>${p.title}</h3>
              <div class="prc">${p.price}</div>
              <div class="prm">
                <div class="old">${p.oldPrice}</div>
                <div class="off">-${discount}%</div>
              </div>
              <p class="product-desc" data-price="${p.price}">${p.offers}</p>
              <button class="spon">Sponsored
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="-2 -2 24 24">
                  <path fill="currentColor" d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2a1 1 0 0 1 0 2z"/>
                </svg>
              </button>
            </div>
            <button class="add-to-cart">Add to cart</button>
          </article>
        </a>
      `;
      container.innerHTML += article;
    });
  })
.catch(error => console.error('Error loading products:', error));

fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const container = document.querySelector('#recentsContainer');

    const shuffled = products.sort(() => Math.random() - 0.5);

    const randomFour = shuffled.slice(0, 4);

    randomFour.forEach(product => {
      const article = document.createElement('article');
      article.classList.add('recent-container');

      article.innerHTML = `
        <div class="image-wrapper">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <div class="prc">${product.price}</div>
        </div>
      `;

      const link = document.createElement('a');
      link.href = 'index.html';
      link.style.textDecoration = 'none';
      link.appendChild(article);

      container.appendChild(link);
    });
  })
  .catch(err => console.error('Error loading products:', err));


  const userDisplay = document.querySelector('#user-display');
const savedEmail = localStorage.getItem('userEmail');

if (savedEmail) {
    // This takes the part before the "@" to make it look like a username
    const username = savedEmail.split('@')[0];
    userDisplay.textContent = `Hi, ${username}  |`;
}

