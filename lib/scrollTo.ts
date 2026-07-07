// Height of the fixed navbar (h-16 = 64px). Extra breathing room below it.
const NAVBAR_HEIGHT = 64;
const SCROLL_GAP = 16;

export function scrollToSection(id: string) {
  const el = document.querySelector(id);
  if (!el) return;

  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    (NAVBAR_HEIGHT + SCROLL_GAP);

  window.scrollTo({ top, behavior: "smooth" });
}