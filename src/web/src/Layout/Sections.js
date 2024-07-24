import Register from "../Menus/UserRegister";
import Login from "../Menus/UserLogin";
import Moves from "../Menus/MovesData"

const Sections = [

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
        id: "moves-data",
        label: "Moves Data",
        content: <Moves/>
    }

];

export default Sections;