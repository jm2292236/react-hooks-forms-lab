import React, { useState } from "react";
import itemData from "../data/items";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
    const [items, setItems] = useState(itemData);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    // const [itemFormData, setItemFormData] = useState({
    //     id: 0,
    //     name: "",
    //     category: "Produce",
    // })


    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }


    // Used to determine if the item fits the filter configuration
    function filterItem(itemToFilter) {
        // no filter in place
        if (selectedCategory === "All" && search === "") return true;

        // Make the filter case-insensitive
        const item = itemToFilter.name.toLowerCase();
        const filter = search.toLocaleLowerCase();

        // if ((item.substring(0, filter.length) === filter) && (item === selectedCategory || selectedCategory === "All")) {
        if (item.indexOf(filter) > -1) {
            return true;
        } else {
            return false;
        }
    }


    const itemsToDisplay = items.filter((item) => {
        if (selectedCategory === "All") return filterItem(item);

        // ***For now the search only works when no category is selected***
        return item.category === selectedCategory;
    });


    // Generic function to update input fields base on the input's names
    // function handleItemFormChange(event) {
    //     const name = event.target.name;
    //     let value = event.target.value;
        
    //     // For checkboxes use "checked" instead of value 
    //     if (event.target.type === "checkbox") {
    //         value = event.target.checked;
    //     }

    //     setItemFormData({
    //         ...itemFormData,
    //         [name]: value,
    //     })
    //     console.log(name, itemFormData);
    // }

    
    
    function handleItemFormSubmit(newItem) {
        setItems([...items, newItem]);
    }


        return (
        <div className="ShoppingList">
            <ItemForm onItemFormSubmit={handleItemFormSubmit} />

            <Filter onCategoryChange={handleCategoryChange} search={search} onSearchChange={handleSearchChange} />
            <ul className="Items">
                {itemsToDisplay.map((item) => (
                <Item key={item.id} name={item.name} category={item.category} />
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
