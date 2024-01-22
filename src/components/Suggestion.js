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

  this.renderMatchedItem = (keyword, item) => {
    if (!item.includes(keyword)) {
      return item;
    }
    // 정규표현식을 이용한 방법
    const matchedText = item.match(new RegExp(keyword, "gi"))[0];
    return item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  };

  this.render = () => {
    let idx = this.state.index;
    this.$suggestionList.innerHTML = this.state.data
      .map(
        (item, index) => `
        <li class=${
          index === idx ? "Suggestion__item--selected" : ""
        } data-index=${index}>${this.renderMatchedItem(
          this.state.keyword,
          item
        )}</li>
        </li> `
      )
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
        if (this.state.data.length == 0) return;
        let selected = document.querySelector(".Suggestion__item--selected");
        onSelect(selected.innerText);
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
