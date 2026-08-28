// =====================================================
// Smooth navigation
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// =====================================================
// Backend API Configuration
// =====================================================

const API_BASE_URL = "https://personal-portfolio-n24b.onrender.com";


// =====================================================
// Load Projects from FastAPI Backend
// =====================================================

async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        const projectsContainer = document.querySelector(".projects-grid");

        if (!projectsContainer || !data.projects) {
            return;
        }

        projectsContainer.innerHTML = "";

        data.projects.forEach(project => {
            const projectCard = document.createElement("div");

            projectCard.className = "project-card";

            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            `;

            projectsContainer.appendChild(projectCard);
        });

        // Apply reveal animation to newly loaded project cards
        initializeCardAnimations();

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}


// =====================================================
// Contact Form
// =====================================================

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();
        const formStatus = document.querySelector("#formStatus");

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        formStatus.textContent = "Sending message...";

        try {

            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to send message");
            }

            formStatus.textContent =
                "Message sent successfully 🚀";

            contactForm.reset();

        } catch (error) {

            console.error("Contact form error:", error);

            formStatus.textContent =
                "Unable to send message. Please try again.";
        }
    });
}


// =====================================================
// Card Reveal Animation
// =====================================================

function initializeCardAnimations() {

    const cards = document.querySelectorAll(
        ".skill-card, .project-card"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(20px)";

        card.style.transition =
            "all 0.6s ease";

        observer.observe(card);
    });
}


// =====================================================
// Current Year in Footer
// =====================================================

const yearElement = document.querySelector("footer p");

if (yearElement) {

    const year = new Date().getFullYear();

    yearElement.innerHTML =
        `© ${year} Santosh Kumar Yadav. Built with HTML & CSS.`;
}


// =====================================================
// Initialize Portfolio
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});
