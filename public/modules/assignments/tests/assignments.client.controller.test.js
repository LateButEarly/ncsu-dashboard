'use strict';

(function() {
	// Assignments Controller Spec
	describe('Assignments Controller Tests', function() {
		// Initialize global variables
		var AssignmentsController,
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

			// Initialize the Assignments controller.
			AssignmentsController = $controller('AssignmentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Assignment object fetched from XHR', inject(function(Assignments) {
			// Create sample Assignment using the Assignments service
			var sampleAssignment = new Assignments({
				name: 'New Assignment'
			});

			// Create a sample Assignments array that includes the new Assignment
			var sampleAssignments = [sampleAssignment];

			// Set GET response
			$httpBackend.expectGET('assignments').respond(sampleAssignments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.assignments).toEqualData(sampleAssignments);
		}));

		it('$scope.findOne() should create an array with one Assignment object fetched from XHR using a assignmentId URL parameter', inject(function(Assignments) {
			// Define a sample Assignment object
			var sampleAssignment = new Assignments({
				name: 'New Assignment'
			});

			// Set the URL parameter
			$stateParams.assignmentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/assignments\/([0-9a-fA-F]{24})$/).respond(sampleAssignment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.assignment).toEqualData(sampleAssignment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Assignments) {
			// Create a sample Assignment object
			var sampleAssignmentPostData = new Assignments({
				name: 'New Assignment'
			});

			// Create a sample Assignment response
			var sampleAssignmentResponse = new Assignments({
				_id: '525cf20451979dea2c000001',
				name: 'New Assignment'
			});

			// Fixture mock form input values
			scope.name = 'New Assignment';

			// Set POST response
			$httpBackend.expectPOST('assignments', sampleAssignmentPostData).respond(sampleAssignmentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Assignment was created
			expect($location.path()).toBe('/assignments/' + sampleAssignmentResponse._id);
		}));

		it('$scope.update() should update a valid Assignment', inject(function(Assignments) {
			// Define a sample Assignment put data
			var sampleAssignmentPutData = new Assignments({
				_id: '525cf20451979dea2c000001',
				name: 'New Assignment'
			});

			// Mock Assignment in scope
			scope.assignment = sampleAssignmentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/assignments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/assignments/' + sampleAssignmentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid assignmentId and remove the Assignment from the scope', inject(function(Assignments) {
			// Create new Assignment object
			var sampleAssignment = new Assignments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Assignments array and include the Assignment
			scope.assignments = [sampleAssignment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/assignments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAssignment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.assignments.length).toBe(0);
		}));
	});
}());