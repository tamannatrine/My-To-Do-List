import { cleanup } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import "./style.css";

//Gettin the local storage data
const getLocalStorageData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorageData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //function for adding items
  const addItem = () => {
    
    if (!inputdata) {
      alert("Plz fill");
    }
    
    else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata }
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem();
      setToggleButton(false);
    }
    
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //function for editing items
  const editItem = (index) => { 
    const editedItem = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(editedItem.name);
    setIsEditItem(index);
    setToggleButton(true);

  };

  //function for deleting items
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    }); 
    setItems(updatedItems);
  };
  
  //Removing all the elemennts
  const removeAll = () => {
    setItems([]);
  };

  // Setting Data on Local Storge
  useEffect(() => {
    localStorage.setItem("mytodolist",JSON.stringify(items));
  }, [items]);
  


  return (
    <>
      <div className="main-div">
        <div className='child-div'>
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>My To Do List</figcaption>
          </figure>
          <div className='addItems'>
            <input
              type="text"
              placeholder="✍ Add Item"
              className='form-control'
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )
            }
          </div>

          {/* show our Items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>                
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">                     
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}>
                    </i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}>
                    </i>
                  </div>
                </div>
              );
            })}            
          </div>

          {/* remove all button */}
          <div className="addItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span><b>CHECK LIST</b> </span> 
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;