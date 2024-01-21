export default function Suggestion({ $app, initialState, onSelect }) {
  this.$suggestion = document.createElement("div");
  this.$suggestion.className = "Suggestion";

  this.$suggestionList = document.createElement("ul");
  this.$suggestion.appendChild(this.$suggestionList);
  $app.appendChild(this.$suggestion);
  this.$suggestion.style.display = "none";

  this.state = initialState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    let idx = this.state.index;
    this.$suggestionList.innerHTML = this.state.data
      .map((v, i) => {
        let classname = idx == i ? "Suggestion__item--selected" : "";
        return `<li data-id=${i} class=${classname}>${v}</li>`;
      })
      .join("");
  };

  this.$suggestion.addEventListener("click", (e) => {
    const $li = e.target.closest(".Suggestion li");

    if (!$li) return;
    onSelect(e.target.innerText);
  });

  this.init = () => {
    document.addEventListener("keyup", (e) => {
      let newIdx;
      if (e.key === "Enter") {
        // console.log("pressed enter");
        let selected = document.querySelector(".Suggestion__item--selected");
        onSelect(selected.innerText);
        // console.log(selected.innerText);
      }
      if (e.key === "ArrowDown") {
        if (this.state.data.length !== 0) {
          newIdx =
            this.state.index + 1 >= this.state.data.length
              ? 0
              : this.state.index + 1;
          this.setState({ ...this.state, index: newIdx });
        }
      }
      if (e.key === "ArrowUp") {
        if (this.state.data.length !== 0) {
          newIdx =
            this.state.index - 1 < 0
              ? this.state.data.length - 1
              : this.state.index - 1;

          this.setState({ ...this.state, index: newIdx });
        }
      }
    });
  };

  this.render();
  this.init();
}
