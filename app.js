angular.module('voting', [])
.controller('votingCtrl', function($scope) {
  var self = this;
  self.title = "Awesome Voting App";
  self.polls = [
    { title: 'poll1', user: 'user1' },
    { title: 'poll2', user: 'user2' },
    { title: 'poll3', user: 'user3' },
    { title: 'poll4', user: 'user4' },
    { title: 'poll5', user: 'user5' },
    { title: 'poll6', user: 'user6' },
  ];
  self.count = this.polls.length;
  self.addPoll = function($event) {
    if (!self.name || !self.username) {
      $event.preventDefault();
    }


    self.polls.push(
      {title: self.name, user: self.username}
    )
    $scope.pollForm.$setUntouched();
    this.name = '';
    this.username = '';

  }
})
