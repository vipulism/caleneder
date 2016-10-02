angular.module('calendarDemoApp', ['ionic', 'ngAnimate', 'ui.rCalendar'])
    .run(function($ionicPlatform, $animate) {
        'use strict';
        $animate.enabled(false);
    })
    .config(function($stateProvider, $urlRouterProvider) {
        'use strict';
        $stateProvider
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.home', {
                url: '/home?date',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/home.html',
                        controller: 'CalendarDemoCtrl'
                    }
                }
            })
            .state('tabs.notification', {
                url: '/notification',
                views: {
                    'notification-tab': {
                        templateUrl: 'templates/notification.html',
                        controller: 'notificationCtrl'
                    }
                }
            })
            .state('tabs.people', {
                url: '/people',
                views: {
                    'people-tab': {
                        templateUrl: 'templates/people.html',
                        controller: 'CalendarDemoCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/home');
    })

.controller('CalendarDemoCtrl', function($scope, $state, $stateParams) {
    'use strict';
    $scope.calendar = {};


    $scope.changeMode = function(mode) {
        $scope.calendar.mode = mode;
    };

    $scope.loadEvents = function() {
        $scope.calendar.eventSource = createRandomEvents();
    };
    

    function tes () {
        // body...
    }

    $scope.onEventSelected = function(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    };

    $scope.onViewTitleChanged = function(title) {
        $scope.viewTitle = title;
    };

    $scope.today = function(btn) {
        
        
        if(typeof $stateParams.date == 'undefined' || btn == 'clicked'){
            $scope.calendar.currentDate = new Date();
        }else {
            $scope.calendar.currentDate = new Date($stateParams.date);
        }
    };

    /*----------  this function is used to show day of user in calender  ----------*/
    $scope.showMyDate = function (date) {
       $state.go('tabs.home', {date:date});
    }

    $scope.isToday = function() {
        var today = new Date(),
            currentCalendarDate = new Date($scope.calendar.currentDate);

        today.setHours(0, 0, 0, 0);
        currentCalendarDate.setHours(0, 0, 0, 0);
        // today.setUTCHours(0, 15, 0, 0);
        // currentCalendarDate.setUTCHours(8, 15, 0, 0);
        return today.getTime() === currentCalendarDate.getTime();
    };

    $scope.onTimeSelected = function(selectedTime, events) {
        console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
    };

    $scope.totleEvents = [

            {
                "title": "Raju",
                "startTime": "2016-10-03T00:00:00.000Z",
                "endTime": "2016-10-04T00:00:00.000Z",
                "allDay": true,
                "duplicateEvent": false
            },{
                "title": "Kale",
                "startTime": "2016-10-08T00:00:00.000Z",
                "endTime": "2016-10-09T00:00:00.000Z",
                "allDay": true,
                "duplicateEvent": false
            },{
                "title": "Gopi",
                "startTime": "2016-10-09T00:00:00.000Z",
                "endTime": "2016-10-10T00:00:00.000Z",
                "allDay": true,
                "duplicateEvent": false
            },{
                "title": "Gopi",
                "startTime": "2016-10-20T00:00:00.000Z",
                "endTime": "2016-10-21T00:00:00.000Z",
                "allDay": true,
                "duplicateEvent": false
            }
        ];

    
    $scope.showDates = function(MyTitle) {
        if ($scope.isActiveDates(MyTitle)) {

            $scope.showAllDates = null;
        } else {
            $scope.showAllDates = MyTitle;
        }
    };
    $scope.isActiveDates = function(MyTitle) {
        return $scope.showAllDates === MyTitle;
    };

    $scope.uniPeople = function () {
        
        return _.uniqBy($scope.totleEvents, 'title');
    }

    $scope.comnPeople = function (myTitle) {
        return _.filter($scope.totleEvents, ['title', myTitle])
    }

    $scope.countMyDays = function (myTitle) {
        return $scope.comnPeople(myTitle).length
    };

    function createRandomEvents() {


        var events =  $scope.totleEvents

        var setNextEvent = function() {



            for (var i = 0; i < events.length; i++) {

                if (!events[i].duplicateEvent) {

                    var realStartDate = new Date(events[i].startTime);
                    var realEndDate = new Date(events[i].endTime);
                    var newEvent = {
                        "title": events[i].title + 2,
                        "startTime": realStartDate.add(300).days(),
                        "endTime": realEndDate.add(300).days(),
                        "allDay": true,
                        "duplicateEvent": true
                    }

                    events.push(newEvent)
                }
            }

        }
        setNextEvent();



        /*for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }*/
        return events;
    }
    if($state.current.name == 'tabs.home'){ $scope.loadEvents(); $scope.today()}
}).controller('notificationCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {

    


}]);
