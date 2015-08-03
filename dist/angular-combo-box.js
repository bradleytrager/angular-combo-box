angular.module('ngComboBox.controller', [])
    .controller('comboBoxController', ['$scope', '$element', '$timeout', '$filter', comboBoxController]);

function comboBoxController($scope, $element, $timeout, $filter) {
    $scope.setModelFromInput = setModelFromInput;
    $scope.isOtherSelected = false;
    $scope.otherText = null;

    if ($scope.comboModel) {
        setInputFromModel($scope.comboModel);
    }

    $scope.$watch('comboModel', function(newValue) {
        var isNotEnteringOtherValue = document.activeElement != $element.find('input')[0];
        if (isNotEnteringOtherValue) {
            setInputFromModel(newValue);
        }
    });

    function setInputFromModel(option) {
        $scope.isOtherSelected = isOtherSelected(option);
        if (isDefaultOption(option)) {
            $scope.selected = {
                value: ''
            };
        }
    }

    function isDefaultOption(option) {
        var isDefault = option === undefined || option === null || option.value === '';
        return isDefault;
    }

    function isOtherSelected(option) {
        return !isDefaultOption(option) && option.value.toLowerCase() === 'other';
    }

    function setModelFromInput(option) {
        $scope.isOtherSelected = isOtherSelected(option);

        if (isDefaultOption(option)) {
            $scope.comboModel = null;
        } else if (!$scope.isOtherSelected) {
            $scope.comboModel = option;
        } else {
            $scope.comboModel = {
                value: 'other',
                text: $scope.otherText
            };
            $timeout(function() {
                $element.find('input')[0].focus();
            });
        }
    }
}

angular.module('ngComboBox.directive', [])
    .directive('comboBox', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                comboModel: '=',
                label: '@?',
                inputClass: '=',
                selectClass: '='
            },
            templateUrl: 'combo-box.html',
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
    });

angular.module('ngComboBox', [
    'ngComboBox.directive',
    'ngComboBox.controller',
    'templates-main'
]);

angular.module('templates-main', ['combo-box.html']);

angular.module("combo-box.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("combo-box.html",
    "<select ng-model=\"selected\" ng-class=\"selectClass\" ng-change=\"setModelFromInput(selected)\"  ng-options=\"option.text for option in options\" >\n" +
    "    <option value=\"\">{{label}}</option>\n" +
    "</select>\n" +
    "<br />\n" +
    "<input type=\"text\" placeholder=\"Other\" ng-model=\"otherText\" ng-class=\"inputClass\" ng-change=\"setModelFromInput(selected)\" ng-show=\"isOtherSelected\" />\n" +
    "");
}]);
