const modal = document.getElementById("modalEditar");
const btnEditar = document.querySelector(".BtnEditar");
const btnCancelar = document.querySelector("#formEditar .BtnVoltar");

btnEditar.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});


btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});