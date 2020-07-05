import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms'

export const infectionDataValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const infectedNo = Number(control.get('infectedNo').value); 
  const recoveredNo = Number(control.get('recoveredNo').value);
  const deathNo = Number(control.get('deathNo').value);

  return infectedNo && recoveredNo && deathNo && infectedNo >= (recoveredNo + deathNo) ? null : { 'invalidInput': true };
};
