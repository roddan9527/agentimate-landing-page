document.addEventListener('DOMContentLoaded', function() {
    // 初始化动画
    initAnimations();
    
    // 初始化标签页切换
    initTabs();
    
    // 添加浮动设计元素
    createFloatingDesigns();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 初始化设计画布动画序列
    initCanvasAnimation();
    
    // 初始化动画演示
    initAnimationDemo();
});

// 初始化滚动触发的动画
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    // 初始检查元素是否在视口中
    checkElementsInViewport();
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        checkElementsInViewport();
    });
    
    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('show-animation');
                }, delay * 1000);
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
}

// 初始化标签页切换
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有 tab 按钮的 active 类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的 active 类
            this.classList.add('active');
            
            // 获取目标标签页
            const targetTab = this.getAttribute('data-tab');
            
            // 隐藏所有标签页内容
            const allGalleries = document.querySelectorAll('.example-gallery');
            allGalleries.forEach(gallery => gallery.classList.remove('active'));
            
            // 显示目标标签页内容
            const targetGallery = document.getElementById(targetTab);
            if (targetGallery) {
                targetGallery.classList.add('active');
                
                // 重新触发子元素的动画
                const animatedItems = targetGallery.querySelectorAll('[data-animation]');
                animatedItems.forEach(item => {
                    item.classList.remove('show-animation');
                    setTimeout(() => {
                        item.classList.add('show-animation');
                    }, 100);
                });
            }
        });
    });
}

// 创建浮动设计元素
function createFloatingDesigns() {
    const floatingContainer = document.querySelector('.floating-designs');
    if (!floatingContainer) return;
    
    const designShapes = [
        { type: 'rectangle', color: 'rgba(99, 102, 241, 0.2)' },
        { type: 'circle', color: 'rgba(139, 92, 246, 0.2)' },
        { type: 'triangle', color: 'rgba(236, 72, 153, 0.2)' },
        { type: 'rectangle', color: 'rgba(16, 185, 129, 0.2)' },
        { type: 'circle', color: 'rgba(99, 102, 241, 0.2)' },
        { type: 'triangle', color: 'rgba(139, 92, 246, 0.2)' },
    ];
    
    designShapes.forEach((shape, index) => {
        const element = document.createElement('div');
        element.classList.add('floating-shape', shape.type);
        element.style.backgroundColor = shape.color;
        
        // 随机位置
        element.style.left = `${Math.random() * 90}%`;
        element.style.top = `${Math.random() * 90}%`;
        
        // 随机大小
        const size = 30 + Math.random() * 70;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // 随机动画延迟
        element.style.animationDelay = `${index * 0.5}s`;
        
        floatingContainer.appendChild(element);
    });
    
    // 添加 CSS
    const style = document.createElement('style');
    style.textContent = `
        .floating-shape {
            position: absolute;
            opacity: 0.7;
            border-radius: 4px;
            animation: float 15s ease-in-out infinite alternate;
        }
        
        .circle {
            border-radius: 50%;
        }
        
        .triangle {
            width: 0 !important;
            height: 0 !important;
            background-color: transparent !important;
            border-left: 25px solid transparent;
            border-right: 25px solid transparent;
            border-bottom: 50px solid rgba(139, 92, 246, 0.2);
        }
        
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            33% {
                transform: translate(30px, -50px) rotate(10deg);
            }
            66% {
                transform: translate(-20px, 20px) rotate(-5deg);
            }
            100% {
                transform: translate(10px, -10px) rotate(5deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 初始化设计画布动画序列
function initCanvasAnimation() {
    const designCanvas = document.querySelector('.design-canvas');
    if (!designCanvas) return;
    
    // 添加3D悬停效果
    designCanvas.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = mouseY * -0.01;
        const rotateY = mouseX * 0.01;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    designCanvas.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
    });
    
    // 自动播放动画序列
    function restartCanvasAnimation() {
        // 重置所有动画元素
        const ideaBubble = designCanvas.querySelector('.idea-bubble');
        const agentWorking = designCanvas.querySelector('.agent-working');
        const resultPreview = designCanvas.querySelector('.result-preview');
        
        if (ideaBubble) {
            ideaBubble.style.animation = 'none';
            ideaBubble.offsetHeight; // 触发回流
            ideaBubble.style.animation = 'fadeInUp 0.5s 0.5s forwards';
        }
        
        if (agentWorking) {
            agentWorking.style.animation = 'none';
            agentWorking.offsetHeight; // 触发回流
            agentWorking.style.animation = 'fadeIn 0.5s 1.5s forwards';
        }
        
        if (resultPreview) {
            resultPreview.style.animation = 'none';
            resultPreview.offsetHeight; // 触发回流
            resultPreview.style.animation = 'fadeInUp 0.5s 3s forwards, shimmer 2s 3s infinite linear';
        }
        
        // 10秒后重新开始动画
        setTimeout(restartCanvasAnimation, 10000);
    }
    
    // 启动自动播放
    restartCanvasAnimation();
}

// 自适应导航栏
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 添加自适应导航栏的CSS
(function() {
    const style = document.createElement('style');
    style.textContent = `
        nav {
            transition: all 0.3s ease;
        }
        
        nav.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 1rem 2rem;
        }
        
        /* 添加移动端菜单按钮 */
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-color);
                cursor: pointer;
            }
            
            .nav-links {
                display: none;
                width: 100%;
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
            }
            
            .nav-links.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
})();

// 添加移动端菜单
(function() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
        
        // 在小屏幕上显示菜单按钮
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        function handleScreenChange(e) {
            if (e.matches) {
                if (!nav.contains(mobileMenuBtn)) {
                    nav.insertBefore(mobileMenuBtn, navLinks);
                }
            } else {
                if (nav.contains(mobileMenuBtn)) {
                    nav.removeChild(mobileMenuBtn);
                }
                navLinks.classList.remove('active');
            }
        }
        
        mediaQuery.addEventListener('change', handleScreenChange);
        handleScreenChange(mediaQuery);
    }
})();

// 初始化动画演示部分
function initAnimationDemo() {
    const generateButton = document.getElementById('generate-animation');
    const effectsSlider = document.getElementById('effects-level');
    const effectsValue = document.getElementById('effects-value');
    const animationPrompt = document.getElementById('animation-prompt');
    const animationStatus = document.querySelector('.animation-status');
    const progressBar = document.querySelector('.progress');
    const planetScene = document.querySelector('.planet-scene');
    
    // 更新特效级别显示
    if (effectsSlider && effectsValue) {
        effectsSlider.addEventListener('input', function() {
            effectsValue.textContent = this.value;
        });
    }
    
    // 处理生成按钮点击
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            // 重置进度条动画
            if (progressBar) {
                progressBar.style.animation = 'none';
                progressBar.offsetHeight; // 触发重排
                progressBar.style.animation = 'progress 3s ease-in-out forwards';
            }
            
            // 显示处理状态
            if (animationStatus) {
                const statusIndicator = animationStatus.querySelector('.status-indicator');
                if (statusIndicator) {
                    statusIndicator.className = 'status-indicator processing';
                    statusIndicator.querySelector('.text').textContent = 'AI正在创建您的动画...';
                }
            }
            
            // 模拟动画生成过程
            setTimeout(function() {
                createCustomAnimation(animationPrompt.value);
                
                // 更新状态为完成
                if (animationStatus) {
                    const statusIndicator = animationStatus.querySelector('.status-indicator');
                    if (statusIndicator) {
                        statusIndicator.className = 'status-indicator complete';
                        statusIndicator.querySelector('.text').textContent = '动画已生成完成!';
                    }
                }
            }, 3000);
        });
    }
    
    // 创建自定义小行星带
    createAsteroidBelt();
    
    // 创建星星背景
    createStars();
}

// 创建小行星带
function createAsteroidBelt() {
    const asteroidBelt = document.querySelector('.asteroid-belt');
    if (!asteroidBelt) return;
    
    // 创建100个小行星
    for (let i = 0; i < 100; i++) {
        const asteroid = document.createElement('div');
        asteroid.classList.add('asteroid');
        
        // 随机大小和位置
        const size = 1 + Math.random() * 3;
        const angle = Math.random() * 360;
        const distance = 100 + Math.random() * 80;
        const delay = Math.random() * 5;
        
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;
        asteroid.style.backgroundColor = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
        asteroid.style.borderRadius = '50%';
        asteroid.style.position = 'absolute';
        asteroid.style.top = '50%';
        asteroid.style.left = '50%';
        asteroid.style.transform = `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`;
        asteroid.style.animation = `twinkle ${3 + Math.random() * 2}s infinite alternate ${delay}s`;
        
        asteroidBelt.appendChild(asteroid);
    }
}

// 创建星星背景
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    // 创建200个星星
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 随机大小和位置
        const size = 0.5 + Math.random() * 1.5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = 0.3 + Math.random() * 0.7;
        const delay = Math.random() * 5;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.position = 'absolute';
        star.style.top = `${posY}%`;
        star.style.left = `${posX}%`;
        star.style.opacity = opacity;
        star.style.animation = `twinkle ${1 + Math.random() * 3}s infinite alternate ${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// 根据输入创建动画
function createCustomAnimation(promptText) {
    const animationCanvas = document.querySelector('.animation-canvas');
    if (!animationCanvas) return;
    
    const animationStyle = document.getElementById('animation-style')?.value || 'cartoon';
    const effectsLevel = document.getElementById('effects-level')?.value || 5;
    
    // 清除当前内容
    const currentScene = animationCanvas.querySelector('.planet-scene');
    if (currentScene) {
        // 保留当前场景，但添加过渡效果
        currentScene.style.transition = 'all 0.5s ease';
        currentScene.style.opacity = 0;
        currentScene.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            currentScene.style.opacity = 1;
            currentScene.style.transform = 'scale(1)';
            
            // 根据用户输入更改场景
            updateSceneBasedOnPrompt(promptText, currentScene, animationStyle, effectsLevel);
        }, 500);
    }
}

// 根据用户输入更新场景
function updateSceneBasedOnPrompt(prompt, scene, style, effectsLevel) {
    // 提取关键词
    const keywords = extractKeywords(prompt.toLowerCase());
    
    // 地球默认颜色
    let planetColor1 = '#6bbdff';
    let planetColor2 = '#365cff';
    let orbitColor = 'rgba(255, 255, 255, 0.3)';
    let satelliteColor = 'rgba(255, 255, 255, 0.9)';
    let bgColor1 = '#0a0118';
    let bgColor2 = '#12014a';
    
    // 基于关键词修改场景
    if (keywords.includes('火星') || keywords.includes('红色') || keywords.includes('mars')) {
        planetColor1 = '#ff6b4a';
        planetColor2 = '#d64636';
        bgColor1 = '#120101';
        bgColor2 = '#4a0101';
    } else if (keywords.includes('金星') || keywords.includes('黄色') || keywords.includes('venus')) {
        planetColor1 = '#ffd166';
        planetColor2 = '#ffaa00';
        bgColor1 = '#251701';
        bgColor2 = '#3a2500';
    } else if (keywords.includes('海王星') || keywords.includes('蓝色') || keywords.includes('neptune')) {
        planetColor1 = '#41a4f5';
        planetColor2 = '#2547ff';
        bgColor1 = '#010e25';
        bgColor2 = '#01134a';
    }
    
    // 应用样式和效果级别
    if (style === 'abstract') {
        // 抽象风格
        scene.style.filter = `saturate(${150 + effectsLevel * 20}%) hue-rotate(${effectsLevel * 10}deg)`;
    } else if (style === 'realistic') {
        // 写实风格
        scene.style.filter = `contrast(${100 + effectsLevel * 5}%) brightness(${100 - effectsLevel * 3}%)`;
    } else if (style === 'lowpoly') {
        // 低多边形风格
        scene.style.filter = `contrast(${120 + effectsLevel * 5}%) saturate(${80 + effectsLevel * 5}%)`;
    } else {
        // 卡通风格 (默认)
        scene.style.filter = `saturate(${110 + effectsLevel * 10}%) brightness(${100 + effectsLevel * 3}%)`;
    }
    
    // 更新行星颜色
    const planet = scene.querySelector('.planet');
    if (planet) {
        planet.style.background = `radial-gradient(circle at 30% 30%, ${planetColor1}, ${planetColor2})`;
    }
    
    // 更新轨道颜色
    const orbits = scene.querySelectorAll('.orbit');
    orbits.forEach(orbit => {
        orbit.style.borderColor = orbitColor;
    });
    
    // 更新卫星颜色
    const satellites = scene.querySelectorAll('.satellite');
    satellites.forEach(satellite => {
        satellite.style.backgroundColor = satelliteColor;
    });
    
    // 更新背景颜色
    const spaceBg = scene.querySelector('.space-bg');
    if (spaceBg) {
        spaceBg.style.background = `linear-gradient(to bottom, ${bgColor1}, ${bgColor2})`;
    }
    
    // 添加额外元素
    addExtraElementsBasedOnPrompt(prompt, scene);
}

// 从提示中提取关键词
function extractKeywords(prompt) {
    // 简单的关键词提取
    const words = prompt.split(/\s+/);
    return words.filter(word => word.length > 1);
}

// 根据提示添加额外元素
function addExtraElementsBasedOnPrompt(prompt, scene) {
    const keywords = extractKeywords(prompt.toLowerCase());
    
    // 检查关键词并添加对应元素
    if (prompt.includes('彗星') || prompt.includes('comet')) {
        addComet(scene);
    }
    
    if (prompt.includes('流星') || prompt.includes('meteor')) {
        addMeteorShower(scene);
    }
    
    if (prompt.includes('黑洞') || prompt.includes('black hole')) {
        addBlackHole(scene);
    }
    
    if (prompt.includes('太阳') || prompt.includes('sun')) {
        addSun(scene);
    }
}

// 添加彗星
function addComet(scene) {
    // 移除现有彗星
    const existingComets = scene.querySelectorAll('.comet');
    existingComets.forEach(comet => comet.remove());
    
    const comet = document.createElement('div');
    comet.classList.add('comet');
    comet.style.position = 'absolute';
    comet.style.width = '4px';
    comet.style.height = '4px';
    comet.style.backgroundColor = 'white';
    comet.style.borderRadius = '50%';
    comet.style.boxShadow = '0 0 20px 10px rgba(255, 255, 255, 0.3)';
    comet.style.top = '20%';
    comet.style.left = '20%';
    comet.style.zIndex = '10';
    
    // 彗星尾巴
    const tail = document.createElement('div');
    tail.style.position = 'absolute';
    tail.style.top = '50%';
    tail.style.left = '50%';
    tail.style.width = '100px';
    tail.style.height = '2px';
    tail.style.background = 'linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent)';
    tail.style.transform = 'translate(-5%, -50%) rotate(45deg)';
    tail.style.transformOrigin = 'left center';
    
    comet.appendChild(tail);
    scene.appendChild(comet);
    
    // 彗星动画
    comet.animate([
        { top: '0%', left: '0%' },
        { top: '100%', left: '100%' }
    ], {
        duration: 7000,
        iterations: Infinity
    });
}

// 添加流星雨
function addMeteorShower(scene) {
    // 移除现有流星
    const existingMeteors = scene.querySelectorAll('.meteor');
    existingMeteors.forEach(meteor => meteor.remove());
    
    // 创建10个流星
    for (let i = 0; i < 10; i++) {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        meteor.style.position = 'absolute';
        meteor.style.width = '2px';
        meteor.style.height = '2px';
        meteor.style.backgroundColor = 'white';
        meteor.style.borderRadius = '50%';
        meteor.style.boxShadow = '0 0 10px 4px rgba(255, 255, 255, 0.3)';
        
        // 随机位置和延迟
        const top = -10 + Math.random() * 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        
        meteor.style.top = `${top}%`;
        meteor.style.left = `${left}%`;
        meteor.style.zIndex = '5';
        
        // 流星尾巴
        const tail = document.createElement('div');
        tail.style.position = 'absolute';
        tail.style.top = '50%';
        tail.style.left = '50%';
        tail.style.width = '30px';
        tail.style.height = '1px';
        tail.style.background = 'linear-gradient(to left, rgba(255, 255, 255, 0.5), transparent)';
        tail.style.transform = 'translate(-5%, -50%) rotate(45deg)';
        tail.style.transformOrigin = 'left center';
        
        meteor.appendChild(tail);
        scene.appendChild(meteor);
        
        // 流星动画
        meteor.animate([
            { top: `${top}%`, left: `${left}%` },
            { top: '120%', left: `${left + 20}%` }
        ], {
            duration: 2000 + Math.random() * 3000,
            delay: delay * 1000,
            iterations: Infinity
        });
    }
}

// 添加黑洞
function addBlackHole(scene) {
    // 移除现有黑洞
    const existingBlackHoles = scene.querySelectorAll('.black-hole');
    existingBlackHoles.forEach(hole => hole.remove());
    
    const blackHole = document.createElement('div');
    blackHole.classList.add('black-hole');
    blackHole.style.position = 'absolute';
    blackHole.style.width = '80px';
    blackHole.style.height = '80px';
    blackHole.style.borderRadius = '50%';
    blackHole.style.background = 'radial-gradient(circle at center, rgba(0, 0, 0, 0.9) 30%, rgba(75, 0, 130, 0.6) 70%)';
    blackHole.style.boxShadow = '0 0 30px 10px rgba(138, 43, 226, 0.4)';
    blackHole.style.top = '25%';
    blackHole.style.left = '75%';
    blackHole.style.transform = 'translate(-50%, -50%)';
    blackHole.style.zIndex = '10';
    
    // 添加事件视界效果
    const eventHorizon = document.createElement('div');
    eventHorizon.style.position = 'absolute';
    eventHorizon.style.top = '50%';
    eventHorizon.style.left = '50%';
    eventHorizon.style.width = '200%';
    eventHorizon.style.height = '200%';
    eventHorizon.style.borderRadius = '50%';
    eventHorizon.style.background = 'transparent';
    eventHorizon.style.border = '2px solid rgba(138, 43, 226, 0.3)';
    eventHorizon.style.transform = 'translate(-50%, -50%)';
    eventHorizon.style.animation = 'pulse 3s infinite alternate';
    
    blackHole.appendChild(eventHorizon);
    scene.appendChild(blackHole);
}

// 添加太阳
function addSun(scene) {
    // 移除现有太阳
    const existingSuns = scene.querySelectorAll('.sun');
    existingSuns.forEach(sun => sun.remove());
    
    const sun = document.createElement('div');
    sun.classList.add('sun');
    sun.style.position = 'absolute';
    sun.style.width = '100px';
    sun.style.height = '100px';
    sun.style.borderRadius = '50%';
    sun.style.background = 'radial-gradient(circle at center, rgba(255, 255, 190, 1) 0%, rgba(255, 155, 0, 0.8) 50%, rgba(255, 0, 0, 0.4) 100%)';
    sun.style.boxShadow = '0 0 50px 20px rgba(255, 200, 0, 0.6)';
    sun.style.top = '80%';
    sun.style.left = '20%';
    sun.style.transform = 'translate(-50%, -50%)';
    sun.style.zIndex = '9';
    
    // 太阳光晕
    const corona = document.createElement('div');
    corona.style.position = 'absolute';
    corona.style.top = '50%';
    corona.style.left = '50%';
    corona.style.width = '140%';
    corona.style.height = '140%';
    corona.style.borderRadius = '50%';
    corona.style.background = 'radial-gradient(circle at center, rgba(255, 200, 0, 0.3) 0%, rgba(255, 100, 0, 0.1) 70%, transparent 100%)';
    corona.style.transform = 'translate(-50%, -50%)';
    corona.style.animation = 'pulse 4s infinite alternate';
    
    sun.appendChild(corona);
    scene.appendChild(sun);
}

// 初始化搜索输入组件
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = new SearchInput();
    const searchContainer = document.getElementById('searchContainer');
    if (searchContainer) {
        searchContainer.appendChild(searchInput.getElement());
    }
}); 