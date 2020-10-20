function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function gamePretty(string){
    if (string.includes("-")){
        string = string.split("-");
        string[0] = capitalizeFirstLetter(string[0]);
        string[1] = capitalizeFirstLetter(string[1]);
        string = string[0] + " " +  string[1];
        return string;
    } else {
        string = capitalizeFirstLetter(string);
        return string;
    };
};

////////////////Use Dom to select get and post button/////////////
const getBtn = document.getElementById("get-btn");
const pokedexName = document.querySelector("#pName");
///////create callback function thats used when button clicked////////
function pokedexUpdate() {
  let xhr = new XMLHttpRequest();
  ////////// Create callback function with embeded promise/////////////

  ///////////// When browser load parse http req to usable format//////////
  xhr.onreadystatechange = () => {
    const data = JSON.parse(xhr.response);
    console.log(data);
    //////// Assign diferent parts to pokedex using dom selection/////////
    document.querySelector("#info_id").value = "#" + data.id + " " + capitalizeFirstLetter(data.name);
    document.querySelector("#pokedex_screen").src = data.sprites.front_default;
    document.querySelector("#info_stats").value = capitalizeFirstLetter(data.types[0].type.name);
    document.querySelector("#info_weight").value = data.weight / 10 + " kg";
    document.querySelector("#info_height").value = data.height / 10 + " m";
    document.querySelector("#info_moves").value = "Possible Moves: "
    for(var i = 0; i < data.moves.length; i++) {
        document.querySelector("#info_moves").value += gamePretty(data.moves[i].move.name) + ", "
    }
  };
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokedexName.value);
  xhr.send();
}
/// add event listener to get button ///
getBtn.addEventListener("click", pokedexUpdate);


