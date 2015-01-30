'use strict';

(function() {
	// Classes Controller Spec
	describe('Classes Controller Tests', function() {
		// Initialize global variables
		var ClassesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Classes controller.
			ClassesController = $controller('ClassesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Class object fetched from XHR', inject(function(Classes) {
			// Create sample Class using the Classes service
			var sampleClass = new Classes({
				name: 'New Class'
			});

			// Create a sample Classes array that includes the new Class
			var sampleClasses = [sampleClass];

			// Set GET response
			$httpBackend.expectGET('classes').respond(sampleClasses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.classes).toEqualData(sampleClasses);
		}));

		it('$scope.findOne() should create an array with one Class object fetched from XHR using a classId URL parameter', inject(function(Classes) {
			// Define a sample Class object
			var sampleClass = new Classes({
				name: 'New Class'
			});

			// Set the URL parameter
			$stateParams.classId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/classes\/([0-9a-fA-F]{24})$/).respond(sampleClass);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.class).toEqualData(sampleClass);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Classes) {
			// Create a sample Class object
			var sampleClassPostData = new Classes({
				name: 'New Class'
			});

			// Create a sample Class response
			var sampleClassResponse = new Classes({
				_id: '525cf20451979dea2c000001',
				name: 'New Class'
			});

			// Fixture mock form input values
			scope.name = 'New Class';

			// Set POST response
			$httpBackend.expectPOST('classes', sampleClassPostData).respond(sampleClassResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Class was created
			expect($location.path()).toBe('/classes/' + sampleClassResponse._id);
		}));

		it('$scope.update() should update a valid Class', inject(function(Classes) {
			// Define a sample Class put data
			var sampleClassPutData = new Classes({
				_id: '525cf20451979dea2c000001',
				name: 'New Class'
			});

			// Mock Class in scope
			scope.class = sampleClassPutData;

			// Set PUT response
			$httpBackend.expectPUT(/classes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/classes/' + sampleClassPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid classId and remove the Class from the scope', inject(function(Classes) {
			// Create new Class object
			var sampleClass = new Classes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Classes array and include the Class
			scope.classes = [sampleClass];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/classes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleClass);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.classes.length).toBe(0);
		}));
	});
}());