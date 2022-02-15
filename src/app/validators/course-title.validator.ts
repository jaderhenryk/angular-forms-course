import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators";
import { CoursesService } from "../services/courses.service";

export function courseTitleValidator(courseService: CoursesService):AsyncValidatorFn {

    return (control: AbstractControl) => {
        return courseService.findAllCourses()
        .pipe(
            map(courses => {
                const course = courses.find(
                    course => course.description.toLowerCase() == control.value.toLowerCase()
                );
                return course ? {titleExists: true} : null;
            })
        )
    }
}