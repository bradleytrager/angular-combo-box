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
        return !isDefaultOption(option) && option.value === 'other';
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
