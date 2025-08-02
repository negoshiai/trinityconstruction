document.addEventListener('DOMContentLoaded', function () {

    // --- Header Logic ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        header.classList.toggle('bg-white/90', isScrolled);
        header.classList.toggle('shadow-lg', isScrolled);
        header.classList.toggle('backdrop-blur-sm', isScrolled);
        header.classList.toggle('bg-transparent', !isScrolled);

        const headerLinks = header.querySelectorAll('a, button');
        headerLinks.forEach(link => {
            link.classList.toggle('text-white', !isScrolled);
            link.classList.toggle('text-gray-200', !isScrolled);
            link.classList.toggle('hover:text-white', !isScrolled);
            link.classList.toggle('text-[#2C3E50]', isScrolled);
            link.classList.toggle('text-gray-700', isScrolled);
            link.classList.toggle('hover:text-[#2C3E50]', isScrolled);
        });
    });
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.masked-text, .animated-item, .animated-section, .animated-card, .contact-card').forEach(el => {
        observer.observe(el);
    });

    // --- Data for Dynamic Sections ---
    const features = [
        { title: "Self-Performed Work", description: "We control every detail from steel framing to finishing work, ensuring real accountability and quality.", icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.23 5.72a3.375 3.375 0 00-4.773 4.773l2.472 2.472M11.42 15.17l-2.472 2.472a3.375 3.375 0 01-4.773-4.773L6.23 10.28" /></svg>` },
        { title: "Regional Strength", description: "With deep roots and licensing in WV & PA, we bring local expertise and reliability to every project.", icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5v12m3-12v12" /></svg>` },
        { title: "Mid-Sized Scale, Big Capability", description: "Our lean, hands-on team delivers the capability of a large firm with the efficiency and focus of a dedicated partner.", icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3m-15 0h15M4.5 9h15" /></svg>` },
    ];
    const services = ["General Contracting", "Design-Build", "Pre-engineered Metal Buildings", "Interior Build-Outs", "Municipal Projects", "Institutional Facilities"];
    const projects = [
        { title: "Municipal Building, WV", image: "https://placehold.co/800x600/2C3E50/FFFFFF?text=Municipal" },
        { title: "Industrial Warehouse, PA", image: "https://placehold.co/800x600/7f8c8d/FFFFFF?text=Industrial" },
        { title: "Commercial Interior Build-Out", image: "https://placehold.co/800x600/F1C40F/2C3E50?text=Commercial" }
    ];

    // --- Populate Grids ---
    const whyTrinityGrid = document.getElementById('why-trinity-grid');
    features.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'bg-gray-50 p-8 rounded-lg border border-gray-200 animated-card';
        card.innerHTML = `
            <div class="flex items-center justify-center w-16 h-16 mb-6 bg-[#F1C40F] rounded-full text-[#2C3E50]">${feature.icon}</div>
            <h3 class="text-xl font-bold text-[#2C3E50] mb-3 font-poppins">${feature.title}</h3>
            <p class="text-gray-600">${feature.description}</p>
        `;
        whyTrinityGrid.appendChild(card);
        observer.observe(card);
    });

    const servicesGrid = document.getElementById('services-grid');
    services.forEach(service => {
        const item = document.createElement('div');
        item.className = 'flex items-center space-x-3 bg-white p-4 rounded-md border border-gray-200 animated-card';
        item.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 text-[#F1C40F] flex-shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            <span class="text-gray-700">${service}</span>
        `;
        servicesGrid.appendChild(item);
        observer.observe(item);
    });

    const projectsGrid = document.getElementById('projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'group relative h-96 rounded-lg overflow-hidden shadow-lg animated-card';
        card.innerHTML = `
            <div class="overflow-hidden h-full">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
                <h3 class="text-white text-xl font-bold font-poppins">${project.title}</h3>
            </div>
        `;
        projectsGrid.appendChild(card);
        observer.observe(card);
    });
});
