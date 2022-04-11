import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public phoneNumber:string = '';
  public formatedPhoneNumberPhoneCountryCode = '';


  onInputPhoneChange(phoneNumber: any) {
    debugger
    phoneNumber = phoneNumber.target.value;
    if (!phoneNumber) {
      return ;
    }

    const  numberClearTemp = this.clearNumber(phoneNumber);
    if(numberClearTemp.length <= 14){
      this.phoneNumber = numberClearTemp;
      this.formatedPhoneNumberPhoneCountryCode = this.formatWholeNumber(this.phoneNumber);
      this.phoneNumber = this.formatedPhoneNumberPhoneCountryCode;
    }else{
      this.phoneNumber = this.formatedPhoneNumberPhoneCountryCode;
    }
  }

  clearNumber(allPhoneNumber:string):string {
    let numberClear = allPhoneNumber.replace(/[^a-zA-Z0-9]/g, '');
    return numberClear;
  }

  formatWholeNumber(phoneNumberAndCellPhone: string): string {
    let formatedCountryCode = '';
    let formatedPhoneAreaCode = '';
    let formatedNumber = '';

    if(phoneNumberAndCellPhone.length< 4){
      switch (phoneNumberAndCellPhone.length) {
        case 1: formatedCountryCode =  `(+${phoneNumberAndCellPhone}  ) `; break;
        case 2: formatedCountryCode =  `(+${phoneNumberAndCellPhone} ) `; break;
        case 3: formatedCountryCode = `(+${phoneNumberAndCellPhone}) `; break;
      }
    }else{
      formatedCountryCode =  `(+${phoneNumberAndCellPhone.charAt(0)+phoneNumberAndCellPhone.charAt(1)+phoneNumberAndCellPhone.charAt(2)}) `;
    }

    if(phoneNumberAndCellPhone.length  > 3){
      formatedPhoneAreaCode = this.formatPhoneAreaCode(phoneNumberAndCellPhone);
    }

    if(phoneNumberAndCellPhone.length > 5){
        formatedNumber = this.formatPhoneNumber(phoneNumberAndCellPhone);
    }

    return formatedCountryCode+formatedPhoneAreaCode+formatedNumber;
  }

  formatPhoneAreaCode(phoneAreaCode: string): string {
    let areaCode = '';
    if(phoneAreaCode.length < 6){
      switch (phoneAreaCode.length) {
        case 4: areaCode =  `(${phoneAreaCode.charAt(3)} ) `; break;
        case 5: areaCode =  `(${phoneAreaCode.charAt(3)+phoneAreaCode.charAt(4)}) `; break;
      }
    }else{
      areaCode =  `(${phoneAreaCode.charAt(3)+phoneAreaCode.charAt(4)}) `;
    }
    return areaCode;
  }

  formatPhoneNumber(phoneNumber: string): string {
    let  phoneNumberFormated = '';
    if (phoneNumber.length < 14) {
      if(phoneNumber.length == 8){
        phoneNumberFormated = `${phoneNumber.slice(5, 8)}`;
      }else if(phoneNumber.length == 7){
        phoneNumberFormated = `${phoneNumber.slice(5, 7)}`;
      }else if(phoneNumber.length == 6){
        phoneNumberFormated = `${phoneNumber.slice(5, 6)}`;
      }else{
        phoneNumberFormated = `${phoneNumber.slice(5, 9)}-${phoneNumber.slice(9)}`;
      }
    }else if(phoneNumber.length == 14){
      phoneNumberFormated = `${phoneNumber.slice(5, 10)}-${phoneNumber.slice(10)}`;
    }
    return phoneNumberFormated;
  }


}
