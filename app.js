angular.module('voting', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/polls.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .state('form', {
        url: '/new',
        templateUrl: 'partials/form.html',
        controller: 'votingFormCtrl',
        controllerAs: 'form'
      })
      $urlRouterProvider.otherwise('/');
  }
])
.factory('polls', function() {
  var pollsObject = {
    polls : [
      { title: 'poll1', user: 'user1' },
      { title: 'poll2', user: 'user2' },
      { title: 'poll3', user: 'user3' }
    ]
  }

  return pollsObject;
})
.controller('mainCtrl', function($scope, polls) {
  var self = this;
  self.title = "Awesome Voting App";
  self.polls = polls.polls;
})
.controller('votingFormCtrl', function($scope, polls, $state) {
  var self = this;

  self.polls = polls;
  self.count = self.polls.length;
  self.options = [];


  // functions
  self.addOption = function() {
    self.options.push(self.option);
    self.option = '';
  }
  self.addPoll = function() {

    angular.forEach($scope.pollForm.$error.required, function(field) {
      field.$setTouched();
    });

    if ($scope.pollForm.$valid) {
      polls.polls.push(
        {title: self.name, user: self.username}
      )

      $scope.pollForm.$setUntouched();
      this.name = '';
      this.username = '';
      $state.go('home');
    }
  }
})
