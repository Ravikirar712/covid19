/* Configuration details - CDN from firebase */
var firebaseConfig = {
  apiKey: "AIzaSyDfmpVQHGF5OMmNns85GRCxSccqr1H9rYM",
  authDomain: "corona-website-f38fb.firebaseapp.com",
  databaseURL: "https://corona-website-f38fb-default-rtdb.firebaseio.com",
  projectId: "corona-website-f38fb",
  storageBucket: "corona-website-f38fb.appspot.com",
  messagingSenderId: "1072309458945",
  appId: "1:1072309458945:web:3f16428fed63fc7d43c800"
  };
  firebase.initializeApp(firebaseConfig);
  
  /* Validation of data collected through form,
  on click event of Submit button, submitForm function is called */
  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);

  /* function store input values in variables */
  function submitForm(e){
    e.preventDefault();
    var fname =getInputVal('firstname');
    // Add more variables to get input values
    var lname =getInputVal('lastname');
    var mobile =getInputVal('mobile');
    var state =getInputVal('state');
    state=state.toLowerCase();
    readState(state);
    var email =getInputVal('email');
    var emailstatus=validateEmail();
    var profession =getInputVal('profession');
    var dateofbirth =getInputVal('dateofbirth');
    var symptomsList=getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;
    /* function call to store data values in firebase
    after email id validation  */
    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

/* function to accept state value as parameter, read database
 to return and display center details on web page */
 function readState(state){
  var centers;
  var ref = firebase.database().ref(state);
  ref.on('value', (data) => {
   centers = data.val();
   document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
  })
}


/* function to return input values as per the id passed as parameter */
function getInputVal(id){
    return document.getElementById(id).value;
}

/* function to write collected details in firebase,
create new record and add values in respective fields */
function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
  var newuserInputsRef = UserInputsRef.push();
  newuserInputsRef.set({
      name:name,
      mobile:mobile,
      email:email,
      profession:profession,
      dateofbirth:dateofbirth,
      selectedOption:selectedOption,
      state:state, 
      symptomsList:symptomsList
  })
  alert("Thank you, find the list of centers nearby!  ");
}






/* function to return value(s) of selcted checkboxes */
function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

/* function to check if email id entered by user is valid */
function validateEmail() 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
