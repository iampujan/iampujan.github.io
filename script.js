document.addEventListener('DOMContentLoaded', () => {

    // --- TRANSLATION DATA ---
    const translations = {
        en: {
            nav_experience: 'Experience',
            nav_projects: 'Projects',
            nav_education: 'Education',
            nav_research: 'Research',
            nav_contact: 'Contact',
            download_cv: 'Download CV',
            hero_title: 'Creative Developer & Researcher',
            hero_subtitle: 'I build beautiful, responsive web applications and conduct research in human-computer interaction. Passionate about creating technology that is both functional and delightful to use.',
            footer_text: '© 2025 Pujan Thapa. All rights reserved.',
            // Add keys for all other text elements here
        },
        it: {
            nav_experience: 'Esperienza',
            nav_projects: 'Progetti',
            nav_education: 'Formazione',
            nav_research: 'Ricerca',
            nav_contact: 'Contatti',
            download_cv: 'Scarica CV',
            hero_title: 'Sviluppatore Creativo e Ricercatore',
            hero_subtitle: 'Costruisco applicazioni web belle e reattive e conduco ricerche sull\'interazione uomo-computer. Appassionato di creare tecnologia che sia funzionale e piacevole da usare.',
            footer_text: '© 2025 Pujan Thapa. Tutti i diritti riservati.',
            // ...
        },
        ne: {
            nav_experience: 'अनुभव',
            nav_projects: 'परियोजनाहरू',
            nav_education: 'शिक्षा',
            nav_research: 'अनुसन्धान',
            nav_contact: 'सम्पर्क',
            download_cv: 'CV डाउनलोड गर्नुहोस्',
            hero_title: 'रचनात्मक विकासकर्ता र अनुसन्धानकर्ता',
            hero_subtitle: 'म सुन्दर, उत्तरदायी वेब अनुप्रयोगहरू बनाउँछु र मानव-कम्प्युटर अन्तरक्रियामा अनुसन्धान गर्छु। प्रविधि सिर्जना गर्ने बारे भावुक छु जुन कार्यात्मक र प्रयोग गर्न रमाईलो दुवै छ।',
            footer_text: '© 2025 Pujan Thapa. सबै अधिकार सुरक्षित।',
            // ...
        }
    };

    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMob = document.getElementById('theme-toggle-mob');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.removeAttribute('data-theme');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
        // Clone and replace mobile toggle to keep icons in sync
        themeToggleMob.innerHTML = themeToggle.innerHTML;
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    
    [themeToggle, themeToggleMob].forEach(btn => btn.addEventListener('click', toggleTheme));


    // --- LANGUAGE SWITCHER ---
    const languageSwitcher = document.getElementById('language-switcher');
    const languageSwitcherMob = document.getElementById('language-switcher-mob');

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update active button style
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    };
    
    const handleLanguageSwitch = (event) => {
        if (event.target.classList.contains('lang-btn')) {
            const lang = event.target.dataset.lang;
            setLanguage(lang);
        }
    };

    languageSwitcher.addEventListener('click', handleLanguageSwitch);
    languageSwitcherMob.addEventListener('click', handleLanguageSwitch);

    // Set initial language
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);


    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });


    // --- SCROLL ANIMATIONS ---
    const sections = document.querySelectorAll('.fade-in-section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
