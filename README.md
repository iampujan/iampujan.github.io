Personal Portfolio Website
A clean, modern, and fully responsive personal portfolio website built with HTML, CSS, and vanilla JavaScript. This project features a light/dark mode theme switcher and multi-language support (English, Italian, and Nepali).

View Live Demo
(Replace the link above with your actual GitHub Pages URL)

Features
Fully Responsive: Adapts seamlessly to any screen size, from mobile phones to desktop monitors.

Theme Switching: Toggle between a clean light mode and a sleek dark mode. Your preference is saved in local storage.

Multi-language Support: Content can be switched between English, Italian, and Nepali.

Dynamic Content Sections: Includes dedicated sections for:

Education

Work Experience

Projects

Research & Publications

Interests (Work, Research, and Personal)

Smooth Scroll Animations: Sections gracefully fade in as you scroll down the page.

Clean & Maintainable Code: Organized into separate HTML, CSS, and JavaScript files for easy management.

Technologies Used
HTML5: For the structure and content of the website.

CSS3: For styling, including the use of CSS variables for theming.

Tailwind CSS: Utilized via a CDN for rapid and responsive UI development.

Vanilla JavaScript: For all interactive features, including the theme switcher, language functionality, and mobile menu.

Project Structure
The project is organized into three main files for clarity and separation of concerns:

/
├── index.html      # The main HTML file containing the portfolio's structure.
├── style.css       # The CSS file for custom styles and theme variables.
├── script.js       # The JavaScript file for interactivity and translations.
└── README.md       # You are here!

How to Customize
This portfolio is designed to be easily customized with your own information.

1. Update Your Information (index.html)
Open the index.html file and replace the placeholder content with your own details. Look for the data-translate-key attributes on text elements. The initial text in the HTML is the English version.

2. Update Translations (script.js)
Open the script.js file. At the top, you will find a translations object.

const translations = {
    en: {
        nav_experience: 'Experience',
        hero_title: 'AI/Machine Learning Engineer & Data Scientist',
        // ... all other English text
    },
    it: {
        nav_experience: 'Esperienza',
        hero_title: 'Ingegnere di intelligenza artificiale/apprendimento automatico e scienziato dei dati',
        // ... all other Italian text
    },
    ne: {
        nav_experience: 'अनुभव',
        hero_title: 'एआई/मेसिन लर्निङ इन्जिनियर र डाटा वैज्ञानिक',
        // ... all other Nepali text
    }
};

Each key (e.g., hero_title) corresponds to a data-translate-key in the index.html file.

Update the string values for each language to match the content you added to the HTML file.

3. Add Your CV
Place your CV file (e.g., My_CV.pdf) in the root directory of the project and update the href in the "Download CV" links in index.html.

4. Update Images and Links
Replace the placeholder profile picture and project images with your own.

Update the href attributes for all social media and project links.

License
This project is open-source and available under the MIT License.
