import { buildDisplay } from "./weatherDisplay";

const test = JSON.parse(localStorage.getItem("Boise"));
buildDisplay(test);