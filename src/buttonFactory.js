import "./buttonFactory.css";

// ICONS
import arrowIcon from "./icons/arrow.svg";
import moreIcon from "./icons/more.svg";
import searchIcon from "./icons/search.svg";

const icons = {
  arrow: arrowIcon,
  more: moreIcon,
  search: searchIcon,
};

export const newIconButton = (icon, id = "") => {
  let button = document.createElement("button");
  button.id = id;
  button.style.backgroundImage = `url(${icons[icon]})`;
  button.name = icon;
  button.classList.add("button", `${icon}Button`);

  button.changeIcon = (newIcon) => {
    button.style.backgroundImage = `url(${icons[newIcon]})`;
    button.classList.remove(`${button.name}Button`);
    button.name = newIcon;
    button.classList.add("button", `${button.name}Button`);
  };
  return button;
};

export const newTextButton = (text, id = "") => {
  let button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  button.classList.add("button", "textButton");

  button.changeText = (newText) => {
    button.textContent = newText;
  };

  return button;
};
