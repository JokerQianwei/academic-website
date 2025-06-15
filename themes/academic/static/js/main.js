// 主要 JavaScript 功能

document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    initMobileNavigation();

    // 平滑滚动
    initSmoothScrolling();

    // 图片懒加载
    initLazyLoading();

    // 返回顶部按钮
    initBackToTop();

    // 搜索功能
    initSearch();

    // Apple 风格增强功能
    initAppleEnhancements();
});

// 移动端导航菜单
function initMobileNavigation() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // 切换汉堡菜单动画
            const spans = navbarToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navbarMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // 点击菜单项时关闭移动端菜单
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                const spans = navbarToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// 平滑滚动
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 图片懒加载
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 返回顶部按钮
function initBackToTop() {
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTopBtn);
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    let searchIndex = [];
    
    // 构建搜索索引
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
        })
        .catch(error => {
            console.log('搜索索引加载失败:', error);
        });
    
    // 搜索功能
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchIndex.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.content.toLowerCase().includes(query) ||
                   (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));
        }).slice(0, 5);
        
        displaySearchResults(results, query);
    });
    
    // 显示搜索结果
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">未找到相关结果</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item">
                    <h4><a href="${result.permalink}">${highlightText(result.title, query)}</a></h4>
                    <p>${highlightText(truncateText(result.content, 100), query)}</p>
                </div>
            `).join('');
        }
        
        searchResults.style.display = 'block';
    }
    
    // 高亮搜索关键词
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // 截断文本
    function truncateText(text, length) {
        return text.length > length ? text.substring(0, length) + '...' : text;
    }
    
    // 点击外部关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// 论文筛选功能
function initPublicationFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publications = document.querySelectorAll('.publication-item');
    
    if (filterButtons.length === 0 || publications.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选论文
            publications.forEach(pub => {
                const pubYear = pub.getAttribute('data-year');
                
                if (year === 'all' || pubYear === year) {
                    pub.style.display = 'block';
                    // 添加淡入动画
                    pub.style.opacity = '0';
                    setTimeout(() => {
                        pub.style.opacity = '1';
                    }, 100);
                } else {
                    pub.style.display = 'none';
                }
            });
            
            // 更新 URL 参数
            const url = new URL(window.location);
            if (year === 'all') {
                url.searchParams.delete('year');
            } else {
                url.searchParams.set('year', year);
            }
            window.history.replaceState({}, '', url);
        });
    });
    
    // 从 URL 参数初始化筛选
    const urlParams = new URLSearchParams(window.location.search);
    const yearParam = urlParams.get('year');
    
    if (yearParam) {
        const targetButton = document.querySelector(`[data-year="${yearParam}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                const value = input.value.trim();
                const errorElement = input.nextElementSibling;
                
                if (!value) {
                    isValid = false;
                    input.classList.add('error');
                    
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.textContent = '此字段为必填项';
                    }
                } else {
                    input.classList.remove('error');
                    
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.textContent = '';
                    }
                }
                
                // 邮箱验证
                if (input.type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        input.classList.add('error');
                        
                        if (errorElement && errorElement.classList.contains('error-message')) {
                            errorElement.textContent = '请输入有效的邮箱地址';
                        }
                    }
                }
            });
            
            if (isValid) {
                // 提交表单
                console.log('表单验证通过，可以提交');
                // 这里可以添加实际的表单提交逻辑
            }
        });
    });
}

// 工具函数
const utils = {
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 获取元素距离顶部的距离
    getOffset: function(element) {
        let offsetTop = 0;
        while (element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    }
};

// Apple 风格增强功能
function initAppleEnhancements() {
    // 滚动时导航栏效果
    initScrollNavbar();

    // 页面元素动画
    initScrollAnimations();

    // 卡片悬停效果增强
    initCardHoverEffects();

    // 按钮点击涟漪效果
    initRippleEffect();

    // 视差滚动效果
    initParallaxEffect();
}

// 滚动时导航栏效果
function initScrollNavbar() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    if (!header) return;

    window.addEventListener('scroll', utils.throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            header.style.transform = 'translateY(0)';
        }

        // 添加滚动时的背景模糊效果
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'saturate(180%) blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.backdropFilter = 'saturate(180%) blur(20px)';
        }

        lastScrollTop = scrollTop;
    }, 16));
}

// 页面元素滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in, .animate-scale-in');

    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        if (el.classList.contains('animate-fade-in-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('animate-scale-in')) {
            el.style.transform = 'scale(0.9)';
        }
        observer.observe(el);
    });
}

// 卡片悬停效果增强
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .member-card, .research-item, .news-item, .publication-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // 添加鼠标移动视差效果
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

// 按钮点击涟漪效果
function initRippleEffect() {
    // 添加涟漪效果样式
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 视差滚动效果
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', utils.throttle(function() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16));
}

// 页面加载完成后初始化论文筛选
window.addEventListener('load', function() {
    initPublicationFilter();
    initFormValidation();
});
