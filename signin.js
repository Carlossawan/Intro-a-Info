function authentication(){
    const e = document.getElementById("email")
    const p = document.getElementById("password")

    if(e.value == "admin" && p.value == "password"){
        window.location.href = 'Profile.html';
        document.getElementById("main_signin")
    }else{
        window.alert('Authentication unsuccessful. Please try again.');
    }


}
