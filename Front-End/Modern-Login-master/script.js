const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// function saveChanges() {
//     const userName = document.getElementById('name').value;
//     const userEmail = document.getElementById('email').value;
//     const userBio = document.getElementById('bio').value;
  
//     // Here you would typically send this data to a server
//     // For this example, we'll just update the displayed values
//     document.getElementById('userName').textContent = userName;
//     document.getElementById('userEmail').textContent = userEmail;
    
//     // Optionally, display the bio or do something with it
//     console.log(userBio);
  
//     alert('Profile updated successfully!');
//   }