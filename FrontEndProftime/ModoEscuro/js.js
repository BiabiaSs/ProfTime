const BtnDark = document.querySelector(".BtnDark"); 

document.documentElement.classList.toggle("dark", localStorage.getItem("Tema") === "Escuro");

BtnDark.addEventListener("click", () => {
  const dark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("Tema", dark ? "Escuro" : "Claro"); 
});