import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register.component';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegisterComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 1: Form Initialization
  it('should initialize the form with default values and be invalid', () => {
    const form = component.registrationForm;
    
    expect(form).toBeDefined();
    expect(form.controls['userName']).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['password']).toBeDefined();
    expect(form.controls['confirmPassword']).toBeDefined();

    expect(form.valid).toBeFalsy(); // Form should be invalid initially
  });

  // Test Case 2: Valid Form Submission
  it('should submit the form if all values are valid', () => {
    spyOn(component, 'onSubmit'); // Spy on the onSubmit method

    // Set valid form values
    component.registrationForm.controls['userName'].setValue('JohnDoe');
    component.registrationForm.controls['email'].setValue('johndoe@example.com');
    component.registrationForm.controls['password'].setValue('password123');
    component.registrationForm.controls['confirmPassword'].setValue('password123');

    fixture.detectChanges();

    expect(component.registrationForm.valid).toBeTruthy(); // Form should now be valid

    // Simulate form submission
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled(); // onSubmit should be called
  });

  // Test Case 3: Invalid Form Submission
  it('should display validation errors when form is invalid', () => {
    const form = fixture.nativeElement.querySelector('form');
    const userNameInput = fixture.nativeElement.querySelector('input[formControlName="userName"]');
    const emailInput = fixture.nativeElement.querySelector('input[formControlName="email"]');
    const passwordInput = fixture.nativeElement.querySelector('input[formControlName="password"]');
    const confirmPasswordInput = fixture.nativeElement.querySelector('input[formControlName="confirmPassword"]');

    // Try submitting without filling the form
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // Expect validation errors to show up
    expect(component.registrationForm.invalid).toBeTruthy();
    expect(userNameInput.classList).toContain('ng-invalid');
    expect(emailInput.classList).toContain('ng-invalid');
    expect(passwordInput.classList).toContain('ng-invalid');
    expect(confirmPasswordInput.classList).toContain('ng-invalid');
    
    const errorMessage = fixture.nativeElement.querySelector('.text-danger');
    expect(errorMessage).toBeTruthy(); // Check if error messages are displayed
  });
});
