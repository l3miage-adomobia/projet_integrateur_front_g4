/**
 * Unit tests for SearchFestComponent.
 *
 * This suite performs various tests on SearchFestComponent to ensure its features and functionalities
 * work as expected under different conditions. It covers initialization, interaction with services,
 * navigation, and UI behavior.
 */
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {SearchFestComponent} from "./search-fest.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {MatTableModule} from "@angular/material/table";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {AppService} from "../app.service";
import {FestivalService} from "../services/fest-covoit/festival.service";
import {FilterFestService} from "../services/filter-fest/filter-fest.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of} from "rxjs";

// Import models and types
import {Festival} from "../model_api";
import {Sort} from "@angular/material/sort";

// Mock service implementations to simulate behavior without actual dependencies.
class MockAppService {
    // Simulates fetching festivals without making real HTTP requests.
    getFestivals = jasmine.createSpy().and.returnValue(of([]));
}

class MockFestivalService {
    setSelectedFestival = jasmine.createSpy();
}

class MockFilterFestService {
    getFilter = jasmine.createSpy().and.returnValue({
        name: "", date: "", lieu: "", sousDomaine: "", depart: "",
    });
}

describe("SearchFestComponent Tests", () => {
    let component: SearchFestComponent;
    let fixture: ComponentFixture<SearchFestComponent>;
    // Define variables for injected services for easy access in tests.
    let appService: AppService;
    let festivalService: FestivalService;

    beforeEach(async () => {
        // Configure the testing module with the SearchFestComponent and its dependencies.
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatTableModule,
                MatIconModule,
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            declarations: [SearchFestComponent],
            providers: [
                // Provide mock services instead of real ones.
                {provide: AppService, useClass: MockAppService},
                {provide: FestivalService, useClass: MockFestivalService},
                {provide: FilterFestService, useClass: MockFilterFestService},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allows testing with custom elements.
        }).compileComponents();

        fixture = TestBed.createComponent(SearchFestComponent);
        component = fixture.componentInstance;
        // Inject services into test environment for spying and assertions.
        appService = TestBed.inject(AppService); // Inject the AppService
        festivalService = TestBed.inject(FestivalService); // Inject the FestivalService
        fixture.detectChanges(); // Trigger initial data binding
    });

    it("should create", () => {
        // Test to ensure the component instance is created successfully.
        expect(component).toBeTruthy();
    });

    it("should initialize and fetch festivals based on filter criteria", () => {
        // Verifies that the component fetches festival data on initialization.
        expect(component.festivals.length).toBe(0); // Start with no festivals.
        expect(appService.getFestivals).toHaveBeenCalled(); // Confirm service interaction.
    });

    it("should navigate to the search-covoit page for a selected festival", () => {
        // Tests navigation functionality upon selecting a festival.
        const navigateSpy = spyOn((component as any).router, "navigate");
        const festival: Festival = {idFestival: 1} as Festival; // Minimal festival mock.
        component.goToSearchCovoit(festival);
        // Verify navigation to the correct route with the festival ID.
        expect(navigateSpy).toHaveBeenCalledWith(["search-covoit/1"]);
        // Ensure the selected festival is set in the service.
        expect(festivalService.setSelectedFestival).toHaveBeenCalledWith(festival);
    });

    it("should announce sort changes", () => {
        // Tests the accessibility feature of announcing sort changes.
        const announceSpy = spyOn(component["_liveAnnouncer"], "announce");
        const sortState: Sort = {active: "name", direction: "asc"}; // Example sort state.
        component.announceSortChange(sortState);
        // Verify announcement of sorting direction.
        expect(announceSpy).toHaveBeenCalledWith("Sorted ascending");
    });
});