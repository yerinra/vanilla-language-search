export default function SearchInput({ $app, initialState, onFetch }) {
  this.$inputSection = document.createElement("form");
  this.$inputSection.className = "SearchInput";
  $app.appendChild(this.$inputSection);

  this.$input = document.createElement("input");
  this.$input.className = "SearchInput__input";
  this.$input.placeholder = "프로그램 언어를 입력하세요.";
  this.$input.type = "text";
  this.$inputSection.appendChild(this.$input);
  this.$input.focus();
  this.$inputSection.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  this.state = initialState;
  this.setState = (newState) => {
    this.state = newState;
  };
  this.$input.addEventListener("click", (e) => {
    const input = e.target.closest(".SearchInput__input");
    if (!input) return;
    e.target.value = "";
  });

  this.$input.addEventListener("keyup", (e) => {
    const actionIgnoreKeys = [
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (!actionIgnoreKeys.includes(e.key)) {
      this.setState(e.target.value);
      onFetch(this.state);
    }
  });
}
