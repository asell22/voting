angular.module('voting', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .state('form', {
        url: '/new',
        templateUrl: 'partials/form.html',
        controller: 'votingFormCtrl',
        controllerAs: 'form'
      })
      .state('poll', {
        url: '/polls/{id}',
        templateUrl: 'partials/poll.html',
        controller: 'pollCtrl'
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
  self.optionCount = 1;

  self.addOption = function() {
    self.optionObj = {
      name: self.option,
      count: self.optionCount,
      totalVotes: 0
    }
    self.options.push(self.optionObj);
    self.option = '';
    self.optionCount++;
  }
  self.addPoll = function() {
    if (self.options.length > 1) {
      angular.forEach($scope.pollForm.$error.required, function(field) {
        field.$setTouched();
      });

      if ($scope.pollForm.$valid) {
        polls.polls.push(
          {title: self.name, user: self.username, options: self.options}
        )

        $scope.pollForm.$setUntouched();
        this.name = '';
        this.username = '';
        $state.go('home');
      }
    } else {
      angular.element(document).find("h5").addClass('highlight');
    }
  }
})
.controller('pollCtrl', function($scope, polls, $stateParams) {
  $scope.poll = polls.polls[$stateParams.id]
  console.log($scope.poll);
})
