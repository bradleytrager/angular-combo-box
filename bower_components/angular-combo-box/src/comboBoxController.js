angular.module('ngComboBox.controller', [])
    .controller('comboBoxController', ['$scope', '$element', '$timeout', comboBoxController]);

function comboBoxController($scope, $element, $timeout) {
    $scope.setModelFromInput = setModelFromInput;
    if ($scope.comboModel) {
        setInputFromModel($scope.comboModel);
    }

    $scope.$watch('comboModel', function(newValue) {
        var isNotEnteringOtherValue = document.activeElement != $element.find('input')[0];
        if (isNotEnteringOtherValue) {
            setInputFromModel(newValue);
        }
    });

    function setInputFromModel(value) {
        var isDefaultOption = value === null;
        if (isDefaultOption) {
            $scope.selected = '';
            $scope.other = '';
        } else if (isAnOption(value)) {
            $scope.selected = value;
        } else {
            $scope.selected = 'other';
            $scope.other = value;
        }
    }

    function setModelFromInput(value) {
        var isDefaultOption = value === '';
        if (isDefaultOption) {
            $scope.comboModel = null;
            $scope.other = '';
        } else if (isAnOption(value)) {
            $scope.other = '';
            $scope.comboModel = value;
        } else {
            $scope.comboModel = $scope.other;
            $timeout(function() {
                $element.find('input')[0].focus();
            });
        }
    }

    function isAnOption(value) {
        return $scope.options.indexOf(value) !== -1;
    }
}
