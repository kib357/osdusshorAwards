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

    function handleNavCLick (e) {
        e.preventDefault();
        var elementId = e.currentTarget.getAttribute('href').substring(1);
        if (!elementId) {
            return;
        }
        var element = document.getElementById(elementId);
        //window.scrollTo(0, element.offsetTop - 50);
        Velocity(element, "scroll", { offset: -50, mobileHA: false });
        if(history.pushState) {
            history.pushState(null, null, '#' + elementId);
        }
        else {
            location.hash = '#' + elementId;
        }
    }

    var navLinks = document.getElementsByClassName('index-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', handleNavCLick);
    }
})();