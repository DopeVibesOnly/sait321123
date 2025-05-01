document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    const greetingCard = document.querySelector('.greeting-card');
    if (greetingCard) {
        greetingCard.addEventListener('click', (event) => {
            createHeartsExplosion(event);
        });
    }

    const header = document.querySelector('header');
    header.addEventListener('mouseenter', () => {
        for (let i = 0; i < 5; i++) {
            createSparkle(header);
        }
    });

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (!item.getAttribute('href').includes('.html')) {
                e.preventDefault();
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    navItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            pulseEffect(item);
            
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('div');
                heart.className = 'nav-heart';
                const size = 8 + Math.random() * 8;
                const angle = Math.random() * 360;
                const distance = 30 + Math.random() * 20;
                const duration = 0.8 + Math.random() * 0.6;
                const delay = Math.random() * 0.3;
                
                heart.style.width = `${size}px`;
                heart.style.height = `${size}px`;
                heart.style.position = 'absolute';
                heart.style.zIndex = '-1';
                heart.style.top = '50%';
                heart.style.left = '50%';
                heart.style.opacity = '0';
                heart.style.transition = `all ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s`;
                
                item.appendChild(heart);
                
                setTimeout(() => {
                    heart.style.transform = `translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance - 15}px) scale(1)`;
                    heart.style.opacity = '1';
                }, 10);
                
                setTimeout(() => {
                    heart.style.opacity = '0';
                    heart.style.transform = `translate(${Math.cos(angle * Math.PI / 180) * (distance + 20)}px, ${Math.sin(angle * Math.PI / 180) * (distance + 20) - 20}px) scale(0)`;
                }, 300 + delay * 1000);
                
                setTimeout(() => {
                    heart.remove();
                }, 1000 + delay * 1000);
            }
        });
    });

    createBackgroundPattern();
    initComplimentCards();
    initGalleryEffects();
    initPredictionsPage();
});

function initComplimentCards() {
    const complimentCards = document.querySelectorAll('.compliment-card');
    if (!complimentCards.length) return;
    
    complimentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createCardSparkles(card);
            card.classList.add('flipped');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('flipped');
        });
        
        card.addEventListener('click', () => {
            card.classList.toggle('flipped-permanent');
        });
    });
}

function createCardSparkles(card) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = '6px';
            sparkle.style.height = '6px';
            sparkle.style.borderRadius = '50%';
            const color = card.getAttribute('data-color');
            let sparkleColor;
            
            switch(color) {
                case 'pink': sparkleColor = '#ff6b9d'; break;
                case 'blue': sparkleColor = '#6bbcff'; break;
                case 'purple': sparkleColor = '#b36bff'; break;
                case 'orange': sparkleColor = '#ffa76b'; break;
                case 'green': sparkleColor = '#6bffa7'; break;
                case 'teal': sparkleColor = '#6bffe4'; break;
                default: sparkleColor = 'var(--accent-color)';
            }
            
            sparkle.style.background = `radial-gradient(circle, ${sparkleColor} 0%, rgba(255,255,255,0) 70%)`;
            sparkle.style.boxShadow = `0 0 10px 2px ${sparkleColor}`;
            
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            sparkle.style.top = `${top}%`;
            sparkle.style.left = `${left}%`;
            
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0)';
            sparkle.style.transition = 'all 0.8s ease-out';
            sparkle.style.zIndex = '5';
            
            const front = card.querySelector('.compliment-front');
            front.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.style.opacity = '1';
                sparkle.style.transform = 'scale(1)';
            }, 10);
            
            setTimeout(() => {
                sparkle.style.opacity = '0';
                sparkle.style.transform = 'scale(0)';
            }, 500);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 50);
    }
}

function pulseEffect(element) {
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const numHearts = 25;
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 15;
        const size = 0.5 + Math.random() * 1;
        const opacity = 0.3 + Math.random() * 0.5; 
        
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.transform = `rotate(45deg) scale(${size})`;
        heart.style.opacity = opacity.toString();
        
        const pathType = Math.floor(Math.random() * 3);
        if (pathType === 0) {
            heart.style.animationName = 'float-around';
        } else if (pathType === 1) {
            heart.style.animationName = 'float-zigzag';
        } else {
            heart.style.animationName = 'float-curve';
        }
        
        container.appendChild(heart);
    }
}

function createHeartsExplosion(event) {
    const container = document.querySelector('.floating-hearts');
    const numHearts = 10;
    const x = event.clientX;
    const y = event.clientY;
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        

        const angle = Math.random() * 360;
        const distance = 50 + Math.random() * 100;
        const duration = 0.5 + Math.random() * 1;
        const size = 0.5 + Math.random() * 0.5;
        
        heart.style.transform = `rotate(45deg) scale(${size})`;
        heart.style.transition = `all ${duration}s ease-out`;
        

        container.appendChild(heart);
        

        setTimeout(() => {
            heart.style.left = `${x + distance * Math.cos(angle * Math.PI / 180)}px`;
            heart.style.top = `${y + distance * Math.sin(angle * Math.PI / 180)}px`;
            heart.style.opacity = '0';
        }, 10);
        

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
}

function createSparkle(parent) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'radial-gradient(circle, var(--accent-color) 0%, rgba(255,222,89,0) 70%)';
    sparkle.style.boxShadow = '0 0 10px 2px var(--accent-color)';

    const top = Math.random() * 100;
    const left = Math.random() * 100;
    sparkle.style.top = `${top}%`;
    sparkle.style.left = `${left}%`;
    

    sparkle.style.opacity = '0';
    sparkle.style.transform = 'scale(0)';
    sparkle.style.transition = 'all 1.5s ease-out';
    
    parent.appendChild(sparkle);

    setTimeout(() => {
        sparkle.style.opacity = '1';
        sparkle.style.transform = 'scale(1)';
    }, 10);
    

    setTimeout(() => {
        sparkle.style.opacity = '0';
        sparkle.style.transform = 'scale(0)';
    }, 700);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

function createBackgroundPattern() {
    const container = document.querySelector('body');
    const pattern = document.createElement('div');
    pattern.style.position = 'fixed';
    pattern.style.top = '0';
    pattern.style.left = '0';
    pattern.style.width = '100%';
    pattern.style.height = '100%';
    pattern.style.zIndex = '-2';
    pattern.style.opacity = '0.2';
    pattern.style.pointerEvents = 'none';
    
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '15px';
        dot.style.height = '15px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = 'var(--primary-color)';
        dot.style.top = Math.random() * 100 + 'vh';
        dot.style.left = Math.random() * 100 + 'vw';
        
        pattern.appendChild(dot);
    }
    
    container.appendChild(pattern);
}

function initGalleryEffects() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    if (!photoFrames.length) return;
    
    photoFrames.forEach(frame => {
        frame.addEventListener('mouseenter', () => {
        });

    });
    

    animateGalleryElements();
}

function animateGalleryElements() {
    const butterflies = document.querySelectorAll('.butterfly');
    
    butterflies.forEach(butterfly => {
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 30 - 15;
        const randomDuration = 15 + Math.random() * 10;
        
        butterfly.style.animationDuration = `${randomDuration}s`;
    });
}

function createPhotoSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.borderRadius = '50%';
    
    const colors = [
        'var(--primary-color)',
        'var(--secondary-color)',
        'var(--accent-color)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    sparkle.style.background = `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`;
    sparkle.style.boxShadow = `0 0 10px 2px ${color}`;
    
    const positionType = Math.floor(Math.random() * 4);
    let top, left;
    
    switch(positionType) {
        case 0: 
            top = -20 + Math.random() * 10;
            left = Math.random() * 100;
            break;
        case 1: 
            top = Math.random() * 100;
            left = 95 + Math.random() * 15;
            break;
        case 2: 
            top = 95 + Math.random() * 15;
            left = Math.random() * 100;
            break;
        case 3: 
            top = Math.random() * 100;
            left = -20 + Math.random() * 10;
            break;
    }
    
    sparkle.style.top = `${top}%`;
    sparkle.style.left = `${left}%`;
    sparkle.style.opacity = '0';
    sparkle.style.transform = 'scale(0) rotate(0deg)';
    sparkle.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    sparkle.style.zIndex = '10';
    
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.opacity = '1';
        sparkle.style.transform = 'scale(1) rotate(180deg)';
    }, 10);
    
    setTimeout(() => {
        sparkle.style.opacity = '0';
        sparkle.style.transform = 'scale(1.5) rotate(360deg)';
    }, 800);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}

function initPredictionsPage() {
    const crystalBall = document.querySelector('.crystal-ball');
    const predictionButton = document.querySelector('.prediction-button');
    const predictionResult = document.querySelector('.prediction-result');
    
    if (!crystalBall || !predictionButton) return;

    const predictions = [
        "Мне кажется, сколько бы времени ни прошло, я все равно буду находить в тебе что-то удивительное, что заставит меня влюбиться еще раз.",
        "Просто быть с тобой – это самое лучшее, что со мной случалось.",
        "Для тебя хочется становиться с каждым днём все лучше и лучше!",
        "Факт о моей любимой: Обладает способностью засыпать под самый громкий ужастик, но просыпаться от звука моих сообщений)",
        "Лингвистический факт о моей любимой: Мастерски владеет языком намеков прозрачности",
        "Факт выбора о моей любимой: Процесс выбора фильма для просмотра может занимать больше времени, чем сам фильм. В итоге часто выбирается что-то проверенное, и она засыпает на титрах).",
        "Факт о моей любимой, энергетический: Ее уровень энергии обратно пропорционален количеству оставшихся дел. Чем больше нужно сделать, тем сильнее желание просто полежать пять минуточек. Пять минуточек, растянутые в вечность).",
        "Факт о моей любимой, зоологический: Ведет с котиком полноценные диалоги. При этом может не заметить, что котик уже полчаса настойчиво намекает на покушать.",
        "Факт о моей любимой, подарочный: При получении подарка ее первая реакция часто — детальный допрос и убеждение: а как так??, ты потратил на меня столько времени. Радость приходит после следственных мероприятий)).",
        "Факт о моей любимой, спортивный: Моя любимая ходит в спортзал, очень спортивная и прекрасная девушка. Боюсь ее.. ибо она может меня поднять. ЕЩЁ И СЪЕСТЬ, ХОТЯ Я НЕВКУСНЫЙ",
        "Факт о моей любимой, жизненный: Моя любимая очень сильная и смелая девушка. В её жизни происходило куча разных неприятных вещей, но при этом, она остаётся такой доброй и очаровательной.",
        "Факт неоспоримый: Моя любимая прекрасная всегда: днём, когда загружена делами, утром, когда она сонная, вечером, когда она уставшая, она прекрасна вне зависимости от обстоятельств))"
    ];

    predictionButton.addEventListener('click', () => {
        predictionButton.classList.add('clicked');
        
        crystalBall.style.transform = 'translateY(-10px)';
        const prediction = predictions[Math.floor(Math.random() * predictions.length)];
        showPrediction(prediction);
        
        setTimeout(() => {
            predictionButton.classList.remove('clicked');
            crystalBall.style.transform = '';
        }, 1000);
    });
}

function showPrediction(text) {
    const predictionText = document.querySelector('.prediction-text');
    if (!predictionText) return;
    
    predictionText.style.opacity = '0';
    predictionText.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        predictionText.textContent = text;
        predictionText.style.opacity = '1';
        predictionText.style.transform = 'translateY(0)';
    }, 300);
}

function createFallingStars() {
    const container = document.querySelector('.falling-stars');
    if (!container) return;
    
    const createStar = () => {
        const star = document.createElement('div');
        
        const left = Math.random() * 100;
        const duration = 3 + Math.random() * 4;
        const size = 3 + Math.random() * 3;
        const trail = 8 + Math.random() * 12;
        star.style.position = 'absolute';
        star.style.top = '-5%';
        star.style.left = `${left}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size * trail}px`;
        star.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)';
        star.style.opacity = '0';
        star.style.transform = 'rotate(45deg)';
        star.style.zIndex = '1';
        star.style.boxShadow = '0 0 20px 2px rgba(255, 255, 255, 0.8)';
        star.style.borderRadius = '50% 50% 0 0';
        star.style.transition = `all ${duration}s ease-in`;
        
        container.appendChild(star);
        
        setTimeout(() => {
            star.style.top = '120%';
            star.style.left = `${left + (Math.random() * 30 - 15)}%`;
            star.style.opacity = '0.8';
        }, 10);
        
        setTimeout(() => {
            star.style.boxShadow = '0 0 40px 5px rgba(255, 255, 255, 0.9)';
            star.style.height = `${size * (trail + 5)}px`;
        }, duration * 300);
        
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    };
    
    for (let i = 0; i < 5; i++) {
        setTimeout(createStar, i * 1000);
    }
    
    setInterval(() => {
        if (Math.random() > 0.6) {
            createStar();
        }
    }, 2000);
}