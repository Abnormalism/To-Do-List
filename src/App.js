import React from "react";
import List from "./Components/List";
import ConfirmModal from "./Components/ConfirmModal";

const App = () => {
  return (
    <main className="h-screen relative flex items-center justify-center">
      <div className="border-2 border-black w-[90%] min-h-[10rem] max-w-[450px] rounded-md flex flex-col items-center p-3 absolute ">
        <h1 className="text-2xl font-semibold">Todo List</h1>
        <List />
      </div>
    </main>
  );
};

export default App;
