angular.module('voting', [])
.controller('votingCtrl', function() {
  var self = this;
  this.title = "Awesome Voting App";
  this.polls = [
    { title: 'poll1', user: 'user1' },
    { title: 'poll2', user: 'user2' },
    { title: 'poll3', user: 'user3' },
    { title: 'poll4', user: 'user4' },
    { title: 'poll5', user: 'user5' },
    { title: 'poll6', user: 'user6' },
  ];
  this.count = this.polls.length;
  this.addPoll = function() {
    this.count++;
    this.polls.push(
      {title: `poll${this.count}`, user: `user${this.count}`}
    )
  }
})
