/**
 * Unit Testing for the AccueilComponent.
 *
 * This testing suite evaluates the AccueilComponent's functionality,
 * ensuring that it operates as expected for various scenarios. Tests focus
 * on component initialization, interaction with services, form validation,
 * and navigation based on user actions.
 */
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AccueilComponent} from "./accueil.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FilterFestService} from "../services/filter-fest/filter-fest.service";
import {of} from "rxjs";

// Mock classes for dependencies, simulating their behavior for isolated testing.
class MockFilterFestService {
    // Spy on setFilter method to track calls and arguments without actual logic.
    setFilter = jasmine.createSpy("setFilter");
}

class MockRouter {
    // Spy on navigate method to ensure routing is triggered correctly.
    navigate = jasmine.createSpy("navigate");
}

// Mock for ActivatedRoute with empty parameters.
const activatedRouteMock = {
    snapshot: {
        queryParams: {},
        params: {},
    },
    queryParams: of({}),
};

// Test suite for AccueilComponent
describe("AccueilComponent", () => {
    let component: AccueilComponent;
    let fixture: ComponentFixture<AccueilComponent>;
    // Instantiate mock services for injection.
    let mockFilterFestService: MockFilterFestService;
    let mockRouter: MockRouter;

    beforeEach(async () => {
        // Setup TestBed with AccueilComponent and its dependencies.
        mockFilterFestService = new MockFilterFestService();
        mockRouter = new MockRouter();

        // Test module configuration for AccueilComponent
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule], // Importing the module necessary for reactive forms
            declarations: [AccueilComponent], // Declaration of the component under test
            providers: [
                // Mock providers for dependency injection
                FormBuilder,
                {provide: FilterFestService, useValue: mockFilterFestService},
                {provide: Router, useValue: mockRouter},
                {provide: ActivatedRoute, useValue: activatedRouteMock},
            ],
        }).compileComponents();

        // Initialize component and fixture for testing.
        fixture = TestBed.createComponent(AccueilComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Detect initial changes
    });

    it("should create", () => {
        // Verify component instantiation.
        expect(component).toBeTruthy();
    });

    it("should navigate to search-fest when goToSearchFest is executed", () => {
        // Simulate user action that triggers navigation.
        component.goToSearchFest();
        // Assert that setFilter is called with the form's current value.
        expect(mockFilterFestService.setFilter).toHaveBeenCalledWith(
            component.searchForm.value
        );
        // Confirm navigation to 'search-fest' path.
        expect(mockRouter.navigate).toHaveBeenCalledWith(["search-fest"]);
    });

    it("should properly initialize component and its form", () => {
        // Ensure component and its form are correctly initialized.
        expect(component).toBeTruthy();
        expect(component.searchForm).toBeDefined();
        expect(component.searchForm instanceof FormGroup).toBeTrue();
    });

    it("should handle form submission with expected service interaction", () => {
        // Populate form and simulate submission.
        const formValue = {
            nomFestival: "Festival Test",
            nomSousDomaine: "Sous Domaine Test",
            date: "2022-01-01",
            lieu: "Lieu Test",
            depart: "Depart Test",
        };
        component.searchForm.setValue(formValue);
        component.goToSearchFest();
        // Validate service interaction with provided form data.
        expect(mockFilterFestService.setFilter).toHaveBeenCalledWith(formValue);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["search-fest"]);
    });

    it("should return true when all form fields are empty", () => {
        // Assert correct behavior when form fields are empty.
        expect(component.isTrouverFestivalDisabled()).toBeTrue();
    });

    it("should return false when at least one form field is filled", () => {
        // Populate form and assess form status.
        component.searchForm.patchValue({nomFestival: "Test Festival"});
        expect(component.isTrouverFestivalDisabled()).toBeFalse();
    });
});
