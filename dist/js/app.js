/**
 * Created by kib357 on 15/07/15.
 */

(function () {
    'use strict';

    var body = document.body,
        scrollTimer,
        slideTimer,
        slidesCount = 6,
        nextSlideInterval = 7000;

    var showSlide = function (slideNumber) {
        var slides = document.getElementsByClassName('c-slide');
        var indicators = document.getElementsByClassName('c-indicator');
        for (var i = 0; i < slides.length; i++) {
            if (i == (slideNumber || 0)) {
                slides[i].classList.add('active');
                indicators[i].classList.add('active');
            } else {
                slides[i].classList.remove('active');
                indicators[i].classList.remove('active');
            }
        }

        clearTimeout(slideTimer);
        slideTimer = setTimeout(nextSlide, nextSlideInterval);
    };

    var prevSlide = function () {
        var slides = document.getElementsByClassName('c-slide');
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('active')) {
                showSlide(i - 1 >= 0 ? i - 1 : slidesCount - 1);
                return;
            }
        }
    };
    var nextSlide = function () {
        var slides = document.getElementsByClassName('c-slide');
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('active')) {
                showSlide(i + 1 < slidesCount ? i + 1 : 0);
                return;
            }
        }
    };

    setTimeout(showSlide, 30);

    var indicatorClick = function (e) {
        var indicator = e.target;
        if (indicator) {
            var slideNumber = indicator.getAttribute('data-slide-to');
            showSlide(slideNumber);
        }
    };

    var indicators = document.getElementsByClassName('c-indicator');
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener('click', indicatorClick);
    }
    var cPrev = document.getElementById('c-prev');
    var cNext = document.getElementById('c-next');
    cPrev.addEventListener('click', prevSlide);
    cNext.addEventListener('click', nextSlide);


    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        if(!body.classList.contains('disable-hover')) {
            body.classList.add('disable-hover')
        }

        scrollTimer = setTimeout(function(){
            body.classList.remove('disable-hover')
        },500);
    }, false);

    window.addEventListener('load', function() {
        var elementId = window.location.hash.substring(1);
        if (!elementId) {
            return;
        }
        var element = document.getElementById(elementId);
        if (element) {
            window.scrollTo(0, element.offsetTop - 50);
        }
    });

    var navLinks = document.getElementsByClassName('index-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', handleNavCLick);
    }

    var navToggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('nav');
    navToggle.addEventListener('click', function () {
        if (nav.classList.contains('collapse')) {
            nav.classList.remove('collapse');
        } else {
            nav.classList.add('collapse');
        }
    });

    function handleNavCLick (e) {
        e.preventDefault();
        var elementId = e.currentTarget.getAttribute('href').substring(1);
        if (!elementId) {
            return;
        }
        var element = document.getElementById(elementId);
        if (element) {
            window.scrollTo(0, element.offsetTop - 50);
            //Velocity(element, "scroll", { offset: -50, mobileHA: false });
            if (history.pushState) {
                history.pushState(null, null, '#' + elementId);
            }
            else {
                location.hash = '#' + elementId;
            }
        }
        nav.classList.add('collapse');
    }

    window.addEventListener('hashchange', function() {
        nav.classList.add('collapse');
    });
})();