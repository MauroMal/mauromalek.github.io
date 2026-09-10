const progress = document.querySelector(".reading-progress");
const navigation = [...document.querySelectorAll("nav a")];
const sections = navigation.map((link) => document.querySelector(link.hash));
let scheduled = false;

function updateScroll() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? scrollY / distance : 0})`;
  let current = null;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 180) current = section.id;
  });
  navigation.forEach((link) => {
    if (link.hash === `#${current}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scheduled = false;
}
function requestUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateScroll);
  }
}
addEventListener("scroll", requestUpdate, { passive: true });
addEventListener("resize", requestUpdate);
addEventListener("load", requestUpdate);
updateScroll();
document.querySelector("#year").textContent = new Date().getFullYear();

if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("will-reveal");
    observer.observe(element);
  });
}
