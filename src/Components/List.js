import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import ConfirmModal from "./ConfirmModal";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const List = () => {
  const [title, setTitle] = useState("");
  const [lists, setLists] = useState(getLocalStorage());
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", style: "", status: false });
  const [isEditing, setIsEditing] = useState(false);
  const [itemId, setItemId] = useState(0);

  const [confirmItem, setConfirmItem] = useState("");

  const addToList = (e) => {
    e.preventDefault();
    if (!title) {
      setAlert({
        msg: "Input must not be empty",
        style: "bg-red-500 text-white",
        status: true,
      });
    } else if (isEditing) {
      setLists(
        lists.map((item) => {
          if (item.id === itemId) {
            return { ...item, title };
          }
          return item;
        })
      );
      setIsEditing(false);
      setTitle("");
    } else if (lists.length > 5) {
      setAlert({
        msg: "Maximum Items Exceeded",
        style: "bg-red-500 text-white",
        status: true,
      });
    } else {
      const newLists = { id: new Date().getTime().toString(), title };
      setAlert({
        msg: "Successfully Added",
        style: "bg-green-500 text-black",
        status: true,
      });
      setLists([...lists, newLists]);
      setTitle("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ status: false });
    }, 3000);
    return () => clearInterval(timeout);
  }, [alert]);

  const confirm = (item, id) => {
    setConfirmItem(item);
    setShow(true);
    setItemId(id);
  };

  const deleteItem = () => {
    setLists(lists.filter((item) => item.id !== itemId));
    setShow(false);
  };

  const editItem = (id) => {
    const found = lists.find((item) => item.id === id);
    setTitle(found.title);
    setItemId(id);
    setIsEditing(true);
    setAlert({
      msg: "You're in edit mode",
      style: "bg-red-500 text-white",
      status: true,
    });
  };

  return (
    <main className="mt-2">
      <form className="flex items-center">
        <input
          type="text"
          className="border-2 border-black outline-none rounded-sm h-[2rem]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-black text-white inline-block h-[2rem] w-[3rem] text-center"
          onClick={addToList}
        >
          {isEditing ? "Edit" : "Add"}
        </button>
      </form>
      <section className="mt-5">
        <ConfirmModal
          confirmItem={confirmItem}
          show={show}
          setShow={setShow}
          deleteItem={deleteItem}
          editItem={editItem}
        />
        {lists.map((list, index) => {
          const { id, title } = list;
          return (
            <div
              className="bg-black text-white my-2 h-[2rem] flex justify-between items-center p-2 rounded-sm"
              key={id}
            >
              <h1 className="capitalize">
                {index + 1}. {title}
              </h1>

              <ul className="flex space-x-1">
                <li
                  className="text-red-500 cursor-pointer"
                  onClick={() => confirm(title, id)}
                >
                  <BsTrash />
                </li>
                <li
                  className="text-green-500 cursor-pointer"
                  onClick={() => editItem(id)}
                >
                  <AiOutlineEdit />
                </li>
              </ul>
            </div>
          );
        })}
      </section>
      {alert.status && (
        <div
          className={`border-2 border-black absolute bottom-[-5rem] left-[50%] w-[90%] translate-x-[-50%] h-[3rem] p-1 flex items-center justify-center rounded-md
      ${alert.style}
      `}
        >
          <h1>{alert.msg}</h1>
        </div>
      )}
    </main>
  );
};

export default List;
