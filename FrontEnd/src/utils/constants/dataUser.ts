const data = new Date()

export const user  = [
    {
      nome : localStorage.getItem("name"),
      telefone : "",
      image : "",

    }
  ]

  export const DataReal = [
    {
      dia : data.getDay().toString().padStart(2, "0"),
      mes : (data.getMonth()+1).toString().padStart(2,"0"),
      ano : data.getFullYear().toString().padStart(2,"0"),
    }
  ]