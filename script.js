const loadData = async() => {
  manageLoading(true)
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const response = await fetch(url)
  const data = await response.json();

  // console.log(data.data) 
  displayData(data.data)

  let totalIssues = document.getElementById("total-issues");
  totalIssues.innerText = data.data.length;

}

const displayData = (cards) => {
  const cardContainer = document.getElementById("card-container")
  // cardContainer.innerHTML = ""; 

  cards.forEach(card => {
    const eachCard = document.createElement("div");
    eachCard.innerHTML = `
   <div class=" h-70 shadow-sm rounded-[10px]  ${ card.status == "open"? "border-t-4 border-green-600" : "border-t-4 border-purple-600" }  bg-white">
      <div class="flex justify-between p-3">
        <div><img src="${card.status == "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt=""></div>
        <div class="badge badge-outline badge-secondary">${card.priority}</div>
      </div>
      <div class="space-y-2 px-3">
        <h1 onclick = "loadModal(${card.id})" class="font-bold">${card.title}</h1>
        <p class="line-clamp-2">${card.description}</p>

        <div class="flex gap-2 py-2">
          <div class="badge badge-outline badge-error">${card.labels[0]}</div>
          <div class="badge badge-outline badge-warning">${card.labels[1]? card.labels[1] : "Not Found" }</div>
        </div>

      </div>
      <hr class="text-gray-300">
      <div class="space-y-2 p-3">
          <h1>${card.createdAt}</h1>
          <p>${card.updatedAt}</p>
      </div>
    </div>
  
  `

  cardContainer.appendChild(eachCard);
    
  });
  manageLoading(false)

}

const manageLoading = (status) => {
if(status == true){
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("card-container").classList.add("hidden");
}else{
  document.getElementById("card-container").classList.remove("hidden");
  document.getElementById("loading").classList.add("hidden");
}

}


const loadModal = async(id) =>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

  const response = await fetch(url)
  const data = await response.json()

  // console.log(data.data.id) 

  displayModal(data.data)

}

const displayModal = (data) => {
  const modalArea = document.getElementById("modal-area")
  // modalArea.innerHTML = "" 

    modalArea.innerHTML = `

    <div class="space-y-4">
        <h1 class = "font-bold text-xl">${data.title}</h1>
        <div class="flex gap-2">
          <div class="badge badge-success">${data.status}</div>
          <span>•</span>
          <h1>Opened by<span> ${data.author}</span></h1>
          <span>•</span>
          <p>${data.createdAt}</p>
        </div>
        <div>
          <div class="badge badge-soft badge-error">${data.labels[0]}</div>
          <div class="badge badge-soft badge-warning">${data.labels[1] ? data.labels[1] : "Not Found"}</div>
        </div>
        <p>${data.description}</p>
        <div>
          <div class=" space-y-2 p-3 bg-base-200 rounded-md">
            <div class="flex justify-between">
            <h1>Assignee:</h1>
            <h2>Priority:</h2>
            </div>
            <div class="flex justify-between">
              <h1 class = "font-bold">${data.assignee ? data.assignee : "Not Found"}</h1>
              <div class="badge badge-error">${data.priority}</div>
            </div>
          </div>
        </div>
    
    `
  document.getElementById("my_modal_5").showModal();

}


loadData()