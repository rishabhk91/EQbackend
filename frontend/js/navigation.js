var uploadurl = adminurl + "upload/";
var imgpath = uploadurl + "readFile";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
     var navigation = [
         //{
    //     name: "icu orientation",
    //     classis: "active",
    //     anchor: "icu-orientation",
    //     subnav: []
    //         // subnav: [{
    //         //     name: "Subnav1",
    //         //     classis: "active",
    //         //     anchor: "home"
    //         // }]
    // }, {
    //     name: "primary exam",
    //     classis: "active",
    //     anchor: "form",
    //     subnav: []
    // }, {
    //     name: "icu fellowship exam",
    //     classis: "active",
    //     anchor: "form",
    //     subnav: []
    // }, {
    //     name: "edic",
    //     classis: "active",
    //     anchor: "form",
    //     subnav: []
    // }, {
    //     name: "intensive care nursing",
    //     classis: "active",
    //     anchor: "form",
    //     subnav: []
    // },
     ];

    return {
        
    getnav: function(callback) {
           return callback;
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

      callApi: function (url, callback) {
        $http.post(adminurl + url).then(function (data) {
          data = data.data;
          callback(data);
        });
      },
       getMyNav: function (callback) {
        $http.post(adminurl + 'Category/search').then(function (data) {
          data = data.data.data.results;
          callback(data);
        });
      },
       apiCallWithData: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },

    };
});