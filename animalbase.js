"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

const catBtn = document.querySelector("[data-filter=cat]");
const dogBtn = document.querySelector("[data-filter=dog]");
const allBtn = document.querySelector(`[data-filter="*"]`);

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

// controller
function start() {
  console.log("ready");
  // TODO: Add event-listeners to filter and sort buttons
  //   TA DA
  document.querySelectorAll("[data-action='filter']").forEach((button) => {
    button.addEventListener("click", selectFilter);
  });

  loadJSON();
}

// controller
async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();
  allBtn.classList.add("filter_chosen");
  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function selectFilter(elm) {
  console.log(`selectFilter`);

  allBtn.classList.remove("filter_chosen");
  catBtn.classList.remove("filter_chosen");
  dogBtn.classList.remove("filter_chosen");

  const filter = elm.target.dataset.filter;

  filterList(filter);
}

function filterList(animalType) {
  let filteredList = allAnimals;

  if (animalType === "cat") {
    catBtn.classList.add("filter_chosen");
    //Create a filteredlist of only cats
    filteredList = allAnimals.filter(isCat);
  } else if (animalType === "dog") {
    dogBtn.classList.add("filter_chosen");
    //Create a filteredlist of only dogs
    filteredList = allAnimals.filter(isDog);
  } else {
    allBtn.classList.add("filter_chosen");
  }
  displayList(filteredList);
}

function isCat(animal) {
  return animal.type === "cat";
}

function isDog(animal) {
  return animal.type === "dog";
}

function prepareObjects(jsonData) {
  console.log(`prepareObjects`);
  allAnimals = jsonData.map(prepAnimal);

  filterList(allAnimals);
}

function prepAnimal(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
