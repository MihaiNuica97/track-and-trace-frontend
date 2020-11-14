$(document).ready(()=>{
    let usernameHTML = $('#username');
    let username = localStorage.getItem("username");
    usernameHTML.text(username);
});