describe('angular combo box', function() {
    var $scope, $compile, $timeout;

    beforeEach(function() {

        module('ngComboBox');
        inject(function(_$compile_, $rootScope, _$timeout_) {
            $scope = $rootScope;
            $compile = _$compile_;
            $timeout = _$timeout_;
        });

    });

    describe('basic functionality', function() {
        it('does not set a value initially', function() {
            $scope.comboModel = null;
            var elem = compileDirective();
            expect(elem.find('select').val()).toBe('');
            expect($scope.comboModel).toBe(null);
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
        });

        it('sets the value for a given option and hides other input', function() {
            $scope.comboModel = 'one';
            var elem = compileDirective();
            expect(elem.find('select').val()).toBe('one');
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
        });

        it('sets the value for another option and shows other input', function() {
            $scope.comboModel = 'something else';
            var elem = compileDirective();
            expect(elem.find('select').val()).toBe('other');
            expect(elem.find('input').val()).toBe('something else');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
        });

        it('sets an alternative value', function() {
            $scope.comboModel = 'one';
            var elem = compileDirective();
            elem.find('select').val('other').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
            elem.find('input').val('something else').triggerHandler('change');
            expect($scope.comboModel).toBe('something else');
        });

        it('sets a given option', function() {
            $scope.comboModel = 'something else';
            var elem = compileDirective();
            elem.find('select').val('one').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
            expect($scope.comboModel).toBe('one');
        });

        it('focuses on the other input when the other option is chosen', function() {
            $scope.comboModel = null;
            var elem = compileDirective();
            document.body.appendChild(elem[0]);
            elem.find('select').val('other').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
            var input = elem.find('input');
            $timeout.flush();
            expect(document.activeElement).toBe(input[0]);
            elem.remove();
        });

        it('does not select option if user types', function() {
            $scope.comboModel = null;
            var elem = compileDirective();
            document.body.appendChild(elem[0]);
            elem.find('select').val('other').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
            var input = elem.find('input');
            $timeout.flush();
            expect(document.activeElement).toBe(input[0]);
            elem.find('input').val('one').triggerHandler('change');
            var select = elem.find('select')[0];
            expect(select.options[select.selectedIndex].innerHTML).toBe('Other');
            elem.remove();
        });
    });

    describe('passing a custom value for "other"', function() {
        it('uses "Other" by default', function() {
            var elem = compileDirective();
            var options = elem.find('option');
            var otherLabel = options[options.length - 1].innerHTML;
            expect(otherLabel).toBe('Other');
        });

        it('sets a custom value if provided', function() {
            var elem = compileDirective(angular.element('<combo-box ' +
                'options="options" ' +
                'combo-model="comboModel"' +
                'other-label="Something Else"></combo-box>'));
            var options = elem.find('option');
            var otherLabel = options[options.length - 1].innerHTML;
            expect(otherLabel).toBe('Something Else');
        });
    });

    describe('passing a custom value for the label', function() {
        it('uses "Other" by default', function() {
            var elem = compileDirective(angular.element('<combo-box ' +
                'label="my custom label"' +
                'options="options" ' +
                'combo-model="comboModel"></combo-box>'));
            var options = elem.find('option');
            var otherLabel = options[0].innerHTML;
            expect(otherLabel).toBe('my custom label');
        });
    });

    describe('updating the model from a controller', function() {
        it('updates the select box if the value is an option', function() {
            $scope.comboModel = null;
            var elem = compileDirective();
            $scope.comboModel = 'one';
            $scope.$digest();
            expect(elem.find('select').val()).toBe('one');
        });

        it('updates the select box if the value is not an option', function() {
            $scope.comboModel = null;
            var elem = compileDirective();
            $scope.comboModel = 'something else';
            $scope.$digest();
            expect(elem.find('select').val()).toBe('other');
            expect(elem.find('input').val()).toBe('something else');
        });

        it('resets the combo box', function() {
            var elem = compileDirective(angular.element('<combo-box ' +
                'label="my custom label"' +
                'options="options" ' +
                'combo-model="comboModel"></combo-box>'));
            $scope.comboModel = 'one';
            $scope.$digest();
            expect(elem.find('select').val()).toBe('one');
            $scope.comboModel = null;
            $scope.$digest();
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
            var select = elem.find('select')[0];
            expect(select.options[select.selectedIndex].innerHTML).toBe('my custom label');
        });

        it('resets the combo box with other value', function() {
            $scope.comboModel = null;
            var elem = compileDirective(angular.element('<combo-box ' +
                'label="my custom label"' +
                'options="options" ' +
                'combo-model="comboModel"></combo-box>'));
            $scope.comboModel = 'something else';
            $scope.$digest();
            expect(elem.find('select').val()).toBe('other');
            expect(elem.find('input').val()).toBe('something else');
            $scope.comboModel = null;
            $scope.$digest();
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
            var select = elem.find('select')[0];
            expect(select.options[select.selectedIndex].innerHTML).toBe('my custom label');
        });

        it('resets the combo box with blank other value', function() {
            $scope.comboModel = null;
            var elem = compileDirective(angular.element('<combo-box ' +
                'label="my custom label"' +
                'options="options" ' +
                'combo-model="comboModel"></combo-box>'));
            elem.find('select').val('other').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(false);
            $scope.comboModel = null;
            $scope.$digest();
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
            var select = elem.find('select')[0];
            expect(select.options[select.selectedIndex].innerHTML).toBe('my custom label');
        });

    });

    describe('edge cases', function() {
        it('does not swith to other when defualt is selected', function() {
            $scope.comboModel = null;
            var elem = compileDirective();
            elem.find('select').val('one').triggerHandler('change');
            expect(elem.find('input').hasClass('ng-hide')).toBe(true);
            expect($scope.comboModel).toBe('one');
            elem.find('select').val('').triggerHandler('change');
            var select = elem.find('select')[0];
            expect(select.options[select.selectedIndex].innerHTML).toBe('');
        });
    });

    describe('setting css classes', function() {
        it('applies css classes', function() {
            $scope.comboModel = null;
            var elem = compileDirective(angular.element('<combo-box ' +
                'options="options" ' +
                'combo-model="comboModel" ' +
                'select-class="{\'green\': true}"' +
                'input-class="{\'blue\': true}"' +
                '></combo-box>'));
            expect(elem.find('select').val()).toBe('');
            expect($scope.comboModel).toBe(null);
            expect(elem.find('select').hasClass('green')).toBe(true);
            expect(elem.find('input').hasClass('blue')).toBe(true);
        });
    });

    function compileDirective(elem) {
        if (!elem) {
            elem = angular.element('<combo-box ' +
                'options="options" ' +
                'combo-model="comboModel"></combo-box>');
        }
        $scope.options = ["one", "two", "three"];

        $compile(elem)($scope);
        $scope.$digest();
        return elem;
    }


});
