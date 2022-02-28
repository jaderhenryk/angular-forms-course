import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import {noop, Subscription} from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

    @Input()
    legend: string;
    onChangeSub: Subscription;

    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]]
    });
    onTouched = () => {};

    constructor(private fb: FormBuilder) {
    }

    ngOnDestroy(): void {
        this.onChangeSub.unsubscribe();
    }

    registerOnChange(onChange: any): void {
        this.onChangeSub = this.form.valueChanges.subscribe(onChange);
    }

    writeValue(values: any): void {
        if (values) {
          this.form.setValue(values);
        }
    }

    registerOnTouched(onTouched: any): void {
        this.onTouched = onTouched;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
          this.form.disable();
        } else {
          this.form.enable();
        }
    }
}



