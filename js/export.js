async function exportExcel(){

try{

const response=
await fetch(

`${API_URL}
?action=getTransactions
&userID=${user.id}
&page=1`

);

const result=
await response.json();

let rows=[];

rows.push([

"Tanggal",
"Kategori",
"Jenis",
"Nominal",
"Keterangan"

]);

result.data.forEach(item=>{

rows.push([

item[2],
item[4],
item[3],
item[5],
item[6]

]);

});

let csvContent=
rows
.map(e=>e.join(","))
.join("\n");

const blob=
new Blob(

[csvContent],

{
type:
"text/csv"
}

);

const link=
document.createElement(
"a"
);

link.href=
URL.createObjectURL(
blob
);

link.download=
"laporan-keuangan.csv";

link.click();

Utils.showToast(
"Excel berhasil diunduh"
);

}catch{

Utils.showToast(
"Gagal export",
"error"
);

}

}


async function exportPDF(){

window.print();

}