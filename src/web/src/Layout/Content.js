import Sections from "./Sections";

function Content({selected}) {

    return (
        <>
        <div className={"Content"}>
            {
                Sections.filter(m => m.id === selected)[0].content
            }
            
            {/* <input type="text" id="pokemonName" placeholder="Pokemon Name"></input>
            <button onclick="fetchData()">Fetch Pokemon</button> */}

            {/* <script>
            async function fetchData() {
                try {

                    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

                    if (!response.ok) {
                        throw new Error("Could not fetch resource");
                    }

                    const data = await response.json();
                    const pokemonSprite = data.sprites.front_default;
                    const imgElement  = document.getElementById("sprite");

                    imgElement.src = pokemonSprite;
                    imgElement.style.display = "block";

                }
                catch (error) {
                    console.error(error);
                }
            }
            </script> */}

        </div>
        </>
    );
}



export default Content;
