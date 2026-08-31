export function initProjectFilters() {
  const filters = [...document.querySelectorAll("[data-project-filter]")];
  const cards = [...document.querySelectorAll("[data-project-category]")];
  const status = document.querySelector("#project-filter-status");

  if (!filters.length || !cards.length) {
    return;
  }

  const applyFilter = (selectedFilter) => {
    const selectedCategory = selectedFilter.dataset.projectFilter;
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = card.dataset.projectCategory
        .split(/\s+/)
        .filter(Boolean);
      const shouldShow =
        selectedCategory === "all" || categories.includes(selectedCategory);
      card.hidden = !shouldShow;
      visibleCount += Number(shouldShow);
    });

    filters.forEach((filter) => {
      const isSelected = filter === selectedFilter;
      filter.classList.toggle("is-active", isSelected);
      filter.setAttribute("aria-pressed", String(isSelected));
    });

    if (status) {
      const label = selectedFilter.textContent.trim();
      status.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown for ${label}.`;
    }
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => applyFilter(filter));
    filter.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      const currentIndex = filters.indexOf(filter);
      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? filters.length - 1
            : (currentIndex +
                (event.key === "ArrowRight" ? 1 : -1) +
                filters.length) %
              filters.length;

      filters[nextIndex].focus();
      applyFilter(filters[nextIndex]);
    });
  });

  applyFilter(
    filters.find((filter) => filter.classList.contains("is-active")) ??
      filters[0],
  );
}
