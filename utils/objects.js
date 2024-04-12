export const isValidObject = (obj) => {
    // Iterate over each property in the object
    for (let key in obj) {
        // Check if the property value is valid
        if (!isValidParameter(obj[key])) {
            return false; // If any parameter is invalid, return false
        }
    }
    return true; // If all parameters are valid, return true
}

// Example of a function to check the validity of a parameter
export const isValidParameter = (param) => {
    // Implement your validation logic here
    // For demonstration purposes, let's say a valid parameter is a non-empty string
    return typeof param === 'string' && param.trim() !== '';
}  