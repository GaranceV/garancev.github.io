
const active = 'is-active';

//Animate right hamburger icon and open sidebar
document.querySelectorAll('.right-menu-icon-wrapper').forEach(rightMenu => {
    rightMenu.addEventListener("click", function(e) {
        rightMenu.classList.toggle('open');
        var menu_id = rightMenu.getAttribute('data-target');
        rightMenu.classList.toggle(active);
        document.querySelector("#" + menu_id).classList.toggle(active);
    });
});

// Collapse-expand elements
document.querySelectorAll('.collapsible').forEach(collapsible => {
    collapsible.addEventListener("click", function(e) {
        var elem_id = collapsible.getAttribute('data-target');
        $("#" + elem_id).slideToggle(); //TODO: replace me!
        collapsible.querySelector("i").classList.toggle("fa-angle-down fa-angle-up");
    });
});

//Toggle Tabs
document.querySelectorAll('.tabs li').forEach(li => {
    li.addEventListener("click", function(e){
        li.parentElement.querySelectorAll("li").forEach(function(index, element) {
            element.classList.remove(active)
            var elem_id = element.attr('data-target');
            document.querySelector("#" + elem_id).classList.add("hide");
        });

        var elem_id = li.getAttribute('data-target');
        document.querySelector("#" + elem_id).classList.remove("hide")
        li.classList.add(active)
    });
});

//Animate left hamburger icon and open sidebar
document.querySelectorAll('.left-menu-icon-wrapper').forEach(leftMenu => {
    leftMenu.addEventListener("click", function (e) {
        document.querySelector('.left-menu-icon-wrapper').classList.toggle('open');
        document.querySelector('.sidebar').classList.toggle(active);
    })
});

//Close sidebar
document.querySelector('.sidebar-close').addEventListener("click", function () {
    document.querySelector('.sidebar').classList.remove(active);
    document.querySelector('.left-menu-icon-wrapper').classList.remove('open');
})

//Sidebar menu
if (!!document.querySelector('.sidebar')) {
    document.querySelectorAll(".sidebar-menu > li.have-children a").forEach(menuLink => {
        menuLink.addEventListener("click", function (i) {
            if (!menuLink.parentElement.classList.contains("active")) {
                $(".sidebar-menu li ul").slideUp(); //TODO: replace me!
                menuLink.parentElement.classList.add("active");
            }
            $(this).next().slideToggle();
            document.querySelector(".sidebar-menu li").classList.remove("active");
        });
    });
}

//Navbar Clone
if (!!document.querySelector('#navbar-clone')) {
    window.addEventListener("scroll", function () {    // this will work when your window scrolled.
        var height = $(window).scrollTop();  //getting the scrolling height of window
        if (height > 50) {
            document.querySelector("#navbar-clone").classList.add(active);
        } else {
            document.querySelector("#navbar-clone").classList.remove(active);
        }
    });
}

//Init feather icons
feather.replace();

//reveal elements on scroll so animations trigger the right way
var $window = $(window),
    win_height_padded = $window.height() * 1.1;

window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    var scrolled = $window.scrollTop();
    $(".revealOnScroll:not(.animated)").each(function () {
        var $this = $(this),
            offsetTop = $this.offset().top;

        if (scrolled + win_height_padded > offsetTop) {
            if ($this.data('timeout')) {
                window.setTimeout(function () {
                    $this.addClass('animated ' + $this.data('animation'));
                }, parseInt($this.data('timeout'), 10));
            } else {
                $this.addClass('animated ' + $this.data('animation'));
            }
        }
    });
}

// Back to Top button behaviour
var pxShow = 600;
var debounce_timer;

window.addEventListener("scroll", function () {
    if(debounce_timer) {
        window.clearTimeout(debounce_timer);
    }
    debounce_timer = window.setTimeout(function() {
        if (window.pageYOffset >= 600) {
            document.querySelector("#backtotop").classList.add('visible');
        } else {
            document.querySelector("#backtotop").classList.remove('visible');
        }
    }, 250);
});

document.querySelector('#backtotop a').addEventListener('click', function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

//modals
$('.modal-trigger').on('click', function(){
    var modalID = $(this).attr('data-modal');
    $('#' + modalID).addClass('is-active');
})
$('.modal-close, .close-modal').on('click', function(){
    $(this).closest('.modal').removeClass('is-active');
})

// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    // .click(function (event) {
    .on("click", function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                $('html, body').animate({
                    scrollTop: target.offset().top - ($('#navbar-clone').height() + 5)
                                // '5' added as custom value
                }, 550, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
