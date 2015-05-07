angular.module('ngComboBox.controller', [])
    .controller('comboBoxController', ['$scope', '$element', '$timeout', comboBoxController]);

function comboBoxController($scope, $element, $timeout) {
    $scope.optionChanged = setComboModel;
    if ($scope.comboModel) {
        setInput($scope.comboModel);
    }

    $scope.$watch('comboModel', function(newValue) {
        setInput(newValue);
    });

    function setInput(value) {
        if (value === null) {
            $scope.selected = '';
            $scope.other = '';
        } else if ($scope.options.indexOf(value) !== -1 && document.activeElement != $element.find('input')[0]) {
            $scope.selected = value;
        } else {
            $scope.selected = 'other';
            $scope.other = value;
        }
    }

    function setComboModel(option) {
        if (option === '') {
            $scope.other = '';
            $scope.comboModel = null;
        } else if (option !== 'other') {
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
