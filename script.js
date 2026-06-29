document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times (close)
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            header.classList.add('scrolled'); // Ensure background is visible when menu is open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            if (window.scrollY <= 50) {
                header.classList.remove('scrolled');
            }
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const fadeSections = document.querySelectorAll('.fade-in-section');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: Only animate once
            }
        });
    }, revealOptions);

    fadeSections.forEach(section => {
        revealObserver.observe(section);
    });

    // 4. Active Navigation Link Update on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
});

// SMS 발송 기능 (고객 스마트폰의 문자 앱 호출)
function sendSMS() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // 문자에 자동으로 채워질 내용 구성
    const bodyText = `[벨루스톤 체험문의]\n이름: ${name}\n연락처: ${phone}\n내용: ${message}`;
    
    // 안드로이드/아이폰 호환을 위해 텍스트 인코딩
    const encodedBody = encodeURIComponent(bodyText);
    
    // 사장님 번호로 문자앱 호출 (010-3650-5955)
    // 기기에 따라 ?body= 또는 &body= 를 사용하지만 최신 표준인 ?body= 사용
    const smsLink = `sms:01036505955?body=${encodedBody}`;
    
    // 문자 앱 실행
    window.location.href = smsLink;
}
