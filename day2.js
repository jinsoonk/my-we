const passwordinput=document.getElementById('pwd');
const eyeicon=document.getElementById('eye-icon');
//when pressing down:change type to"text" to show password
eyeIcon.addEventListener('mousedown',()=>{
    passwordInput.type='Text';
});
//when letting go :change type back to "password"to hide it
eyeIcon.addEventListener('mousseleave',()=>{
    passwordInput.type='password';
});
//also handle the mouse leaving the icon so it doesn't get "stuck"on show
eyeIcon.addEventListener('mouseleave',()=>{
    passwordInput.type='password'
});