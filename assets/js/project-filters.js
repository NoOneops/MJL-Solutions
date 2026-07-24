const projectFilters = [...document.querySelectorAll('[data-project-filter]')];
const projectCards = [...document.querySelectorAll('[data-project-category]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeCategory = projectFilters.find((filter) => filter.classList.contains('is-active'))?.dataset.projectFilter;

const showCategory = (selectedCategory) => {
    projectCards.forEach((card) => {
        card.hidden = card.dataset.projectCategory !== selectedCategory;
    });
};

const updateActiveFilter = (selectedFilter) => {
    projectFilters.forEach((filter) => {
        const isSelected = filter === selectedFilter;

        filter.classList.toggle('is-active', isSelected);
        filter.setAttribute('aria-pressed', String(isSelected));
    });
};

showCategory(activeCategory);

projectFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
        const selectedCategory = filter.dataset.projectFilter;

        if (selectedCategory === activeCategory) {
            return;
        }

        const outgoingCards = projectCards.filter((card) => !card.hidden);
        const incomingCards = projectCards.filter((card) => card.dataset.projectCategory === selectedCategory);

        updateActiveFilter(filter);
        activeCategory = selectedCategory;

        if (reducedMotion || !window.gsap) {
            showCategory(selectedCategory);
            return;
        }

        window.gsap.to(outgoingCards, {
            opacity: 0,
            y: -18,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                outgoingCards.forEach((card) => {
                    card.hidden = true;
                });

                window.gsap.set(outgoingCards, { clearProps: 'opacity,transform' });

                incomingCards.forEach((card) => {
                    card.hidden = false;
                });

                window.gsap.fromTo(
                    incomingCards,
                    { opacity: 0, y: 26 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power3.out',
                        clearProps: 'opacity,transform'
                    }
                );
            }
        });
    });
});
