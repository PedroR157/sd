import TopTeams from "../Menus/TopTeams";
import Register from "../Menus/UserRegister";
import Login from "../Menus/UserLogin";

const Sections = [

    {
        id: "top-teams",
        label: "Top Teams",
        content: <TopTeams/>
    },

    {
        id: "register",
        label: "Register",
        content: <Register/>
    },
    
    {
        id: "login",
        label: "Login",
        content: <Login/>
    },

    {
        id: "something-else",
        label: "Something Else",
        content: <h1>Something else - Work in progresss</h1>
    }

];

export default Sections;