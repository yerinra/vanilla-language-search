import SearchInput from "./components/SearchInput.js";
import SelectedLanguage from "./components/SelectedLanguage.js";
import Suggestion from "./components/Suggestion.js";
import { fetchResult } from "./api.js";

export default function App({ $app }) {
  this.state = {
    keyword: null,
    selectedKeywords: JSON.parse(localStorage.getItem("keywords")) || [],
    index: 0,
    data: [],
  };

  this.setState = (newState) => {
    this.state = newState;

    this.searchInput.setState(newState.keyword);
    this.suggestion.setState({
      data: newState.data,

      index: newState.index,
      keyword: newState.keyword,
    });
    this.selectedLanguage.setState(newState.selectedKeywords);
    localStorage.setItem("keywords", JSON.stringify(newState.selectedKeywords));
  };

  this.$header = document.createElement("h1");
  this.$header.innerText = "Find your language!";
  this.$header.className = "header";
  $app.appendChild(this.$header);

  this.selectedLanguage = new SelectedLanguage({
    $app,
    initialState: this.state.selectedKeywords,
    onClick: (lang) => alert(lang),
  });

  let timer;
  this.searchInput = new SearchInput({
    $app,
    initialState: this.state.keyword,
    onFetch: (keyword) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        console.log(keyword);
        try {
          if (!keyword) {
            this.setState({
              ...this.state,
              keyword: null,
              data: [],
            });
            document.querySelector(".Suggestion").style.display = "none";
            return;
          }
          const res = await fetchResult(keyword);
          if (res.length > 0) {
            this.setState({
              ...this.state,
              keyword,
              data: res,
            });
            document.querySelector(".Suggestion").style.display = "block";
          }
        } catch (err) {
          throw new Error(err);
        }
      }, 200);
    },
  });

  this.suggestion = new Suggestion({
    $app,
    initialState: { data: this.state.data, index: this.state.index },
    onSelect: (lang) => {
      alert(lang);
      let newSelectedKeywords;
      if (this.state.selectedKeywords.includes(lang)) {
        newSelectedKeywords = [
          ...this.state.selectedKeywords.filter((v) => v !== lang),
          lang,
        ];
      } else {
        newSelectedKeywords = [...this.state.selectedKeywords, lang];
      }
      this.setState({
        ...this.state,
        selectedKeywords: newSelectedKeywords,
      });
      document.querySelector(".Suggestion").style.display = "none";
    },
  });
}
