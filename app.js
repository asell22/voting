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
      { title: 'poll1', user: 'user1', options: [{count: 1, name: "option 1", totalVotes: 4},{count: 2, name: "option 2", totalVotes: 3}] },
      { title: 'poll2', user: 'user2', options: [{count: 1, name: "option 1", totalVotes: 13},{count: 2, name: "option 2", totalVotes: 2}] },
      { title: 'poll3', user: 'user3', options: [{count: 1, name: "option 1", totalVotes: 2},{count: 2, name: "option 2", totalVotes: 15}]}
    ]
  }

  return pollsObject;
})
.directive('hcPieChart', function() {
  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
      title: '@',
      data: '='
    },
    link: function(scope, element) {
      Highcharts.chart(element[0], {
        chart: {
          type: 'pie'
        },
        title: {
          text: scope.title
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          data: scope.data
        }]
      })
    }
  }
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
          {title: self.name, user: self.username, data: self.options}
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
  $scope.poll = polls.polls[$stateParams.id];
  $scope.increment = function(option) {
    option.totalVotes++;
  }
  $scope.pieData = [];
  // console.log($scope.poll);
  angular.forEach($scope.poll.options, function(val) {
    $scope.pieData.push(
      {name: val.name, y: val.totalVotes}
    )
  })
})
