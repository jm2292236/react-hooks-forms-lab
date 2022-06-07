import React, {useState} from "react";
import { v4 as uuid } from "uuid";

function ItemForm({ onItemFormSubmit }) {
    const [itemName, setItemName] = useState("");
    const [itemCategory, setCategory] = useState("Produce");

    function onNameChange(event) {
        setItemName(event.target.value);
    }

    function onCategoryChange(event) {
        setCategory(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();

        const newItem = {
            id: uuid(),
            name: itemName,
            category: itemCategory,
        }

        onItemFormSubmit(newItem);
    }

    return (
        <form className="NewItem" onSubmit={submitHandler}>
            <label>
                Name:
                <input type="text" name="name" onChange = {onNameChange}/>
            </label>

            <label>
                Category:
                <select name="category" onChange={onCategoryChange}>
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Dessert">Dessert</option>
                </select>
            </label>

            <button type="submit" >Add to List</button>
        </form>
    );
}

export default ItemForm;
