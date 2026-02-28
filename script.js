/* ===================================
   PRESEC LEGON SRC WEBSITE JAVASCRIPT
=================================== */


/* ===================================
   MOBILE MENU TOGGLE
=================================== */
document.addEventListener('DOMContentLoaded', function () {

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileNav.classList.toggle('active');
            const menuIcon = this.querySelector('.menu-icon');
            menuIcon.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
        });
    }
});


/* ===================================
   IMAGE SLIDER FUNCTIONALITY
=================================== */
let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {

    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    if (!slides.length) return;

    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    slides.forEach(slide => slide.classList.remove('active'));

    if (indicators.length) {
        indicators.forEach(indicator => indicator.classList.remove('active'));
    }

    slides[currentSlideIndex].classList.add('active');

    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetSlideInterval();
}

function goToSlide(index) {
    showSlide(index);
    resetSlideInterval();
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000);
}

if (document.querySelector('.slider-container')) {
    slideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 5000);
}


/* ===================================
   CONTACT FORM HANDLING
=================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {

        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';

        contactForm.reset();

        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}



let userSelections = {};


/* ===================================
   INITIALIZE VOTE PAGE
=================================== */

function initVotePage() {
    const voteMain = document.getElementById('voteMain');
    if (!voteMain) return;

    const hasVoted = localStorage.getItem('hasVoted');

    if (hasVoted === "true") {
        renderSuccessPage();
    } else {
        renderVotingPage();
    }
}


/* ===================================
   LOAD VOTE PAGE ONLY ON vote.html
=================================== */
if (window.location.pathname.includes("vote.html")) {
    document.addEventListener("DOMContentLoaded", initVotePage);
}
/* =================================== PRESEC LEGON SRC WEBSITE JAVASCRIPT =================================== */

/* ... all your previous code ... */

/* ========================================= VOTE PAGE SCRIPT (SAFE ADD) ========================================= */
document.addEventListener("DOMContentLoaded", function () {
  // Only run this if we're on vote.html
  const voteMain = document.getElementById("voteMain");
  if (!voteMain) return;

  const positions = [
    { title: "Face of Presec", candidates: [
        { name: "Asempa-Antwi Papa Yaw Eyome - PS001", img: "images/Asempa-Antwi Papa Yaw Eyome.JPG" },
        { name: "Saforo Richard - PS002", img: "images/IMG_9075.JPG" }
      ]
    },
    { title: "Best Businessman", candidates: [
        { name: "Eshun Nhyiraba (Underated Deals) - PS003", img: "images/underated.png" },
        { name: "Boakye Henry (BTR) - PS004", img: "images/black boy.png" }
      ]
    },
    { title: "Most Photogenic", candidates: [
        { name: "Kelvin Boateng - PS005", img: "images/kaydee.png" },
        { name: "Armah Asamoah Nana Kwesi - PS006", img: "images/k1.png" }
      ]
    },
    { title: "Artiste of the Year", candidates: [
        { name: "Akuffo William Aguair (WILLISRAPS) - PS007", img: "images/willis.png" },
        { name: "Boakye Henry (BLACKBOY) - PS008", img: "images/black boy.png" }
      ]
    },
    { title: "Nickname of the Year", candidates: [
        { name: "BULLET (Marvin Foli)", img: "images/bullet.png" },
        { name: "FUTURE (Lil Nana Bekoe)", img: "images/future.png" }
      ]
    }
  ];

  const selectedVotes = {};

  positions.forEach(position => {
    const positionCard = document.createElement("div");
    positionCard.className = "position-card";

    const title = document.createElement("h2");
    title.textContent = position.title;
    positionCard.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "candidate-grid";

    position.candidates.forEach(candidate => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${candidate.img}" alt="${candidate.name}"> <p>${candidate.name}</p>`;
      card.addEventListener("click", () => {
        grid.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedVotes[position.title] = candidate.name;
      });
      grid.appendChild(card);
    });

    positionCard.appendChild(grid);
    voteMain.appendChild(positionCard);
  });

  // Submit Button
  const submitSection = document.createElement("div");
  submitSection.className = "submit-section";

  const submitBtn = document.createElement("button");
  submitBtn.className = "submit-btn";
  submitBtn.textContent = "Submit Votes";
  

  // ----------------- DISABLE BUTTON LOGIC -----------------
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // prevents any accidental action
    alert("Voting is disabled. Pay to Vote"); // optional message
  });
  // --------------------------------------------------------

  submitSection.appendChild(submitBtn);
  voteMain.appendChild(submitSection);
});