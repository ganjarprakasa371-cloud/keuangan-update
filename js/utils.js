const Utils = {

formatRupiah(number){

if(!number || isNaN(number)){

return "Rp 0";

}

return "Rp " +

Number(number)
.toLocaleString(
"id-ID"
);

},

showToast(
message,
type="success"
){

const existing=
document.getElementById(
"toast"
);

if(existing){

existing.remove();

}

const toast=
document.createElement(
"div"
);

let bgClass=
"bg-green-600";

if(type==="error"){

bgClass=
"bg-red-600";

}

if(type==="warning"){

bgClass=
"bg-yellow-500";

}

toast.id="toast";

toast.className=`

fixed
top-5
right-5
z-50
px-5
py-3
rounded-xl
text-white
shadow-xl
${bgClass}

`;

toast.innerText=
message;

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.classList.add(
"opacity-0"
);

setTimeout(()=>{

toast.remove();

},500);

},3000);

},

formatTanggal(dateString){

if(!dateString){

return "-";

}

const date=
new Date(
dateString
);

return date.toLocaleDateString(
"id-ID",
{
day:"2-digit",
month:"long",
year:"numeric"
}
);

},

debounce(
func,
delay=500
){

let timer;

return (...args)=>{

clearTimeout(
timer
);

timer=
setTimeout(()=>{

func.apply(
this,
args
);

},delay);

};

},

loading(
button,
text="Memproses..."
){

button.dataset.oldText=
button.innerHTML;

button.innerHTML=
text;

button.disabled=true;

button.classList.add(
"opacity-70"
);

},

stopLoading(
button
){

button.innerHTML=
button.dataset.oldText;

button.disabled=false;

button.classList.remove(
"opacity-70"
);

},

getUser(){

return JSON.parse(

localStorage.getItem(
"user"
)

);

},

logout(){

localStorage.clear();

window.location=
"login.html";

}

}