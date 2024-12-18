document.addEventListener('DOMContentLoaded', () => {
    const languageBtn = document.getElementById('language-btn');
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    const featureContainers = document.querySelectorAll('.feature');

    let currentLanguage = 'pt';
    let isDarkMode = false;

    const translations = {
        pt: {
            button: '🇧🇷 PT',
            navHome: 'Home',
            navCourses: 'Cursos',
            navAbout: 'Sobre',
            navContact: 'Contato',
            loginButton: 'Entrar',
            registerLink: 'Registrar',
            loginLink: 'Entrar',
            noAccount: 'Não tem uma conta?',
            haveAccount: 'Já tem uma conta?',
            heroTitle: 'Transforme seu Aprendizado Tech',
            heroSubtitle: 'Explore. Aprenda. Domine.',
            ctaPrimaryCTA: 'Ver Cursos',
            ctaSecondaryCTA: 'Saiba Mais',
            featureCourses: 'Cursos Interativos',
            featureDescription1: 'Aprenda programação de forma divertida e prática',
            featureTech: 'Tecnologias Modernas',
            featureDescription2: 'Node.js, Express, MongoDB e muito mais',
            featureCommunity: 'Comunidade Geek',
            featureDescription3: 'Conecte-se com outros desenvolvedores',
            footerRights: '© 2024 DotGeeks. Todos os direitos reservados.',
            themeLight: '☀️ Claro',
            themeDark: '🌙 Escuro'
        },
        en: {
            button: '🇺🇸 EN',
            navHome: 'Home',
            navCourses: 'Courses',
            navAbout: 'About',
            navContact: 'Contact',
            loginButton: 'Log In',
            registerLink: 'Register',
            loginLink: 'Login',
            noAccount: 'Don’t have an account?',
            haveAccount: 'Already have an account?',
            heroTitle: 'Transform Your Tech Learning',
            heroSubtitle: 'Explore. Learn. Master.',
            ctaPrimaryCTA: 'View Courses',
            ctaSecondaryCTA: 'Learn More',
            featureCourses: 'Interactive Courses',
            featureDescription1: 'Learn programming in a fun and practical way',
            featureTech: 'Modern Technologies',
            featureDescription2: 'Node.js, Express, MongoDB, and more',
            featureCommunity: 'Geek Community',
            featureDescription3: 'Connect with other developers',
            footerRights: '© 2024 DotGeeks. All rights reserved.',
            themeLight: '☀️ Light',
            themeDark: '🌙 Dark'
        }
    };

    const updateLanguage = (lang) => {
        currentLanguage = lang;
        const content = translations[lang];

        document.querySelectorAll('[data-lang]').forEach((element) => {
            const key = element.dataset.lang;
            if (content[key]) {
                element.textContent = content[key];
            }
        });
    };

    const updateTheme = () => {
        isDarkMode = !isDarkMode;
        body.classList.toggle('dark-mode');
        themeBtn.textContent = isDarkMode ? translations[currentLanguage].themeDark : translations[currentLanguage].themeLight;
        featureContainers.forEach((feature) => {
            feature.style.backgroundColor = isDarkMode ? 'var(--custom)' : 'var(--secondary-color)';
        });
    };

    themeBtn.addEventListener('click', updateTheme);
    languageBtn.addEventListener('click', () => {
        const newLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
        updateLanguage(newLanguage);
    });

    updateLanguage(currentLanguage);
    themeBtn.textContent = translations[currentLanguage].themeLight;
});
