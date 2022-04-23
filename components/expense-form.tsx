import { useState } from "react";

const ExpenseForm = ({ changeDescription, changeAmount, changeShow, save}: any) => {  
    return (
        <div className="absolute top-0 left-0 bg-secondary h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans">
        <div className="h-screen w-full absolute flex items-center justify-center bg-modal">
          <div className="bg-tertiary rounded shadow p-8 m-4 max-w-xl max-h-full text-center overflow-y-scroll">
            <div className="p-4">
              <label className="text-white mr-4">Description</label>
              <input type="text" onChange={(e) => changeDescription(e.target.value)} />
            </div>
            <div className="p-4">
              <label className="text-white mr-4">Amount</label>
              <input type="text" onChange={(e) => changeAmount(+e.target.value)} />
            </div>
            <div className="flex justify-between p-4">
              <button
                onClick={() => changeShow()}
                className="px-4 py-2 font-bold rounded bg-secondary hover:bg-primary">
                CANCEL
              </button>
              <button
                onClick={() => save()}
                className="px-4 py-2 font-bold rounded bg-primary hover:bg-secondary">
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ExpenseForm;
  