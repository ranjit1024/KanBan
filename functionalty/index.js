const toastBox = document.querySelector("#toastbox");
const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (e)=>{
    const toast = document.createElement("div");
    toast.classList.add("toast");
    
    if(e.target.id == "success"){
        toast.innerHTML = `<i class="bi bi-check-circle-fill"></i>Successfully Submited`;
        toastBox.append(toast);
        toast.classList.add("submit")
        
    }
    else if(e.target.id == "error"){
        toast.innerHTML = `<i class="bi bi-x-circle-fill"></i>Error`
        toastBox.append(toast);
        toast.classList.add("error")
    }
    else if(e.target.id == "info"){
        toast.innerHTML = `<i class="bi bi-info-circle-fill"></i> User is valid`;
        toastBox.append(toast);
        toast.classList.add("info");
    }

    setTimeout(() => {
        toast.remove()
    }, 5000);
})