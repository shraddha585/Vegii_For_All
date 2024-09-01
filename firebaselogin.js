async function signupUser(e){
    e.preventDefault();
    const email=document.getElementById("U_signemail");
    const password=document.getElementById("U_signpassword")
    try{
    const newuser=await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    console.log("welcome");
    console.log(newuser)
    }catch(err){
    console.log(err);
    }
}
async function loginUser(e){
    e.preventDefault();
    const email=document.getElementById("UL_email");
    const password=document.getElementById("UL_pass");
    try {
      const userCredentials = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
      const user = userCredentials.user;
      console.log("Welcome");
      console.log(user);
      localStorage.setItem('logged_in_Customer_id', user.uid);
      localStorage.setItem('logged_in_Customer_email', user.email);
      location.href = "user1.html";
  } catch (err) {
      console.log(err);
  } finally {
      email.value = "";
      password.value = "";
  }
}
function logout(){
    firebase.auth().signOut();
}
const c=firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     console.log(user)
    } else {
      console.log("SighOut Success")
    }
  });
  async function loginCustomer(e){
   e.preventDefault()
   const email=document.getElementById("CL_email");
   const password=document.getElementById("CL_pass");
   try {
    const userCredentials = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    const user = userCredentials.user;
    console.log("Welcome");
    console.log(user);
    localStorage.setItem('logged_in_customer_id', user.uid);
    localStorage.setItem('logged_in_customer_email', user.email);
    location.href = "customer1.html";
} catch (err) {
    console.log(err);
}
}