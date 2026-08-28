// Smooth navigation
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

// Simple reveal animation
const cards = document.querySelectorAll(".skill-card, .project-card");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    {
        threshold: 0.15
    }
);

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease";

    observer.observe(card);
});

// Current year in footer
const yearElement = document.querySelector("footer p");

if (yearElement) {
    const year = new Date().getFullYear();
    yearElement.innerHTML =
        `© ${year} Santosh Kumar Yadav. Built with HTML & CSS.`;
}
