import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports: [FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Test Case 1: Form Initialization
  it('should initialize the form and be invalid initially', () => {
    const form = fixture.nativeElement.querySelector('form');
    const userNameInput = fixture.nativeElement.querySelector('input[name="userName"]');
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');

    expect(form).toBeDefined();
    expect(userNameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    
    // Check that the form is invalid initially
    expect(userNameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  // Test Case 2: Valid Form Submission
  it('should submit the form if all values are valid', () => {
    spyOn(component, 'onLogin'); // Spy on the onLogin method

    // Fill the form with valid data
    const userNameInput = fixture.nativeElement.querySelector('input[name="userName"]');
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    userNameInput.value = 'validUser';
    passwordInput.value = 'validPassword';
    
    userNameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // Update the view

    expect(component.onLogin).not.toHaveBeenCalled(); // Ensure onLogin has not been called yet

    // Simulate form submission
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onLogin).toHaveBeenCalled(); // Ensure onLogin is called
  });

  // Test Case 3: Invalid Form Submission
  it('should not submit the form if required fields are empty', () => {
    spyOn(component, 'onLogin'); // Spy on the onLogin method

    // Simulate form submission without filling out the form
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onLogin).not.toHaveBeenCalled(); // onLogin should not be called
  });
});
