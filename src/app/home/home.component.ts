import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  calorieForm: FormGroup;
  results = {
    gainWeight: 0,
    maintain: 0,
    loseWeight: 0,
  };
  showResults = false;
  formError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.calorieForm = this.fb.group({
      gender: ['male', Validators.required],
      age: [25, [Validators.required, Validators.min(13), Validators.max(100)]],
      height: [
        180,
        [Validators.required, Validators.min(80), Validators.max(250)],
      ],
      weight: [
        80,
        [Validators.required, Validators.min(40), Validators.max(200)],
      ],
      walking: [
        2,
        [Validators.required, Validators.min(0), Validators.max(50)],
      ],
      cardio: [1, [Validators.required, Validators.min(0), Validators.max(50)]],
    });
  }

  ngOnInit(): void {
    this.calculate();
    this.calorieForm.valueChanges.subscribe(() => {
      this.calculate();
    });
  }

  calculate(): void {
    console.log(
      'Form values:',
      this.calorieForm.value,
      'Valid:',
      this.calorieForm.valid
    );
    if (this.calorieForm.invalid) {
      this.formError = 'Please fill out all fields correctly.';
      this.showResults = false;
      return;
    }

    this.formError = null;
    const { gender, age, height, weight, walking, cardio } =
      this.calorieForm.value;

    // Mifflin-St Jeor equation for BMR
    let bmr =
      10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
    console.log('BMR before activity:', bmr);

    // Adjust BMR for activity (base activity factor of 1.2 for sedentary)
    bmr *= 1.2;

    // Add calories from walking (3.5 METs, moderate pace) and cardio (7 METs, high intensity)
    bmr += (walking * 60 * (0.035 * weight)) / 7; // Simplified MET-based calculation
    bmr += (cardio * 60 * (0.07 * weight)) / 7;
    console.log('BMR after activity:', bmr);

    bmr = Math.floor(bmr);

    // Calculate targets
    this.results = {
      gainWeight: Math.round((bmr + 300) / 100) * 100,
      maintain: Math.round(bmr / 100) * 100,
      loseWeight: Math.round((bmr - 500) / 100) * 100,
    };

    this.showResults = true;
    console.log('Results:', this.results);
  }

  resetForm(): void {
    this.calorieForm.reset({
      gender: 'male',
      age: 25,
      height: 180,
      weight: 80,
      walking: 2,
      cardio: 1,
    });
    this.formError = null;
    this.showResults = false;
  }
}
