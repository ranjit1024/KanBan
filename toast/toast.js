const toastButtons = document.querySelectorAll(".toast-button");
const tostBox = document.querySelector("#toastbox");
toastButtons.forEach(toastButton =>{
    toastButton.addEventListener("click", (e)=>{
        e.preventDefault()
        const toast = document.createElement("div");
        
        
        toast.classList.add("toast");
        toast.innerHTML = `<i class="bi bi-check-circle-fill"></i>Successfully Submited`;
        toast.classList.add("submit")
        tostBox.append(toast);
    
        

        setTimeout(()=>{
            toast.remove()
            toast.classList.add("toast");
            toast.innerHTML = `<i class="bi bi-check-circle-fill"></i>Drag In order to move`;
            toast.classList.add("info")
            tostBox.append(toast);
            setTimeout(() => {
                toast.remove()
            }, 3000);
        },3000)
        
    })
})