angular.module('ngComboBox.controller', [])
    .controller('comboBoxController', ['$scope', '$element', '$timeout', '$filter', comboBoxController]);

function comboBoxController($scope, $element, $timeout, $filter) {
    $scope.setModelFromInput = setModelFromInput;
    $scope.isOtherSelected = false;
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
        var isDefaultOption = option === undefined || option === null || option.value === '';
        var optionAsLimitedSet = null;

        if (option) {
            optionAsLimitedSet = getOption(option.value);
        }

        $scope.isOtherSelected = false;
        if (isDefaultOption) {
            $scope.selected = '';
        } else if (optionAsLimitedSet) {
            $scope.selected = optionAsLimitedSet;
        } else {
            $scope.selected = {
                value: 'other',
                text: $scope.otherTextLabel
            };
            $scope.isOtherSelected = true;
            if (option) {
                $scope.otherText = option.text;
            }
        }
    }

    function setModelFromInput(value) {
        var isDefaultOption = value === '';
        var valueAsOption = getOption(value);
        $scope.isOtherSelected = false;
        if (isDefaultOption) {
            $scope.comboModel = null;
        } else if (valueAsOption) {
            $scope.comboModel = valueAsOption;
        } else {
            $scope.comboModel = {
                value: 'other',
                text: $scope.otherText
            };
            $scope.isOtherSelected = true;
            $timeout(function() {
                $element.find('input')[0].focus();
            });
        }
    }

    function getOption(inputValue) {
        var found = $filter('filter')($scope.options, {
            value: inputValue
        }, true);
        if (found.length > 0) {
            return found[0];
        }
        return null;
    }
}
