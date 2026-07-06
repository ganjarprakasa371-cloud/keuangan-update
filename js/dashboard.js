let currentPage=1;

const user=
Utils.getUser();

if(!user){

window.location="login.html";

}


const search =
document.getElementById(
"search"
);

const periode =
document.getElementById(
"periode"
);

const tbody =
document.getElementById(
"tbody"
);

const modal =
document.getElementById(
"modal"
);

const editID =
document.getElementById(
"editID"
);

const tanggal =
document.getElementById(
"tanggal"
);

const jenis =
document.getElementById(
"jenis"
);

const kategori =
document.getElementById(
"kategori"
);

const nominal =
document.getElementById(
"nominal"
);

const keterangan =
document.getElementById(
"keterangan"
);

const welcome =
document.getElementById(
"welcome"
);

const pageNumber =
document.getElementById(
"pageNumber"
);

welcome.innerHTML=
`Halo, ${user.nama}`;

async function loadTransactions(){

try{

const searchValue=
search.value;

const periodeValue=
periode.value;

const response=
await fetch(

`${API_URL}
?action=getTransactions
&userID=${user.id}
&page=${currentPage}
&search=${encodeURIComponent(searchValue)}
&periode=${encodeURIComponent(periodeValue)}`

);

const result=
await response.json();

totalPages=
Math.max(
1,
Math.ceil(
result.total/
result.limit
)
);

tbody.innerHTML="";

if(result.data.length===0){

tbody.innerHTML=`

<tr>

<td
colspan="6"
class="text-center p-10 text-gray-500">

Belum ada transaksi

</td>

</tr>

`;

return;

}

result.data.forEach(item=>{

tbody.innerHTML +=`

<tr class="border-b">

<td class="p-4">

${Utils.formatTanggal(item[2])}

</td>

<td>

${item[4]}

</td>

<td>

${item[3]}

</td>

<td>

${Utils.formatRupiah(item[5])}

</td>

<td>

${item[6]}

</td>

<td class="space-x-2">

<button
onclick='editTransaction(
"${item[0]}",
"${item[2]}",
"${item[3]}",
"${item[4]}",
"${item[5]}",
"${item[6]}"
)'
class="bg-yellow-500 text-white px-2 py-1 rounded">

✏️

</button>

<button
onclick='deleteTransaction("${item[0]}")'
class="bg-red-600 text-white px-2 py-1 rounded">

🗑️

</button>

</td>

</tr>

`;

});

}catch(error){

console.log(error);

Utils.showToast(
"Gagal memuat data",
"error"
);

}

}

async function loadKategori(){

const jenisValue=
jenis.value;

const response=
await fetch(

`${API_URL}
?action=getCategories
&jenis=${jenisValue}`

);

const result=
await response.json();

kategori.innerHTML="";

result.data.forEach(item=>{

kategori.innerHTML += `

<option value="${item.nama}">

${item.nama}

</option>

`;

});

}

async function saveTransaction(){

try{

let action=
"createTransaction";

let id=
editID.value;

if(id){

action=
"updateTransaction";

}

await fetch(
API_URL,
{

method:"POST",

body:JSON.stringify({

action:action,

id:id,

userID:user.id,

tanggal:tanggal.value,

jenis:jenis.value,

kategori:kategori.value,

nominal:nominal.value,

keterangan:keterangan.value

})

}

);

Utils.showToast(
"Transaksi berhasil disimpan"
);

editID.value="";

closeModal();

loadTransactions();

}catch(error){

Utils.showToast(
"Gagal menyimpan",
"error"
);

}

}

async function deleteTransaction(id){

const konfirmasi=
confirm(
"Hapus transaksi ini?"
);

if(!konfirmasi){

return;

}

try{

await fetch(
API_URL,
{

method:"POST",

body:JSON.stringify({

action:
"deleteTransaction",

id:id

})

}

);

Utils.showToast(
"Transaksi berhasil dihapus"
);

loadTransactions();

}catch(error){

Utils.showToast(
"Gagal menghapus transaksi",
"error"
);

}

}

async function editTransaction(
id,
tanggalValue,
jenisValue,
kategoriValue,
nominalValue,
keteranganValue
){

editID.value=id;

tanggal.value=tanggalValue;

jenis.value=jenisValue;

nominal.value=nominalValue;

keterangan.value=keteranganValue;

await openModal();

kategori.value=
kategoriValue;

}

let totalPages=1;

function nextPage(){

if(currentPage<totalPages){

currentPage++;

pageNumber.innerText=
currentPage;

loadTransactions();

}

}

function prevPage(){

if(currentPage>1){

currentPage--;

pageNumber.innerText=
currentPage;

loadTransactions();

}

}

async function openModal(){

modal.classList.remove(
"hidden"
);

await loadKategori();

}

function closeModal(){

modal.classList.add(
"hidden"
);

editID.value="";

tanggal.value="";

jenis.value="Pemasukan";

kategori.innerHTML="";

nominal.value="";

keterangan.value="";

}

function logout(){

Utils.logout();

}

loadTransactions();

search.addEventListener(

"keyup",

Utils.debounce(()=>{

currentPage=1;

loadTransactions();

},500)

);

periode.addEventListener(

"change",

()=>{

currentPage=1;

loadTransactions();

}

);