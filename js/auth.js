async function login(){

const username=
document.getElementById(
"username"
).value;

const password=
document.getElementById(
"password"
).value;

const btn=
document.getElementById(
"btnLogin"
);

const error=
document.getElementById(
"error"
);

btn.innerText=
"Memproses...";

btn.disabled=true;

try{

const response=
await fetch(

`${API_URL}
?action=login
&username=${username}
&password=${password}`

);

const result=
await response.json();

if(result.success){

localStorage.setItem(

"user",

JSON.stringify(
result.user
)

);

window.location=
"dashboard.html";

}else{

error.classList.remove(
"hidden"
);

error.innerText=
result.message;

}

}catch{

error.classList.remove(
"hidden"
);

error.innerText=
"Gagal terhubung";

}

btn.disabled=false;

btn.innerText=
"Masuk";

}


const session=
localStorage.getItem(
"user"
);

if(session){

window.location=
"dashboard.html";

}