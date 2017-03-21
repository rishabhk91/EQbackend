angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui.swiper'])

    .controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        $scope.template = TemplateService.changecontent("home"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Home"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getMyNav(function (data) {
            $scope.navigation = data;
        });

        $scope.mySlides = [
            'frontend/img/banner/bg-home.jpg',
            'frontend/img/banner/bg-home.jpg',
            'frontend/img/banner/bg-home.jpg',
            'frontend/img/banner/bg-home.jpg'
        ];
        console.log("m in homecntr")
        //   NavigationService.callApi("Category/search", function (data) {
        //         navigationFromDb =[];
        //       data.data.results.forEach(function(element) {
        //         console.log("element--",element) 
        //         element.anchor= _.kebabCase(element.name)
        //         navigationFromDb.push(element);
        //       }, this);
        //       $scope.navigation=navigationFromDb;
        //   console.log(" $scope.navigation--", $scope.navigation);
        // });


    })

    .controller('FormCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("form"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Form"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getMyNav(function (data) {
            $scope.navigation = data;
        });
        $scope.formSubmitted = false;

        $scope.submitForm = function (data) {
            console.log(data);
            $scope.formSubmitted = true;
        }
    })
    .controller('categoryl2Ctrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("orientation"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("orientation"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getMyNav(function (data) {
            $scope.navigation = data;
        });
        $scope.formData = {};
        $scope.formData.myslug = $stateParams.categoryl2UrlSlug;
        NavigationService.callApi("CategoryLevel2/search", function (data1) {
            if (data1.value === true) {
                console.log(data1)
                $scope.category2 = data1.data.results;
                console.log("$scope.category2--", $scope.category2)
                NavigationService.apiCallWithData("CategoryLevel3/findByCategoryLevel2", $scope.formData, function (data) {
                    if (data.value === true) {
                        console.log(data)
                        $scope.categoryLevel3 = _.chunk(data.data, 2);
                        console.log("$scope.categoryLevel3--->>>", $scope.categoryLevel3[0][0].categoryLevel2.name)
                        $scope.categoryLvl2 = _.remove($scope.category2, function (n) {
                            return n.name != $scope.categoryLevel3[0][0].categoryLevel2.name;
                        });
                        console.log($scope.categoryLvl2)
                        $scope.categoryLvl2 = _.chunk($scope.categoryLvl2, 3);
                    } else {
                        //  toastr.warning('Error submitting the form', 'Please try again');
                    }
                });
            } else {
                //  toastr.warning('Error submitting the form', 'Please try again');
            }
        });


        $scope.buyNowCategoryL3 = function (productData) {
            $scope.formData = {};
            $scope.formData.productForm = [];
            var prod = {};
            prod.categoryLevel3 = productData
            $scope.formData.productForm.push(prod)
            NavigationService.apiCallWithData("Cart/save", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("m saved")
                }
            });

        }
        $scope.imgSection = [{
            image: "frontend/img/orientation/ori-img-1.jpg",
            title: "Airway Management",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem illum dolor iure fugiat praesentium,ut repudiandae dolorum nobis, nemo tempora ullam quas odit qui autem assumenda molestias.Quos,quisquam, eligendi."
        }, {
            image: "frontend/img/orientation/ori-img-2.jpg",
            title: "Blood Test",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem illum dolor iure fugiat praesentium,ut repudiandae dolorum nobis, nemo tempora ullam quas odit qui autem assumenda molestias.Quos,quisquam, eligendi."
        }, {
            image: "frontend/img/orientation/ori-img-3.jpg",
            title: "Cardiology",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem illum dolor iure fugiat praesentium,ut repudiandae dolorum nobis, nemo tempora ullam quas odit qui autem assumenda molestias.Quos,quisquam, eligendi."
        }, {
            image: "frontend/img/orientation/ori-img-4.jpg",
            title: "ct surgery",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem illum dolor iure fugiat praesentium,ut repudiandae dolorum nobis, nemo tempora ullam quas odit qui autem assumenda molestias.Quos,quisquam, eligendi."
        }, {
            image: "frontend/img/orientation/ori-img-5.jpg",
            title: "Cardiology",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem illum dolor iure fugiat praesentium,ut repudiandae dolorum nobis, nemo tempora ullam quas odit qui autem assumenda molestias.Quos,quisquam, eligendi."
        }, {
            image: "frontend/img/orientation/ori-img-6.jpg",
            title: "ct surgery",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem illum dolor iure fugiat praesentium,ut repudiandae dolorum nobis, nemo tempora ullam quas odit qui autem assumenda molestias.Quos,quisquam, eligendi."
        }]
        console.log('$scope.imgSection ', $scope.imgSection);
        $scope.myArray = _.chunk($scope.imgSection, 2);
        console.log('$scope.myArray ', $scope.myArray);

        $scope.imgFootscetion = [{
                image: "frontend/img/orientation/switch-img-1.jpg",
                thumbnail: "advanced"
            }, {
                image: "frontend/img/orientation/switch-img-2.jpg",
                thumbnail: "cardiothoracic icu rotation"
            }, {
                image: "frontend/img/orientation/switch-img-3.jpg",
                thumbnail: "european diploma in intensice care preparation pack"
            }
            //  {
            //     image: "frontend/img/orientation/switch-img-1.jpg",
            //     thumbnail: "image2"
            // }, {
            //     image: "frontend/img/orientation/switch-img-2.jpg",
            //     thumbnail: "image3"
            // }
        ]
        $scope.footerArray = _.chunk($scope.imgFootscetion, 3);
    })
    .controller('categoryCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("icu-orientation"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("ICU Orientation"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getMyNav(function (data) {
            $scope.navigation = data;
        });

        console.log($stateParams.categoryUrlSlug);
        $scope.formData = {};
        $scope.formData.myslug = $stateParams.categoryUrlSlug;
        NavigationService.apiCallWithData("CategoryLevel2/findByCategory", $scope.formData, function (data) {
            if (data.value === true) {
                console.log(data)
                $scope.categoryLevel2 = _.chunk(data.data, 2);
                console.log("formData", $scope.categoryLevel2)
            } else {
                //  toastr.warning('Error submitting the form', 'Please try again');
            }
        });


    })
    .controller('productsCtrl', function ($scope, $stateParams, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("airway-management"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Airway Management"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        NavigationService.getMyNav(function (data) {
            $scope.navigation = data;
        });
        $scope.formData = {};
        $scope.formData.myslug = $stateParams.categoryl3UrlSlug;
        NavigationService.callApi("CategoryLevel3/search", function (data1) {
            if (data1.value === true) {
                $scope.categoryLevel3 = data1.data.results;
                NavigationService.apiCallWithData("ProductForm/findByCategoryLevel3", $scope.formData, function (data) {
                    if (data.value === true) {
                        console.log(data)
                        $scope.minProductPrice = _.minBy(data.data, 'price')
                        console.log("$scope.minPrice", $scope.minProductPrice)
                        $scope.productList = _.chunk(data.data, 3);
                        console.log("formData", data.data[0].categoryLevel3.name);
                        $scope.categoryLvl3 = _.dropWhile($scope.categoryLevel3, ['name', data.data[0].categoryLevel3.name]);
                        console.log("categoryLvl3", $scope.categoryLvl3)
                        $scope.categoryLvl3 = _.chunk($scope.categoryLvl3, 4);
                    } else {
                        //  toastr.warning('Error submitting the form', 'Please try again');
                    }
                });
            } else {
                //  toastr.warning('Error submitting the form', 'Please try again');
            }
        });
        $scope.buyNowproductForm = function (productData) {
            $scope.formData = {};
            $scope.formData.productForm = [];
            var prod = {};
            prod.productForm = productData
            $scope.formData.productForm.push(prod)
            NavigationService.apiCallWithData("Cart/save", $scope.formData, function (data) {
                if (data.value === true) {
                    console.log("m saved")
                }
            });

        }


        // ng-repeat for button
        $scope.btnSection = [{
            name: "Airway Management-I",
            btnname: "buy for $3"
        }, {
            name: "Airway Management-II",
            btnname: "buy for $3"
        }, {
            name: "Airway Management-III",
            btnname: "buy for $3"
        }, {
            name: "Airway Management-IV",
            btnname: "buy for $3"
        }, {
            name: "Airway Management-V",
            btnname: "buy for $3"
        }, {
            name: "Airway Management-VI",
            btnname: "buy for $3"
        }]
        $scope.btnrepeat = _.chunk($scope.btnSection, 3);
        // ng-repeat for footsection
        $scope.imgFootscetion = [{
            image: "frontend/img/airway/airway-img-1.png",
            thumbnail: "blood test"
        }, {
            image: "frontend/img/airway/airway-img-2.png",
            thumbnail: "ct surgery"
        }, {
            image: "frontend/img/airway/airway-img-3.png",
            thumbnail: "cardiology"
        }, {
            image: "frontend/img/airway/airway-img-4.png",
            thumbnail: "haematology"
        }]

        $scope.footerArray = _.chunk($scope.imgFootscetion, 4);

    })
    .controller('myaccountCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("myaccount"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("My Account"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        // $scope.viewPackage = false;
        // $scope.showPackage = function () {
        //     $scope.viewPackage = true;
        //     $scope.viewProfile = false;
        // }

        // $scope.viewProfile = false;
        // $scope.showProfile = function () {
        //     $scope.viewProfile = true;
        //     $scope.viewPackage = false;
        // }
        // $scope.viewProfile = true;
        // $scope.viewPackage = false;
        // $scope.showProfile = function () {
        //     if ($scope.viewProfile == true) {
        //         $scope.viewProfile = false;
        //         $scope.viewPackage = true;
        //     } else {
        //         $scope.viewProfile = true;
        //         $scope.viewPackage = false;
        //     }

        // }
        $scope.packageBought = [{
            serial: "01",
            image: "frontend/img/myaccount/airway-img-4.png",
            description: "Orientation - Haematology",
            price: "49.99$",
            data: "20 Oct 2016"
        }, {
            serial: "02",
            image: "frontend/img/myaccount/switch-img-2.jpg",
            description: "Cardiothoracic ICU Rotation - Generic",
            price: "49.99$",
            data: "20 Oct 2016"
        }, {
            serial: "03",
            image: "frontend/img/myaccount/airway-img-2.png",
            description: "Orientation - CT Surgery",
            price: "49.99$",
            data: "20 Oct 2016"
        }, {
            serial: "04",
            image: "frontend/img/myaccount/airway-img-3.png",
            description: "Cardiothoracic ICU Rotation - Generic",
            price: "49.99$",
            data: "20 Oct 2016"
        }, {
            serial: "05",
            image: "frontend/img/myaccount/airway-img-1.png",
            description: "Orientation - CT Surgery",
            price: "49.99$",
            data: "20 Oct 2016"
        }]

    })
    .controller('mycartCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("mycart"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("My Cart"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.myCart = [{
            serial: "01",
            image: "frontend/img/myaccount/airway-img-4.png",
            particulars: "Orientation - Haematology",
            amount: "49.99$",
            total: "49.99$"
        }, {
            serial: "02",
            image: "frontend/img/myaccount/switch-img-2.jpg",
            particulars: "Cardiothoracic ICU Rotation - Generic",
            amount: "49.99$",
            total: "49.99$"
        }, {
            serial: "03",
            image: "frontend/img/myaccount/airway-img-2.png",
            particulars: "Orientation - CT Surgery",
            amount: "49.99$"
        }]
    })
    .controller('privacyCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("privacypolicy"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Privacy Policy"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('contactCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("contact"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Contact"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })
    .controller('checkoutCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
        $scope.template = TemplateService.changecontent("checkout"); //Use same name of .html file
        $scope.menutitle = NavigationService.makeactive("Checkout"); //This is the Title of the Website
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.myCart = [{
            serial: "01",
            image: "frontend/img/myaccount/airway-img-4.png",
            particulars: "Orientation - Haematology",
            amount: "49.99$",
            total: "51.99$"
        }, {
            serial: "02",
            image: "frontend/img/myaccount/switch-img-2.jpg",
            particulars: "Cardiothoracic ICU Rotation - Generic",
            amount: "49.99$",
            total: "61.99$"
        }, {
            serial: "03",
            image: "frontend/img/myaccount/airway-img-2.png",
            particulars: "Orientation - CT Surgery",
            amount: "49.99$",
            total: "71.99$"
        }]

    })
    .controller('headerctrl', function ($scope,$state, TemplateService, $uibModal,NavigationService) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });
        $.fancybox.close(true);
        console.log("in header");
        $scope.openSignupModal = function () {
            console.log("clla");
            $uibModal.open({
                animation: true,
                templateUrl: 'frontend/views/modal/signup.html',
                scope: $scope,
                size: 'lg',
                windowClass: 'modal-content-radi0'
            });
        };
        $scope.signUp = function (signupForm) {
            console.log("signupForm", signupForm)
            if (signupForm) {
                NavigationService.apiCallWithData("User/registerUser", signupForm, function (data) {
                    if (data.value === true) {
                        $scope.signupForm = {};
                       // toastr.success('Signed up Successfully !', 'Thank you');
                        $state.go('home');
                    } else {
                        console.log('Sign up Unsuccessfull!', 'Sorry')
                       // toastr.warning('Sign up Unsuccessfull!', 'Sorry');
                    }
                });

            } else {
                //toastr.warning('Please agree Terms of Service and Privacy and Policy', 'Sorry');
            }
        };
         $scope.doLogin = function (formData) {
            console.log(formData);
            if (formData) {
                NavigationService.apiCallWithData("User/login",formData, function (data) {
                    if (data.value === true) {
                        $.jStorage.set('user', data.data);
                         $.jStorage.set("accessToken", data.data.accessToken[0]);
                        
                       // toastr.success('You have been successfully logged in', 'Login Success');
                        $state.go('home');
                    } else if (data.value === false) {
                       // toastr.warning(data.error.message, 'Login Failure');
                    } else {
                       // toastr.warning('Something went wrong', 'Please try again');
                    }
                });
            }
        };
    })

    .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };


    })

;