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
            education_title: 'Education',
            ms_degree_date: '2023 - 2025',
            ms_degree_title: 'M.S. in Data Science',
            ms_degree_uni: 'University of Naples Federico II, Italy',
            ms_degree_desc: 'Specialized in Computer Vision and NLP. Thesis on "Computer Vision for Autonomous Driving".',
            bs_degree_date: '2015 - 2019',
            bs_degree_title: 'B.S. in Computer Science and Information Technology',
            bs_degree_uni: 'Tribhuvan University, Nepal',
            experience_title: 'Work Experience',
            omdena_date: 'May 2024 - July 2024',
            omdena_title: 'ML Engineer, Omdena',
            omdena_desc: 'Researched and developed solution during the timeframe of 8 weeks for Omdena Challenge from the data collection phase using Google Earth Engine, exploratory data analysis, model development using both supervised and unsupervised learning and model deployment in Streamlit Community Cloud.',
            leapfrog_date: 'Dec 2020 - Aug 2023',
            leapfrog_title: 'Software Engineer, Leapfrog Technology',
            leapfrog_desc: 'Designed and deployed scalable Python-based ML, data engineering, and backend systems using AWS, Airflow, Docker, and CI/CD, with robust monitoring and automation. Optimized data pipelines, re-architected workflows, and improved test coverage with pytest, Selenium, and JMeter.',
            parentiv_date: 'May 2018 - Aug 2018',
            parentiv_title: 'Software Engineer, Parentiv Inc.',
            parentiv_desc: 'Researched and developed the Parentiv app’s backend architecture with Python (FastAPI), Google Cloud Firestore, and App Engine, integrating data from devices like Apple Watch and Google Home. Implemented NLP preprocessing with NLTK and spaCy, and ensured quality through unit and regression testing using pytest and JMeter.',
            projects_title: 'My Projects',
            project1_title: 'CREA3 (In Progress)',
            project1_desc: 'CREA3 stands for Conflict Resolution with Equitative Algorithms funded by the European Union (EU) in collaboration with University of Naples Federico II and other companies and universities.The CREA3 Project aims to modernize civil law procedures throughout the European Union, enabling citizens, legal professionals, judicial authorities, and, in particular, vulnerable users to achieve swifter, fairer, and non-discriminatory access to justice. Its strategic vision aims to augment the performances of its predecessors, CRE and CREA2, seamlessly introducing electronic signatures, authenticated videoconferences with automated evidentiary logging, and third, providing inclusive access measures that support individuals with limited digital literacy and cognitive capabilities.',
            project_demo: 'Live Demo',
            project_source: 'Source',
            project2_title: 'Plant Disease Detection',
            project2_desc: 'Developed a plant disease detection system using image analysis. Leveraged YOLO for object detection, alongside techniques like Non-negative Matrix Factorization (NMF) and Fuzzy Clustering for feature extraction and classification.',
            project3_title: 'Political Leaning Detection in News',
            project3_desc: 'Developed a web application to classify news articles as left-leaning, centrist, or right-leaning using fine-tuned BERT models. Enhanced model efficiency through quantization and Low-Rank Adaptation (LoRA). Deployed the solution using React JS, FastAPI and Docker, hosted on Azure Container Apps for real-time predictions, supporting media bias detection and analysis.',
            research_title: 'Research & Publications',
            research1_title: 'In Progress',
            interests_title: 'Interests & Pursuits',
            work_interests_title: 'Work Interests',
            work_interests_desc: 'Design Systems, AI/ML Architecture, Developer Tooling, Web Performance, and creating accessible digital experiences.',
            research_interests_title: 'Research Interests',
            research_interests_desc: 'Human-Computer Interaction, 3D/4D Computer Vision, Information Visualization, and the societal impact of technology.',
            personal_interests_title: 'Personal Interests',
            personal_interest1: 'Traveling',
            personal_interest2: 'Hiking/Trekking',
            personal_interest3: 'Bike Rides',
            personal_interest4: 'Gaming',
            personal_interest5: 'Cycling',
            contact_title: 'Get In Touch',
            contact_desc: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out.",
            contact_button: 'Say Hello',
            footer_text: '© 2025 Pujan Thapa. All rights reserved.',
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
            education_title: 'Formazione',
            ms_degree_date: '2023 - 2025',
            ms_degree_title: 'Laurea Magistrale in Scienza dei Dati',
            ms_degree_uni: 'Università degli Studi di Napoli Federico II, Italia',
            ms_degree_desc: 'Specializzazione in Computer Vision e NLP. Tesi su "Computer Vision per la Guida Autonoma".',
            bs_degree_date: '2015 - 2019',
            bs_degree_title: 'Laurea in Informatica e Tecnologie dell\'Informazione',
            bs_degree_uni: 'Università Tribhuvan, Nepal',
            experience_title: 'Esperienza Lavorativa',
            omdena_date: 'Maggio 2024 - Luglio 2024',
            omdena_title: 'Ingegnere ML, Omdena',
            omdena_desc: 'Ricerca e sviluppo di una soluzione in 8 settimane per la Sfida Omdena, dalla raccolta dati con Google Earth Engine, all\'analisi esplorativa, allo sviluppo di modelli con apprendimento supervisionato e non, fino al deployment su Streamlit Community Cloud.',
            leapfrog_date: 'Dic 2020 - Ago 2023',
            leapfrog_title: 'Ingegnere del Software, Leapfrog Technology',
            leapfrog_desc: 'Progettazione e deployment di sistemi ML scalabili basati su Python, ingegneria dei dati e sistemi backend utilizzando AWS, Airflow, Docker e CI/CD, con monitoraggio e automazione robusti. Ottimizzazione delle pipeline di dati, riarchitettura dei flussi di lavoro e miglioramento della copertura dei test con pytest, Selenium e JMeter.',
            parentiv_date: 'Maggio 2018 - Ago 2018',
            parentiv_title: 'Ingegnere del Software, Parentiv Inc.',
            parentiv_desc: 'Ricerca e sviluppo dell\'architettura backend dell\'app Parentiv con Python (FastAPI), Google Cloud Firestore e App Engine, integrando dati da dispositivi come Apple Watch e Google Home. Implementazione del pre-elaborazione NLP con NLTK e spaCy e garanzia di qualità tramite test unitari e di regressione con pytest e JMeter.',
            projects_title: 'I Miei Progetti',
            project1_title: 'CREA3 (In corso)',
            project1_desc: 'CREA3 (Conflict Resolution with Equitative Algorithms) è un progetto finanziato dall\'Unione Europea (UE) in collaborazione con l\'Università di Napoli Federico II e altre aziende e università. Il Progetto CREA3 mira a modernizzare le procedure di diritto civile in tutta l\'Unione Europea, consentendo a cittadini, professionisti legali, autorità giudiziarie e, in particolare, utenti vulnerabili di ottenere un accesso alla giustizia più rapido, equo e non discriminatorio. La sua visione strategica mira ad aumentare le prestazioni dei suoi predecessori, CRE e CREA2, introducendo senza soluzione di continuità firme elettroniche, videoconferenze autenticate con registrazione probatoria automatizzata e, in terzo luogo, fornendo misure di accesso inclusivo che supportano le persone con limitate competenze digitali e capacità cognitive.',
            project_demo: 'Demo Live',
            project_source: 'Codice Sorgente',
            project2_title: 'Rilevamento Malattie delle Piante',
            project2_desc: 'Sviluppato un sistema di rilevamento delle malattie delle piante tramite analisi di immagini. Utilizzato YOLO per il rilevamento di oggetti, insieme a tecniche come la Fattorizzazione Matriciale Non-negativa (NMF) e il Clustering Fuzzy per l\'estrazione e la classificazione delle caratteristiche.',
            project3_title: 'Rilevamento dell\'Orientamento Politico nelle Notizie',
            project3_desc: 'Sviluppata un\'applicazione web per classificare gli articoli di notizie come di sinistra, centristi o di destra utilizzando modelli BERT affinati. Migliorata l\'efficienza del modello tramite quantizzazione e Low-Rank Adaptation (LoRA). Distribuita la soluzione utilizzando React JS, FastAPI e Docker, ospitata su Azure Container Apps per previsioni in tempo reale, supportando il rilevamento e l\'analisi del bias mediatico.',
            research_title: 'Ricerca e Pubblicazioni',
            research1_title: 'In corso',
            interests_title: 'Interessi e Passioni',
            work_interests_title: 'Interessi Lavorativi',
            work_interests_desc: 'Sistemi di Design, Architettura AI/ML, Strumenti per Sviluppatori, Prestazioni Web e creazione di esperienze digitali accessibili.',
            research_interests_title: 'Interessi di Ricerca',
            research_interests_desc: 'Interazione Uomo-Computer, Visione Artificiale 3D/4D, Visualizzazione delle Informazioni e impatto sociale della tecnologia.',
            personal_interests_title: 'Interessi Personali',
            personal_interest1: 'Viaggiare',
            personal_interest2: 'Escursionismo/Trekking',
            personal_interest3: 'Giri in Moto',
            personal_interest4: 'Videogiochi',
            personal_interest5: 'Ciclismo',
            contact_title: 'Contattami',
            contact_desc: 'Sono sempre aperto a discutere di nuovi progetti, idee creative o opportunità per far parte di una visione ambiziosa. Non esitare a contattarmi.',
            contact_button: 'Saluta',
            footer_text: '© 2025 Pujan Thapa. Tutti i diritti riservati.',
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
            education_title: 'शिक्षा',
            ms_degree_date: '२०२३ - २०२५',
            ms_degree_title: 'डाटा विज्ञानमा एम.एस.',
            ms_degree_uni: 'नेपल्स फेडेरिको II विश्वविद्यालय, इटाली',
            ms_degree_desc: 'कम्प्युटर भिजन र एनएलपीमा विशेषज्ञता। "स्वायत्त ड्राइभिङका लागि कम्प्युटर भिजन" मा थीसिस।',
            bs_degree_date: '२०१५ - २०१९',
            bs_degree_title: 'कम्प्युटर विज्ञान र सूचना प्रविधिमा बी.एस.',
            bs_degree_uni: 'त्रिभुवन विश्वविद्यालय, नेपाल',
            experience_title: 'कार्य अनुभव',
            omdena_date: 'मे २०२४ - जुलाई २०२४',
            omdena_title: 'एमएल इन्जिनियर, ओमडेना',
            omdena_desc: 'गुगल अर्थ इन्जिन प्रयोग गरी डाटा सङ्कलन चरणबाट, अन्वेषण डेटा विश्लेषण, पर्यवेक्षित र अपर्यवेक्षित शिक्षा दुवै प्रयोग गरी मोडेल विकास र स्ट्रिमलिट सामुदायिक क्लाउडमा मोडेल डिप्लोइमेन्टसम्म ८ हप्ताको समयसीमामा ओमडेना चुनौतीको लागि समाधानको अनुसन्धान र विकास गरियो।',
            leapfrog_date: 'डिसेम्बर २०२० - अगस्ट २०२३',
            leapfrog_title: 'सफ्टवेयर इन्जिनियर, लिपफ्रग टेक्नोलोजी',
            leapfrog_desc: 'AWS, Airflow, Docker, र CI/CD प्रयोग गरी मापनयोग्य Python-आधारित ML, डाटा इन्जिनियरिङ, र ब्याकइन्ड प्रणालीहरू डिजाइन र डिप्लोइ गरियो, जसमा बलियो निगरानी र स्वचालन छ। डाटा पाइपलाइनहरूलाई अनुकूलित गरियो, कार्यप्रवाहहरूलाई पुन: वास्तुकला गरियो, र pytest, Selenium, र JMeter मार्फत परीक्षण कभरेज सुधार गरियो।',
            parentiv_date: 'मे २०१८ - अगस्ट २०१८',
            parentiv_title: 'सफ्टवेयर इन्जिनियर, पेरेन्टिभ इंक.',
            parentiv_desc: 'Apple Watch र Google Home जस्ता उपकरणहरूबाट डाटा एकीकृत गर्दै Python (FastAPI), Google Cloud Firestore, र App Engine मार्फत Parentiv एपको ब्याकइन्ड वास्तुकलाको अनुसन्धान र विकास गरियो। NLTK र spaCy मार्फत NLP पूर्वप्रशोधन लागू गरियो, र pytest र JMeter प्रयोग गरी एकाइ र रिग्रेसन परीक्षण मार्फत गुणस्तर सुनिश्चित गरियो।',
            projects_title: 'मेरा परियोजनाहरू',
            project1_title: 'CREA3 (प्रगतिमा)',
            project1_desc: 'CREA3 को अर्थ युरोपेली संघ (EU) द्वारा नेपल्स फेडेरिको II विश्वविद्यालय र अन्य कम्पनीहरू र विश्वविद्यालयहरूसँगको सहकार्यमा वित्त पोषित समानतामूलक एल्गोरिदमहरूसँग द्वन्द्व समाधान हो। CREA3 परियोजनाले युरोपेली संघभरि नागरिक कानून प्रक्रियाहरूलाई आधुनिकीकरण गर्ने लक्ष्य राखेको छ, जसले नागरिकहरू, कानुनी पेशेवरहरू, न्यायिक अधिकारीहरू, र विशेष गरी, कमजोर प्रयोगकर्ताहरूलाई न्यायमा छिटो, निष्पक्ष, र गैर-भेदभावपूर्ण पहुँच प्राप्त गर्न सक्षम बनाउँछ। यसको रणनीतिक दृष्टिकोणले यसको पूर्ववर्तीहरू, CRE र CREA2 को प्रदर्शनलाई बढाउने लक्ष्य राखेको छ, निर्बाध रूपमा इलेक्ट्रोनिक हस्ताक्षरहरू, स्वचालित प्रमाणिक लगिङको साथ प्रमाणित भिडियो कन्फरेन्सहरू, र तेस्रो, सीमित डिजिटल साक्षरता र संज्ञानात्मक क्षमता भएका व्यक्तिहरूलाई समर्थन गर्ने समावेशी पहुँच उपायहरू प्रदान गर्दै।',
            project_demo: 'प्रत्यक्ष डेमो',
            project_source: 'स्रोत कोड',
            project2_title: 'बिरुवा रोग पत्ता लगाउने',
            project2_desc: 'छवि विश्लेषण प्रयोग गरी बिरुवा रोग पत्ता लगाउने प्रणाली विकास गरियो। वस्तु पत्ता लगाउनका लागि YOLO को लाभ उठाइयो, साथै विशेषता निकासी र वर्गीकरणका लागि गैर-नकारात्मक म्याट्रिक्स फ्याक्टराइजेसन (NMF) र फजी क्लस्टरिङ जस्ता प्रविधिहरू।',
            project3_title: 'समाचारमा राजनीतिक झुकाव पत्ता लगाउने',
            project3_desc: 'फाइन-ट्युन गरिएको BERT मोडेलहरू प्रयोग गरी समाचार लेखहरूलाई वाम-झुकाव, केन्द्रवादी, वा दक्षिण-झुकावको रूपमा वर्गीकरण गर्न वेब अनुप्रयोग विकास गरियो। क्वान्टाइजेसन र लो-र्याङ्क एडप्टेसन (LoRA) मार्फत मोडेल दक्षता बढाइयो। मिडिया पूर्वाग्रह पत्ता लगाउन र विश्लेषणलाई समर्थन गर्दै, वास्तविक-समय भविष्यवाणीहरूको लागि Azure कन्टेनर एप्समा होस्ट गरिएको React JS, FastAPI र Docker प्रयोग गरी समाधान डिप्लोइ गरियो।',
            research_title: 'अनुसन्धान र प्रकाशनहरू',
            research1_title: 'प्रगतिमा',
            interests_title: 'रुचि र खोजहरू',
            work_interests_title: 'कार्य रुचिहरू',
            work_interests_desc: 'डिजाइन प्रणाली, AI/ML वास्तुकला, विकासकर्ता उपकरण, वेब प्रदर्शन, र पहुँचयोग्य डिजिटल अनुभवहरू सिर्जना गर्ने।',
            research_interests_title: 'अनुसन्धान रुचिहरू',
            research_interests_desc: 'मानव-कम्प्युटर अन्तरक्रिया, 3D/4D कम्प्युटर भिजन, सूचना दृश्यावलोकन, र प्रविधिको सामाजिक प्रभाव।',
            personal_interests_title: 'व्यक्तिगत रुचिहरू',
            personal_interest1: 'यात्रा',
            personal_interest2: 'पदयात्रा/ट्रेकिङ',
            personal_interest3: 'बाइक राइड',
            personal_interest4: 'गेमिङ',
            personal_interest5: 'साइक्लिङ',
            contact_title: 'सम्पर्कमा रहनुहोस्',
            contact_desc: 'म सधैं नयाँ परियोजनाहरू, रचनात्मक विचारहरू, वा महत्वाकांक्षी दृष्टिकोणको हिस्सा बन्ने अवसरहरूबारे छलफल गर्न खुला छु। सम्पर्क गर्न नहिचकिचाउनुहोस्।',
            contact_button: 'नमस्ते भन्नुहोस्',
            footer_text: '© २०२५ पूजन थापा। सबै अधिकार सुरक्षित।',
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
            if(sunIcon) sunIcon.classList.add('hidden');
            if(moonIcon) moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.removeAttribute('data-theme');
            if(sunIcon) sunIcon.classList.remove('hidden');
            if(moonIcon) moonIcon.classList.add('hidden');
        }
        // Clone and replace mobile toggle to keep icons in sync
        if(themeToggleMob && themeToggle) {
            themeToggleMob.innerHTML = themeToggle.innerHTML;
        }
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
    
    if(themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if(themeToggleMob) themeToggleMob.addEventListener('click', toggleTheme);


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

    if(languageSwitcher) languageSwitcher.addEventListener('click', handleLanguageSwitch);
    if(languageSwitcherMob) languageSwitcherMob.addEventListener('click', handleLanguageSwitch);

    // Set initial language
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);


    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            if(mobileMenu) mobileMenu.classList.toggle('hidden');
        });
    }


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
