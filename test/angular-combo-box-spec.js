describe('angular combo box', function() {
	var $scope, $compile;

	beforeEach(function() {

		module('ngComboBox');
	
		inject(function(_$compile_, $rootScope) {
            $scope = $rootScope;
            $compile = _$compile_;
        });

	});	

	it('does not set a value initially', function() {
		$scope.comboModel = '';
		$scope.options = ["one", "two", "three"];
        var elem = angular.element('<combo-box ' +
        	'options="options" ' +
        	'combo-model="comboModel"></combo-box>');
        $compile(elem)($scope);
        $scope.$digest();
		expect(elem.find('select').val()).toBe('');
		expect($scope.comboModel).toBe('');
		expect(elem.find('input').hasClass('ng-hide')).toBe(true);
	});

	it('sets the value for a given option and hides other input', function() {
		$scope.comboModel = 'one';
		$scope.options = ["one", "two", "three"];
        var elem = angular.element('<combo-box ' +
        	'options="options" ' +
        	'combo-model="comboModel"></combo-box>');
        $compile(elem)($scope);
        $scope.$digest();
		expect(elem.find('select').val()).toBe('one');
		expect(elem.find('input').hasClass('ng-hide')).toBe(true);
	});

	it('sets the value for another option and shows other input', function() {
		$scope.comboModel = 'something else';
		$scope.options = ["one", "two", "three"];
        var elem = angular.element('<combo-box ' +
        	'options="options" ' +
        	'combo-model="comboModel"></combo-box>');
        $compile(elem)($scope);
        $scope.$digest();
		expect(elem.find('select').val()).toBe('other');
		expect(elem.find('input').val()).toBe('something else');
		expect(elem.find('input').hasClass('ng-hide')).toBe(false);
	});

	it('sets an alternative value', function() {
		$scope.comboModel = 'one';
		$scope.options = ["one", "two", "three"];
        var elem = angular.element('<combo-box ' +
        	'options="options" ' +
        	'combo-model="comboModel"></combo-box>');
        $compile(elem)($scope);
        $scope.$digest();
        elem.find('select').val('other').triggerHandler('change');
        expect(elem.find('input').hasClass('ng-hide')).toBe(false);
        elem.find('input').val('something else').triggerHandler('change');
		expect($scope.comboModel).toBe('something else');
	});

	it('sets a given option', function() {
		$scope.comboModel = 'something else';
		$scope.options = ["one", "two", "three"];
        var elem = angular.element('<combo-box ' +
        	'options="options" ' +
        	'combo-model="comboModel"></combo-box>');
        $compile(elem)($scope);
        $scope.$digest();
        elem.find('select').val('one').triggerHandler('change');
        expect(elem.find('input').hasClass('ng-hide')).toBe(true);
		expect($scope.comboModel).toBe('one');
	});


});