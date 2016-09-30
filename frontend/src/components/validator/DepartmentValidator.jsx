import ValidationResult from './ValidationResult';

export default new class DepartmentValidator {

    ValidateName(name) {
        if (!name) {
            return new ValidationResult(false, "Name is mandatory")
        }
        if (name.length > 30) {
            return new ValidationResult(false, "Name must have less than 30 characters.");
        }

        return new ValidationResult(true, "Valid.");
    }
}

