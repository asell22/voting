angular.module('voting', [])
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
.controller('votingCtrl', function($scope, polls) {
  var self = this;
  self.title = "Awesome Voting App";
  self.polls = polls.polls;
  self.count = this.polls.length;
  self.addPoll = function() {
    angular.forEach($scope.pollForm.$error.required, function(field) {
      field.$setTouched();
    });

    if ($scope.pollForm.$valid) {
      self.polls.push(
        {title: self.name, user: self.username}
      )

      $scope.pollForm.$setUntouched();
      this.name = '';
      this.username = '';
    }
  }
})
