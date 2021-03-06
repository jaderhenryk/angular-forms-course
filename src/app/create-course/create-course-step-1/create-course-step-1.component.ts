import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CourseCategory } from '../../model/courseCategory';
import {CoursesService} from '../../services/courses.service';
import { courseTitleValidator } from '../../validators/course-title.validator';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ],
      asyncValidators: [
        courseTitleValidator(this.courseService)
      ],
      updateOn: 'blur'
    }],
    category: ['', Validators.required],
    releasedAt: [new Date(), Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['', [Validators.required, Validators.minLength(3)]]
  });

  courseCategories$: Observable<CourseCategory[]>;

  constructor(private fb: FormBuilder, private courseService: CoursesService) {

  }

  ngOnInit() {
    this.courseCategories$ = this.courseService.findCourseCategories();

    const draft = localStorage.getItem('step_1');
    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }
    this.form.valueChanges
      .pipe(
        filter( () => this.form.valid)
      )
      .subscribe( values => localStorage.setItem('step_1', JSON.stringify(values)));
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
