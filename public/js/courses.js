document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const container = document.getElementById('courses-container');
    const languageBtn = document.getElementById('language-btn');
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;

    // State
    let currentLanguage = 'pt'; // Default language is Portuguese
    let isDarkMode = false; // Default theme is Light Mode

    // Translations
    const translations = {
        pt: {
            navHome: 'Home',
            navCourses: 'Cursos',
            navAbout: 'Sobre',
            navContact: 'Contato',
            coursesTitle: 'Cursos',
            loadingCourses: 'Carregando cursos...',
            footerRights: '© 2024 DotGeeks. Todos os direitos reservados.',
            noCourses: 'Nenhum curso disponível no momento.',
            courseError: 'Erro ao carregar os cursos. Tente novamente mais tarde.',
            viewCourse: 'Ver Curso'
        },
        en: {
            navHome: 'Home',
            navCourses: 'Courses',
            navAbout: 'About',
            navContact: 'Contact',
            coursesTitle: 'Courses',
            loadingCourses: 'Loading courses...',
            footerRights: '© 2024 DotGeeks. All rights reserved.',
            noCourses: 'No courses available at the moment.',
            courseError: 'Error loading courses. Please try again later.',
            viewCourse: 'View Course'
        }
    };

    // Toggle Language
    const toggleLanguage = () => {
        currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
        updateLanguage();
    };

    // Update Language
    const updateLanguage = () => {
        // Update text for elements with `data-lang` attributes
        document.querySelectorAll('[data-lang]').forEach((element) => {
            const key = element.getAttribute('data-lang');
            element.textContent = translations[currentLanguage][key];
        });

        // Update button text
        languageBtn.textContent = currentLanguage === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN';
    };

    // Toggle Theme
    const toggleTheme = () => {
        isDarkMode = !isDarkMode;
        body.classList.toggle('dark-mode', isDarkMode);
        themeBtn.textContent = isDarkMode ? '🌙 Dark' : '☀️ Light';
    };

    // Load Courses
    const loadCourses = async () => {
        try {
            const response = await fetch('/api/courses'); // Replace with actual API endpoint
            const courses = await response.json();

            container.innerHTML = ''; // Clear loading message

            if (courses.length === 0) {
                container.innerHTML = `<p data-lang="noCourses">${translations[currentLanguage].noCourses}</p>`;
                return;
            }

            courses.forEach((course) => {
                const courseDiv = document.createElement('div');
                courseDiv.classList.add('course-card');
                courseDiv.innerHTML = `
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <a href="/courses/${course.id}" class="btn" data-lang="viewCourse">${translations[currentLanguage].viewCourse}</a>
                `;
                container.appendChild(courseDiv);
            });
        } catch (error) {
            console.error('Error loading courses:', error);
            container.innerHTML = `<p data-lang="courseError">${translations[currentLanguage].courseError}</p>`;
        }
    };

    // Event Listeners
    languageBtn.addEventListener('click', toggleLanguage);
    themeBtn.addEventListener('click', toggleTheme);

    // Initialize
    updateLanguage(); // Set default language
    themeBtn.textContent = '☀️ Light'; // Set default theme button text
    await loadCourses(); // Load courses dynamically
});
