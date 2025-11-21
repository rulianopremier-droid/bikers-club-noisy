// Identifiants administrateur
const adminCredentials = {
    email: 'rulianopremier@gmail.com',
    password: 'Magamelle1!'
};

// Identifiants encadrants (exemple)
const encadrantCredentials = {
    email: 'encadrant@club.com',
    password: 'encadrant123'
};

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const userTypeSelect = document.getElementById('userType');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');

    // Animation d'entrée des champs
    animateFormElements();

    // Gestion de la soumission du formulaire
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Changement du type d'utilisateur
    userTypeSelect.addEventListener('change', function() {
        resetForm();
    });

    function handleLogin() {
        const userType = userTypeSelect.value;
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Validation basique
        if (!username || !password) {
            showError('Veuillez remplir tous les champs');
            return;
        }

        // Animation de chargement
        setLoadingState(true);

        // Simulation délai réseau
        setTimeout(() => {
            let isValid = false;

            // Vérification selon le type d'utilisateur
            if (userType === 'administrateur') {
                isValid = (username === adminCredentials.email && password === adminCredentials.password);
            } else if (userType === 'encadrant') {
                isValid = (username === encadrantCredentials.email && password === encadrantCredentials.password);
                
                // Pour la démo, accepter tout encadrant
                if (!isValid && username.includes('@')) {
                    isValid = true;
                }
            }

            if (isValid) {
                loginSuccess(userType);
            } else {
                loginFailed();
            }

            setLoadingState(false);
        }, 1000);
    }

    function loginSuccess(userType) {
        // Stockage de la session (simplifié)
        localStorage.setItem('userType', userType);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Message de succès
        showSuccess(`Connexion ${userType} réussie !`);
        
        // Redirection vers la page d'accueil
        setTimeout(() => {
            window.location.href = 'accueil.html';
        }, 1500);
    }

    function loginFailed() {
        showError('Identifiants incorrects. Veuillez réessayer.');
        passwordInput.value = '';
        passwordInput.focus();
        shakeForm();
    }

    function showError(message) {
        // Supprimer les anciens messages d'erreur
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Créer nouveau message d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Insérer après le formulaire
        loginForm.appendChild(errorDiv);

        // Supprimer automatiquement après 5 secondes
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    function showSuccess(message) {
        // Animation de succès
        loginBtn.style.background = 'linear-gradient(to right, #4CAF50, #45a049)';
        loginBtn.textContent = '✓ Connexion réussie';
        
        // Message temporaire
        alert(message); // Remplacez par un toast plus élégant si besoin
    }

    function setLoadingState(loading) {
        if (loading) {
            loginBtn.disabled = true;
            loginBtn.textContent = 'Connexion...';
            loginForm.classList.add('loading');
        } else {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Se connecter';
            loginForm.classList.remove('loading');
        }
    }

    function resetForm() {
        // Supprimer les messages d'erreur
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Réinitialiser le bouton
        loginBtn.style.background = '';
        loginBtn.textContent = 'Se connecter';
    }

    function animateFormElements() {
        const elements = [
            userTypeSelect,
            usernameInput,
            passwordInput,
            loginBtn
        ];

        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.5s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    function shakeForm() {
        loginForm.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
});

// Animation shake pour les erreurs
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);

// Vérification de session au chargement
function checkExistingSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'accueil.html';
    }
}

// Appel initial
checkExistingSession();