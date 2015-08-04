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
        } else {
            $scope.selected = resolveOption(option);
        }
    }

    function isDefaultOption(option) {
        var isDefault = option === undefined || option === null || option.value === '';
        return isDefault;
    }

    function isOtherSelected(option) {
        return !isDefaultOption(option) && typeof option.value === 'string' && option.value.toLowerCase() === 'other';
    }

    function setModelFromInput(option) {
        $scope.isOtherSelected = isOtherSelected(option);

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
        $scope.comboModel.value = value;
        $scope.comboModel.text = text;
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
