angular.module('ngComboBox', [])
    .directive('comboBox', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                comboModel: '=',
                otherLabel: '@?',
                label: '@?'
            },
            template: '<select ng-model="selected" ng-change="optionChanged(selected)">' +
                '    <option value="">{{label}}</option>' +
                '    <option ng-repeat="option in options">{{option}}</option>' +
                '    <option value="other" ng-bind="otherLabel"></option>' +
                '</select>' +
                '<br />' +
                '<input type="text" ng-model="other" ng-change="optionChanged(selected)" ng-show="selected === \'other\'" />',
            compile: function(el, attrs) {
                if (!attrs.otherLabel) {
                    attrs.otherLabel = 'Other';
                }
                if (!attrs.label) {
                    attrs.label = '';
                }
            },
            controller: 'comboBoxController'
        };
    })
    .controller('comboBoxController', ['$scope', '$element', '$timeout',
        function($scope, $element, $timeout) {
            $scope.optionChanged = setComboModel;
            if ($scope.comboModel) {
                setInput($scope.comboModel);
            }

            $scope.$watch('comboModel', function(v) {
                setInput(v);
            });

            function setInput(value) {
                if(value === null || value === "") {
                    $scope.selected = '';
                    $scope.other = '';
                } else if ($scope.options.indexOf(value) !== -1) {
                    $scope.selected = value;
                } else {
                    $scope.selected = 'other';
                    $scope.other = value;

                }
            }

            function setComboModel(option) {
                if (option !== 'other') {
                    $scope.other = '';
                    $scope.comboModel = option;
                } else {
                    $scope.comboModel = $scope.other;
                    $timeout(function() {
                        $element.find('input')[0].focus();
                    });
                }
            }
        }
    ]);