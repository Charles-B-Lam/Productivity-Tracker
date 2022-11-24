
/*This to validate the data that the user enter.
The function will take values as paramter and check if there is any error in
the value type by the user
*/
const validation = (values) => {
    let errors = {};

    //if the fullname is empty
    if(!values.fullname){
        errors.fullname="Name is required"
    }
    //if email field is empty and if it don't have email symbol
    if(!values.email){
        errors.email="Email is required"
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid."
    }

    if(!values.password){
        errors.password="Password is required."
    }else if(values.password.length < 5){
        errors.password = "Password must be more than 5 character"
    }

    return errors;
};

export default validation