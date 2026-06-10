// Quiz Data
const quizData = [
    {
        question: "O que é uma prática agrícola sustentável?",
        answers: [
            "Usar o máximo de pesticidas possível",
            "Produzir alimentos sem prejudicar o meio ambiente para futuras gerações",
            "Derrubar árvores para plantar mais rápido",
            "Usar água em excesso para melhor produção"
        ],
        correct: 1
    },
    {
        question: "Qual é o principal benefício da rotação de culturas?",
        answers: [
            "Aumentar o preço dos produtos",
            "Reduzir a necessidade de cuidados",
            "Melhorar a saúde do solo e reduzir pragas naturalmente",
            "Diminuir a produção"
        ],
        correct: 2
    },
    {
        question: "O que é compostagem?",
        answers: [
            "Queimar resíduos no solo",
            "Jogar lixo em qualquer lugar",
            "Transformar resíduos orgânicos em fertilizante natural",
            "Usar apenas químicos sintéticos"
        ],
        correct: 2
    },
    {
        question: "Qual animal é essencial para polinizar plantas?",
        answers: [
            "Cobras",
            "Abelhas",
            "Ratos",
            "Formigas"
        ],
        correct: 1
    },
    {
        question: "Por que a biodiversidade é importante na agricultura?",
        answers: [
            "Não é importante",
            "Apenas para fins estéticos",
            "Mantém o equilíbrio ecológico e ajuda no controle de pragas",
            "Atrapalha a produção"
        ],
        correct: 2
    },
    {
        question: "Qual fonte de energia é renovável e limpa?",
        answers: [
            "Carvão",
            "Petróleo",
            "Energia solar",
            "Gás natural"
        ],
        correct: 2
    },
    {
        question: "Qual é o objetivo principal do reflorestamento?",
        answers: [
            "Ocupar espaço desnecessário",
            "Recuperar áreas degradadas e aumentar captura de carbono",
            "Dificultar a agricultura",
            "Reduzir a produção"
        ],
        correct: 1
    },
    {
        question: "Quanto de água pode ser economizada com irrigação eficiente?",
        answers: [
            "5%",
            "10%",
            "Até 50%",
            "Nenhuma"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let quizStarted = false;

// Dark Mode
const darkModeBtn = document.getElementById('darkModeBtn');
const htmlElement = document.documentElement;

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
}

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
});

// Font Size Control
const fontSizeBtn = document.getElementById('fontSizeBtn');
const fontSizeModal = document.getElementById('fontSizeModal');
const closeModal = document.querySelector('.close-modal');
const fontBtns = document.querySelectorAll('.font-btn');

const savedFontSize = localStorage.getItem('fontSize') || '16';
htmlElement.style.fontSize = savedFontSize + 'px';

fontSizeBtn.addEventListener('click', () => {
    fontSizeModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    fontSizeModal.classList.remove('active');
});

fontSizeModal.addEventListener('click', (e) => {
    if (e.target === fontSizeModal) {
        fontSizeModal.classList.remove('active');
    }
});

fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fontBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const size = btn.dataset.size;
        htmlElement.style.fontSize = size + 'px';
        localStorage.setItem('fontSize', size);
        fontSizeModal.classList.remove('active');
    });
});

document.querySelector(`[data-size="${savedFontSize}"]`)?.classList.add('active');

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Card Flip Animation
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });

    if (window.innerWidth > 768) {
        card.addEventListener('mouseenter', function() {
            this.classList.add('flipped');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('flipped');
        });
    }
});

// Quiz Initialization
function initializeQuiz() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = `question-container ${index === 0 ? '' : 'hidden'}`;
        questionDiv.dataset.index = index;

        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        questionText.innerHTML = `<span class="question-number">Pergunta ${index + 1} de ${quizData.length}:</span><br>${q.question}`;

        const answersDiv = document.createElement('div');
        answersDiv.className = 'answers-group';

        q.answers.forEach((answer, answerIndex) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index, answerIndex));
            answersDiv.appendChild(button);
        });

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answersDiv);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'quiz-buttons';

        if (index > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'quiz-btn';
            prevBtn.textContent = '← Anterior';
            prevBtn.addEventListener('click', () => previousQuestion());
            buttonsDiv.appendChild(prevBtn);
        }

        if (index < quizData.length - 1) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'quiz-btn';
            nextBtn.textContent = 'Próxima →';
            nextBtn.addEventListener('click', () => nextQuestion());
            buttonsDiv.appendChild(nextBtn);
        } else {
            const submitBtn = document.createElement('button');
            submitBtn.className = 'quiz-btn cta-btn';
            submitBtn.textContent = 'Enviar Respostas';
            submitBtn.style.backgroundColor = '#ffc107';
            submitBtn.style.color = '#2d5016';
            submitBtn.addEventListener('click', () => submitQuiz());
            buttonsDiv.appendChild(submitBtn);
        }

        questionDiv.appendChild(buttonsDiv);
        quizContainer.appendChild(questionDiv);
    });

    userAnswers = new Array(quizData.length).fill(null);
    quizStarted = true;
}

function selectAnswer(questionIndex, answerIndex) {
    userAnswers[questionIndex] = answerIndex;

    const question = document.querySelector(`[data-index="${questionIndex}"]`);
    const options = question.querySelectorAll('.answer-option');
    options.forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === answerIndex) {
            opt.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert('Por favor, selecione uma resposta!');
        return;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion(currentQuestion);
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showQuestion(index) {
    document.querySelectorAll('.question-container').forEach((q, i) => {
        if (i === index) {
            q.classList.remove('hidden');
        } else {
            q.classList.add('hidden');
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitQuiz() {
    if (userAnswers.some(ans => ans === null)) {
        alert('Por favor, responda todas as questões!');
        return;
    }

    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });

    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('quizResult');

    quizContainer.style.display = 'none';
    resultContainer.classList.remove('hidden');

    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('resultScore').textContent = `${score} de ${quizData.length} - ${percentage}%`;

    let message = '';
    if (percentage === 100) {
        message = '🎉 Parabéns! Você acertou tudo! Você é um especialista em sustentabilidade agrícola!';
    } else if (percentage >= 80) {
        message = '🌟 Excelente desempenho! Você tem ótimos conhecimentos sobre sustentabilidade!';
    } else if (percentage >= 60) {
        message = '👍 Bom trabalho! Você demonstra bom entendimento sobre o tema!';
    } else if (percentage >= 40) {
        message = '📚 Você está no caminho certo! Continue aprendendo mais sobre sustentabilidade!';
    } else {
        message = '💪 Não desanime! Aprenda mais sobre sustentabilidade agrícola e tente novamente!';
    }

    document.getElementById('resultMessage').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    quizStarted = false;

    document.getElementById('quiz').style.display = 'flex';
    document.getElementById('quizResult').classList.add('hidden');

    initializeQuiz();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.objective-card, .card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

window.addEventListener('resize', () => {
    const cards = document.querySelectorAll('.card');
    if (window.innerWidth <= 768) {
        cards.forEach(card => {
            card.removeEventListener('mouseenter', flipCard);
            card.removeEventListener('mouseleave', unflipCard);
        });
    }
});