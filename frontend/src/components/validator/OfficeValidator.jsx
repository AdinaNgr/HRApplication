import ValidationResult from './ValidationResult';

export default new class OfficeValidator{
    ValidateName(name){
        if(!name){
            return new ValidationResult(false, "Name is mandatory.");
        }
        if(name.length>30){
            return new ValidationResult(false, "Name must have less than 30 characters.");
        }

        return new ValidationResult(true, "Valid.");
    }
    ValidatePhone(phone){
        if(!phone){
            return new ValidationResult(false, "Phone is mandatory.");
        }
        var isnum = /^\d+$/.test(phone);
        if(!isnum){
            return new ValidationResult(false, "Phone should only contain digits.");
        }
        if(phone.length<10||phone.length>14){
            return new ValidationResult(false, "Phone must have between 10 and 14 digits.");
        }
        
        return new ValidationResult(true, "Valid.");
    }
    ValidateAddress(addr){
        if(!addr){
            return new ValidationResult(false, "Address is mandatory.");
        }
        if(addr.length>100){
            return new ValidationResult(false, "Address must have less than 30 characters.");
        }

        return new ValidationResult(true, "Valid.");
    }
    ValidateImage(img){
        if(!img){
            return new ValidationResult(false, "Image is mandatory.")
        }
        
        return new ValidationResult(true, "Valid.");
    }
}

