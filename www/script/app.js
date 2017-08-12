'use strict';
angular.module('app', ['firebase'])
.controller('HomeCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($scope, $firebaseObject, $firebaseArray, $firebaseAuth) {
    var ref = firebase.database().ref();    
     var auth = $firebaseAuth();
     console.log(auth);
    // $scope.inquiries= ref.getAuth() ? $firebaseArray(formref):false;
    
    //goods 
    $scope.banner = {
        lead: "welcome",
        heading: "We are the Ruffians."
    };

    // TODO
    // $scope.services = {
    //     "heading": "SERVICES",
    //     "subhead": "",
    //     "sections": [{
    //         "title": "title title title",
    //         "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."
    //     }, {
    //         "title": "Responsive Design",
    //         "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."
    //     }, {
    //         "title": "title title title",
    //         "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."
    //     }]
    // };

    // TODO
    $scope.scholarship = {
        "heading": "Scholarship Heading",
        "subhead": "schorlarshipu",
        "title":"titleeee",
        "description":"descriptionnn"
    };

    // TODO
    $scope.classes = {
        "heading": "Classes",
        "subhead": "join is for an awesome class",
    };


    $scope.form = {};
    var obj = $firebaseObject(ref);
    obj.$loaded()
        .then(function(data) {
            console.log(data.banner);
            $scope.banner = data.banner;
            $scope.about = data.about;
            $scope.people = data.people;
            $scope.pillars= data.pillars;
            $scope.classes = data.classes;
            $scope.why=data.why;
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
    $scope.openmodal = function(clicked) {
        if (!$scope.logged) {
            return;
        }
        $scope.clicked = clicked;
        $scope.area = $scope[clicked];
        $('#modal').modal('show');
    };



    $scope.update = function() {
        var child = ref.child($scope.clicked);
        var update = JSON.parse(angular.toJson($scope.area));
        child.update(update);
        $scope.clicked = "";
        $scope.area = {};
        $('#modal').modal('hide');
    };
    $scope.loginPopup = function() {
        $('#login').modal('show');
    };
    $scope.submit = function() {
        if (!$scope.form.email && !$scope.form.number) {
            alert("Data could not be saved. Please enter a phone number or email");
            return;
        }
        formref.push({
            name: $scope.form.name,
            email: $scope.form.email || "no email",
            number: $scope.form.number || "no number",
            message: $scope.form.message || "no message",
            date:  Date.now()
        }).then(function() {
            var name = $scope.form.name;
            alert('Thank you, ' + name + ', we will be in touch!');
            $scope.form = {};
            $scope.$digest();
        });
    };
    $scope.login = function() {

        auth.$signInWithEmailAndPassword($scope.login.email, $scope.login.password).then(function(firebaseUser) {
            $scope.firebaseUser = firebaseUser;
            console.log("dehh");
            // $scope.inquiries= $firebaseArray(formref);
            $scope.login = {};
            $('#login').modal('hide');
            $scope.logged = true;
        }).catch(function(error) {
            console.log(error);
        });
    };
}]);
