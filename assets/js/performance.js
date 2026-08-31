export function initPerformanceEnhancements() {
  document.querySelectorAll("img:not([loading])").forEach((image) => {
    image.loading = "lazy";
    image.decoding = "async";
  });

  document.body.classList.add("loaded");
}
