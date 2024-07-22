import React from "react";

function ListGroup() {

    const items = ["razor wind", "leaf whip", "sword-dance"];

    return (
    <>
        <h1>List</h1>
        {items.length === 0 && <p>No Item found</p>}
        <ul className="list-group">
            {items.map(item => (
                <li className="list-group-item" onClick={() => console.log('Clicked')} key={item}>{item}</li>
            ))}
        </ul>
    </>
    );
    
}

export default ListGroup;