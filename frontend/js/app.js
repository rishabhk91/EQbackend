// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "frontend/views/template.html",
            controller: 'HomeCtrl'
        })
       
        .state('category', {
            url: "/category/:categoryUrlSlug",
            templateUrl: "frontend/views/template.html",
            controller: 'categoryCtrl'
        })
         .state('categoryl2', {
            url: "/category/:categoryUrlSlug/:categoryl2UrlSlug",
            templateUrl: "frontend/views/template.html",
            controller: 'categoryl2Ctrl'
        })
         .state('categoryl3', {
            url: "/category/:categoryl2UrlSlug/:categoryl3UrlSlug",
            templateUrl: "frontend/views/template.html",
            controller: 'orientationCtrl'
        })
           .state('products', {
            url: "/products/:categoryl3UrlSlug",
            templateUrl: "frontend/views/template.html",
            controller: 'productsCtrl'
        })
        .state('airway-management', {
            url: "/airway-management",
            templateUrl: "frontend/views/template.html",
            controller: 'airwayCtrl'
        })
        .state('myAccount', {
            url: "/myaccount",
            templateUrl: "frontend/views/template.html",
            controller: 'myaccountCtrl'
        })
        .state('myCart', {
            url: "/mycart",
            templateUrl: "frontend/views/template.html",
            controller: 'mycartCtrl'
        })
        .state('privacyPolicy', {
            url: "/privacypolicy",
            templateUrl: "frontend/views/template.html",
            controller: 'privacyCtrl'
        })
        .state('checkout', {
            url: "/checkout",
            templateUrl: "frontend/views/template.html",
            controller: 'checkoutCtrl'
        })
        .state('contact', {
            url: "/contact",
            templateUrl: "frontend/views/template.html",
            controller: 'contactCtrl'
        })
        .state('form', {
            url: "/form",
            templateUrl: "frontend/views/template.html",
            controller: 'FormCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});


firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='frontend/img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };
});
firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width !== "") {
            other += "&width=" + width;
        }
        if (height && height !== "") {
            other += "&height=" + height;
        }
        if (style && style !== "") {
            other += "&style=" + style;
        }
        if (input) {
            return imgpath + "?file=" + input + other;
        }
    };
});

firstapp.directive('fancybox', function ($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
                target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,
                padding: 0,
                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstapp.directive('autoHeight', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            $element.css("min-height", windowHeight);
        }
    };
});

firstapp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});