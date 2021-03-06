jQuery(function ($) {
    "use strict";

    /* ========================================================================= */
    /*	Page Preloader
    /* ========================================================================= */

    $(window).on('load', function () {
        $('.preloader').fadeOut(100);
    });

    /* ========================================================================= */
    /*	Portfolio Filtering Hook
    /* =========================================================================  */

    var containerEl = document.querySelector('.shuffle-wrapper');
    if (containerEl) {
        var Shuffle = window.Shuffle;
        var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
            itemSelector: '.shuffle-item',
            buffer: 1
        });

        jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
            var input = evt.currentTarget;
            if (input.checked) {
                myShuffle.filter(input.value);
            }
        });
    }
    /* ========================================================================= */
    /*	Testimonial Carousel
    /* =========================================================================  */

    $("#testimonials").slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });

    /* ========================================================================= */
    /*	Animated section
    /* ========================================================================= */

    var wow = new WOW({
        offset: 100, // distance to the element when triggering the animation (default is 0)
        mobile: false // trigger animations on mobile devices (default is true)
    });

    var scrolled = false;
    $(window).on('scroll', function () {
        if (!scrolled) {
            scrolled = true;
            wow.init();
        }
    })


    /* ========================================================================= */
    /*	animation scroll js
    /* ========================================================================= */

    var html_body = $('html, body');
    $('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                html_body.animate({
                    scrollTop: target.offset().top - 70
                }, 1500, 'easeInOutExpo');
                return false;
            }
        }
    });

    // easeInOutExpo Declaration
    jQuery.extend(jQuery.easing, {
        easeInOutExpo: function (x, t, b, c, d) {
            if (t === 0) {
                return b;
            }
            if (t === d) {
                return b + c;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    });

    /* ========================================================================= */

    /*	counter up
    /* ========================================================================= */
    function counter() {
        var oTop;
        if ($('.count').length !== 0) {
            oTop = $('.count').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            $('.count').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    }

    $(window).on('scroll', function () {
        counter();
    });

    /* ========================================================================= */

    /*	Google Map Customization
    /* =========================================================================  */

    function initialize() {

        var latitude = $('#map-canvas').attr('data-latitude');
        var longitude = $('#map-canvas').attr('data-longitude');
        var myLatLng = new google.maps.LatLng(latitude, longitude);

        var roadAtlasStyles = [{
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#2F3238"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#FFFFFF"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#50525f"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#808080"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#808080"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#3071a7"
            }, {
                "saturation": -65
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#bbbbbb"
            }]
        }];

        var mapOptions = {
            zoom: 14,
            center: myLatLng,
            disableDefaultUI: true,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'roadatlas']
            }
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: '',
        });


        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        var styledMapOptions = {
            name: 'US Road Atlas'
        };

        var usRoadMapType = new google.maps.StyledMapType(
            roadAtlasStyles, styledMapOptions);

        map.mapTypes.set('roadatlas', usRoadMapType);
        map.setMapTypeId('roadatlas');
    }

    //google.maps.event.addDomListener(window, "load", initialize)

    let openDialog;

    $(function () {
        let blocks = $(".content-block")
        if (!blocks) {
            return
        }
        blocks.each(function (index) {
            var element = $(this)
            var overfullBox = element.find(".overflow-box")
            var tooltip = element.find(".dialog")
            overfullBox.show()
            element.addClass("overflow")
            var dialogClass = element.attr("class").split(/\s+/).find(value => {
                if (value !== "content-block" && value.endsWith("-block")) {
                    return value
                }
            })
            dialogClass = dialogClass.replace("-block", "-dialog")
            tooltip.dialog({
                buttons: [],
                modal: true,
                closeText: "",
                classes: {
                    "ui-dialog": dialogClass,
                    "ui-dialog-titlebar": "ui-corner-all no-close",
                },
                draggable: false,
                autoOpen: false,
                show: {
                    effect: "blind",
                    duration: 500
                },
                position: {my: "center", at: "center", of: element}
            })
            element.on("click", function (event) {
                if (openDialog) {
                    openDialog.dialog("close")
                }
                if (tooltip.dialog("isOpen")) {
                    tooltip.dialog("close")
                } else {
                    tooltip.dialog("open")
                    openDialog = tooltip
                    event.stopPropagation()
                    $(window).on("click", function () {
                        tooltip.dialog("close")
                    })
                }
            })
            tooltip.on("click", function () {
                tooltip.dialog("close")
            })
        })
    })

    $(function () {
        var blocks = $(".site-notice-member")
        blocks.each(function (index) {
            var element = $(this)
            var trigger = element.find(".site-notice-location-pin")
            var dialogContent = element.find(".site-notice-address")
            dialogContent.dialog({
                buttons: [],
                modal: true,
                closeText: "",
                minHeight: "10em",
                classes: {
                    "ui-dialog": "overflow-dialog",
                    "ui-dialog-titlebar": "ui-corner-all no-close dialog-titlebar-invisible",
                },
                draggable: false,
                autoOpen: false,
                show: {
                    effect: "blind",
                    duration: 500
                },
                position: {my: "center", at: "center", of: element}
            })
            trigger.on("click", function (event) {
                if (openDialog) {
                    openDialog.dialog("close")
                }
                if (dialogContent.dialog("isOpen")) {
                    dialogContent.dialog("close")
                } else {
                    dialogContent.dialog("open")
                    openDialog = dialogContent
                    event.stopPropagation()
                    $(window).on("click", function () {
                        dialogContent.dialog("close")
                    })
                }
            })
            dialogContent.on("click", function () {
                dialogContent.dialog("close")
            })
        })
    })

    $(".contact-send-email").on("click", function() {
        var mailAddress = $(this).find(".hidden-content").text().replace(/\s*\(.+\)\s*/, "@")
        var address = "mailto:" + mailAddress
        window.location.href = address;
    })

    $(".contact-send-email").css('cursor', 'pointer')
})
