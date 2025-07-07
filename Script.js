console.log("Script carregado!");

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM totalmente carregado!");

    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navDesktop = document.querySelector('.nav-desktop');

    if (hamburger && navDesktop) {
        hamburger.addEventListener('click', () => {
            navDesktop.classList.toggle('active');
        });
    }

    // Efeito de scroll na navbar
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Scroll suave para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito Binário
    function initBinaryEffect() {
        const binarioContainer = document.querySelector('.binario');
        if (!binarioContainer) return;

        const characters = "01";
        const fontSize = 14;
        const columnWidth = 20;
        const columns = Math.floor(window.innerWidth / columnWidth);

        binarioContainer.innerHTML = '';

        for (let i = 0; i < columns; i++) {
            const duration = 4 + Math.random() * 10;
            const delay = Math.random() * 10;
            const opacity = 0.2 + Math.random() * 0.3;

            const binaryColumn = document.createElement('div');
            binaryColumn.className = 'binary-code';
            binaryColumn.style.left = `${i * columnWidth}px`;
            binaryColumn.style.animationDuration = `${duration}s`;
            binaryColumn.style.animationDelay = `${delay}s`;
            binaryColumn.style.opacity = opacity;

            const rows = 30 + Math.floor(Math.random() * 20);
            let binaryText = '';

            for (let j = 0; j < rows; j++) {
                binaryText += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
            }

            binaryColumn.innerHTML = binaryText;
            binarioContainer.appendChild(binaryColumn);
        }
    }

    initBinaryEffect();
    window.addEventListener('resize', function () {
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(initBinaryEffect, 200);
    });

    // Modais
    const detalhesBtns = document.querySelectorAll('.btn-detalhes');
    detalhesBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModals = document.querySelectorAll('.close-modal');
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !phone || !service || !message) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }

            const whatsappMessage = `Olá, recebi um novo contato através do site:\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone:* ${phone}\n*Serviço de interesse:* ${service}\n*Mensagem:*\n${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappNumber = "5584996002433";

            try {
                window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                this.reset();
            } catch (error) {
                console.error("Erro:", error);
                alert("Ocorreu um erro ao tentar abrir o WhatsApp.");
            }
        });
    }

    // Botão "Voltar ao Topo"
    const backToTop = document.querySelector('.back-to-top a');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animações on Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;

        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;

            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('is-visible');
            }
        });
    }

    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    if (animateElements.length > 0) {
        window.addEventListener('scroll', debounce(checkIfInView));
        window.addEventListener('load', checkIfInView);
        checkIfInView();
    }
});


// const myObserver = new IntersectionObserver((entries) => {
//    entries.forEach( (entry) =>{
//     if(entry.isIntersecting){
//         entry.target.classList.add('show')
//     }else{
//         entry.target.classList.remove('show')
//     }
//    })
// })
// const elements = document.querySelectorAll('section')
// elements.forEach((element) => myObserver.observe(element))

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Aplica a animação com delay específico de cada elemento
                const delay = entry.target.dataset.animationDelay || '0';
                setTimeout(() => {
                    entry.target.classList.add('visivel');
                }, delay);
            } else {
                entry.target.classList.remove('visivel');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar todos os elementos com animação
    document.querySelectorAll('.aparece-ao-rolar').forEach((element, index) => {
        // Define um delay progressivo para cada elemento (0.1s, 0.2s, 0.3s)
        element.dataset.animationDelay = `${index * 100}`;
        observer.observe(element);
    });
});
// Configuração do IntersectionObserver para os cards de projeto
const observerProjetos = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const delay = entry.target.dataset.animationDelay || '0';
            setTimeout(() => {
                entry.target.classList.add('visivel');
            }, delay);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Aplicar aos cards de projeto
document.querySelectorAll('.projeto-card').forEach((card, index) => {
    card.classList.add('aparece-ao-rolar');
    card.dataset.animationDelay = `${index * 100 + 200}`; // Delay maior que a seção anterior
    observerProjetos.observe(card);
});

// Aplicar ao cabeçalho da seção
const headerProjetos = document.querySelector('.projetos-section .section-header');
if(headerProjetos) {
    headerProjetos.classList.add('aparece-ao-rolar');
    headerProjetos.dataset.animationDelay = '50';
    observerProjetos.observe(headerProjetos);
}