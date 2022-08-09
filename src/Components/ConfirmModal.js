import React from "react";

const ConfirmModal = ({ confirmItem, show, setShow, deleteItem }) => {
  if (show)
    return (
      <main className="absolute z-10 top-[-4.5rem] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[7rem] min-w-[90%] text-black border-2 border-black max-w-[450px] p-2 flex flex-col items-center justify-around">
        <h1 className="text-center">
          Are you sure you want to delete
          <span className="text-red-500 capitalize font-bold ml-1">
            {confirmItem}
          </span>{" "}
          ?
        </h1>
        <div className="space-x-5">
          <button
            className="p-1 bg-red-500 shadow-md text-white"
            onClick={() => deleteItem()}
          >
            Confirm
          </button>
          <button
            className="border-2 border-black p-1 shadow-md"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      </main>
    );
};

export default ConfirmModal;
