import { Directive, Attribute } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: "[appCompare]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CompareInputValidateDirective,
      multi: true
    }
  ]
})
export class CompareInputValidateDirective implements Validator {
  constructor(
    @Attribute("max") public max: string,
    @Attribute("min") public min: string
  ) {}

  validate(element: AbstractControl): { [key: string]: any } {
    const maxInput = element.root.get(this.max);
    const minInput = element.root.get(this.min);
    if (maxInput.value < minInput.value) {
      return {
        appCompare: true // Or a string such as 'Password mismatch.' or an abject.
      };
    }

    // برای پاک کردن خطای اینپوت max
    if (maxInput && maxInput.errors && minInput.value <= maxInput.value) {
      delete maxInput.errors["appCompare"];
      if (!Object.keys(maxInput.errors).length) {
        maxInput.setErrors(null);
      }
    }

    // برای پاک کردن خطای اینپوت min
    if (minInput && minInput.errors && maxInput.value >= minInput.value) {
      delete minInput.errors["appCompare"];
      if (!Object.keys(minInput.errors).length) {
        minInput.setErrors(null);
      }
    }

    return null;
  }
}
