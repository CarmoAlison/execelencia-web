// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navDesktop = document.querySelector('.nav-desktop');

hamburger.addEventListener('click', () => {
    navDesktop.classList.toggle('active');
});

// Efeito de scroll na navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito Binário Otimizado
function initBinaryEffect() {
    const binarioContainer = document.querySelector('.binario');
    const characters = "01";
    const fontSize = 14;
    const columnWidth = 20;
    const columns = Math.floor(window.innerWidth / columnWidth);
    
    // Limpa o container
    binarioContainer.innerHTML = '';
    
    // Cria colunas de binários
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
        
        // Gera 20-30 linhas de binários por coluna
        const rows = 30 + Math.floor(Math.random() * 20);
        let binaryText = '';
        
        for (let j = 0; j < rows; j++) {
            binaryText += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        
        binaryColumn.innerHTML = binaryText;
        binarioContainer.appendChild(binaryColumn);
    }
}

// Inicia o efeito e recria ao redimensionar
document.addEventListener('DOMContentLoaded', initBinaryEffect);
window.addEventListener('resize', function() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(initBinaryEffect, 200);
});

// JavaScript para os Modais
document.addEventListener('DOMContentLoaded', function() {
    // Abrir modal
    const detalhesBtns = document.querySelectorAll('.btn-detalhes');
    detalhesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Desabilita scroll
        });
    });
    
    // Fechar modal
    const closeModals = document.querySelectorAll('.close-modal');
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
            document.body.style.overflow = 'auto'; // Habilita scroll
        });
    });
    
    // Fechar ao clicar fora do modal
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Formatar mensagem para WhatsApp
    const whatsappMessage = `Olá, recebi um novo contato através do site:
    
*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}
*Serviço de interesse:* ${service}
*Mensagem:*
${message}

Por favor, entre em contato com este cliente o mais breve possível.`;
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Redirecionar para WhatsApp com a mensagem
    window.open(`https://wa.me/5584996002433?text=${encodedMessage}`, '_blank');
    
    // Limpar formulário
    this.reset();
    
    // Feedback opcional para o usuário
    alert('Obrigado pelo seu contato! Você será redirecionado para o WhatsApp para finalizar.');
});

// Script para o botão "Voltar ao Topo"
document.querySelector('.back-to-top a').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Função para verificar se o elemento está visível
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Verifica se o elemento está na viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('is-visible');
            }
        });
    }
    
    // Debounce para melhor performance
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Adiciona o event listener
    window.addEventListener('scroll', debounce(checkIfInView));
    window.addEventListener('load', checkIfInView);
    
    // Verifica imediatamente se algum elemento já está visível
    checkIfInView();
});