import {Tab, Tabs} from "@mui/material";
import Sections from "./Sections";

function Menu({selectedTab = Sections[0].id, changeSelectedTab}) {

    return (
        <div className={"Menu"}>
            <div className={"Logo"}>
                <img src={"logo.png"} alt={""}/>
            </div>
            <Tabs value={selectedTab} orientation={"vertical"} centered onChange={changeSelectedTab}>
                {
                    Sections.map(({id, label}) => <Tab key={id} value={id} label={label}/>)
                }
            </Tabs>
        </div>
    );
}

export default Menu;
