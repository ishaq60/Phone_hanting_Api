const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
    const phoneContainer=document.getElementById('phone-container');
// clear phone container before additing new card
phoneContainer.textContent=''

// display show all button if there are more than 12 phones
const showAllContain=document.getElementById('show-All-container')
if(phones.length>12){
    showAllContain.classList.remove('hidden')
}
else{
    showAllContain.classList.add('hidden')
}

// display only frist 10 phones
phones =phones.slice(0,10)


  phones.forEach((phone) => {
    console.log(phone);
    // 2.create a div
    const phonecard = document.createElement("div");
    phonecard.classList = `card p-4 bg-gray-100 shadow-xl`;
    // 3.set innerhtml
    phonecard.innerHTML = `
    
    <figure><img src="${phone.image}"
    alt="Shoes" /></figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
    <button onclick="handaleshowDealtls('${phone.slug}');show_deatls_modal.showModal()"  class="btn btn-primary">Show Details</button>
</div>
</div>
    
    `;
    //4. append child
    phoneContainer.appendChild(phonecard)
  });
// hide loading sprinner
toggleloadingSpinner(false);

};
// load single phone data
const handaleshowDealtls = async(id)=>{
    console.log('show deatls',id);
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data= await res.json()
    const phone= data.data;
    // 
    phoneDeatlis(phone)
}
const phoneDeatlis= (phone) =>{
    console.log(phone);
const phoneName=document.getElementById('phone_name')
phoneName.innerText=phone.name

const showDatailContainer =document.getElementById('show-dealtails-container')
showDatailContainer.innerHTML=`
<img src="${phone.image}" alt="">
<p><span>Storage:${phone?.mainFeatures?.storage}</span></p>
<p>Memory:${phone?.mainFeatures?.memory}</p>

`

// show the modal
show_deatls_modal.showModal()
}

//handale search 
const handelSearch =()=>{
    toggleloadingSpinner(true);
   const searchFeild=document.getElementById('search-field')
   const searchText =searchFeild.value;
   console.log(searchText);
   loadPhone(searchText)
}
// //handale search  recap
// const handelSearch2=()=>{
//     toggleloadingSpinner(true);
//     const searchFeild2=document.getElementById('search-field2')
//     const searchText2=searchFeild2.value;
//     console.log(searchText2);
//     loadPhone(searchText2)
// }
const toggleloadingSpinner=(isloading)=>{
    const loadingspinner=document.getElementById('loading-spinner')
   
    if(isloading){
        loadingspinner.classList.remove('hidden')
    }
    else{
        loadingspinner.classList.add('hidden')
    }
}
const handaleShowALL=()=>{
    handelSearch(true);
}