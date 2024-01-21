export default function SelectedLanguage({ $app, initialState, onClick }) {
  this.$selectedLanguage = document.createElement("div");
  this.$selectedLanguage.className = "SelectedLanguage";
  $app.appendChild(this.$selectedLanguage);

  this.state = initialState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    let data = this.state.length > 5 ? this.state.slice(-5) : this.state;
    this.$selectedLanguage.innerHTML = `<ul>${data
      .map((v) => `<li>${v}</li>`)
      .join("")}</ul>`;
  };

  this.$selectedLanguage.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if (!$li) return;
    onClick(e.target.innerText);
  });
}
