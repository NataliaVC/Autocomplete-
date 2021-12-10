import { React,useState } from "react";

function AutoComplete({ suggestions }) {

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (evento) => {
    const userInput = evento.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(evento.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(1);
    setShowSuggestions(true);
  };
  const onClick = (evento) => {
    setFilteredSuggestions([]);
    setInput(evento.target.innerText);
    setActiveSuggestionIndex(1);
    setShowSuggestions(false);
  };
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };
   return (
    <>
      <input type="text"
        onChange={onChange}
        value={input}/>
        {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};

export default AutoComplete;
