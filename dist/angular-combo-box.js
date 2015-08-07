angular.module('ngComboBox.controller', [])
    .controller('comboBoxController', ['$scope', '$element', '$timeout', '$filter', comboBoxController]);

function comboBoxController($scope, $element, $timeout, $filter) {
    $scope.setModelFromInput = setModelFromInput;
    $scope.isOtherSelected = false;
    $scope.otherText = null;
    $scope.isValid = false;

    if ($scope.comboModel) {
        setInputFromModel($scope.comboModel);
    }

    $scope.$watch('comboModel', function(newValue, oldValue) {
        var isNotEnteringOtherValue = document.activeElement != $element.find('input')[0];
        if (isNotEnteringOtherValue) {
            setInputFromModel(newValue || oldValue);
        }
        setIsValid();
    });

    $scope.$watch('required', function(newValue) {
        setIsValid();
    });

    function setIsValid() {
        var isDefaultSelected = isDefaultOption($scope.comboModel);
        var isOtherAndBlank = isOtherSelectedAndBlank($scope.comboModel);
        $scope.isValid = !$scope.required || (!isDefaultSelected && !isOtherAndBlank);
        $scope.comboForm.$setValidity("comboRequired", $scope.isValid);
    }

    function setInputFromModel(option) {
        $scope.isOtherSelected = checkIsOtherSelected(option);
        if (isDefaultOption(option)) {
            $scope.selected = {
                value: ''
            };
        } else {
            if ($scope.isOtherSelected) {
                $scope.otherText = option.text;
            }
            var resolvedOption = resolveOption(option);
            if (resolvedOption === null) {
                // illegal select list option
                $scope.selected = resolveOption({
                    value: 'other'
                });
                $scope.otherText = option.text;
            } else {
                $scope.selected = resolvedOption;
            }
        }
    }

    function setModelFromInput(option) {
        $scope.isOtherSelected = checkIsOtherSelected(option);

        if (isDefaultOption(option)) {
            $scope.comboModel = setComboModel(null, null);
        } else if (!$scope.isOtherSelected) {
            setComboModel(option.value, option.text);
        } else {
            setComboModel('other', $scope.otherText);

            $timeout(function() {
                $element.find('input')[0].focus();
            });
        }
    }

    function setComboModel(value, text) {
        if ($scope.comboModel === null || $scope.comboModel === undefined) {
            $scope.comboModel = {};
        }
        $scope.comboModel = {
            value: value,
            text: text
        };
        setIsValid();
    }

    function isDefaultOption(option) {
        var isDefault = option === undefined || option === null || option.value === '';
        return isDefault;
    }

    function checkIsOtherSelected(option) {
        return !isDefaultOption(option) && typeof option.value === 'string' && option.value.toLowerCase() === 'other';
    }

    function isOtherSelectedAndBlank(option) {
        return checkIsOtherSelected(option) && (option.text === undefined || option.text === null || option.text === '');
    }

    // when model binds to 'other' with free text, need to find the options that matches
    function resolveOption(testOption) {
        var found = $filter('filter')($scope.options, {
            value: testOption.value
        }, true);
        if (found.length > 0) {
            return found[0];
        }
        return null;
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
                selectClass: '=',
                required: '=?',
                isValid: '=?',
                isOtherSelected: '=?',
                otherPlaceholder: '@?'
            },
            templateUrl: 'combo-box.html',
            compile: function(el, attrs) {
                if (!attrs.label) {
                    attrs.label = '';
                }
                if (!attrs.otherPlaceholder) {
                    attrs.otherPlaceholder = '';
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
    "<ng-form name=\"comboForm\">\n" +
    "	<select name=\"comboSelect\" \n" +
    "			ng-model=\"selected\" \n" +
    "			ng-class=\"selectClass\" \n" +
    "			ng-change=\"setModelFromInput(selected)\" \n" +
    "			ng-options=\"option.text for option in options track by option.value\" \n" +
    "			ng-required=\"required\">\n" +
    "		<option value=\"\">{{label}}</option>\n" +
    "	</select>\n" +
    "	<br />\n" +
    "	<input 	name=\"comboText\" \n" +
    "			type=\"text\" \n" +
    "			placeholder=\"{{otherPlaceholder}}\" \n" +
    "			ng-model=\"otherText\" \n" +
    "			ng-class=\"inputClass\" \n" +
    "			ng-change=\"setModelFromInput(selected)\" \n" +
    "			ng-show=\"isOtherSelected\" \n" +
    "			ng-required=\"required && isOtherSelected\" />\n" +
    "</ng-form>\n" +
    "");
}]);
