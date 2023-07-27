import { useEffect, useState } from "react";
import ChecklistContainer from "./ChecklistContainer";
import FilterBtns from "./FilterBtns";
import { essentials } from "./data";
import PercentagePacked from "./PercentagePacked";

export default function App() {
  const getFromLocalStorage: () => {
    id: string;
    category: string;
    name: string;
    packed: boolean;
    essential: boolean;
    count: number;
    link1: string;
  }[] = () => {
    const item = localStorage.getItem("essential");
    if (item) {
      return JSON.parse(item);
    } else {
      localStorage.setItem("essential", JSON.stringify(essentials));
      return essentials;
    }
  };
  const [essential, setEssential] = useState(getFromLocalStorage());
  const [chosenCategory, setChosenCategory] = useState("All");

  const updateLocalStorage = () => {
    localStorage.setItem("essential", JSON.stringify(essential));
  };

  useEffect(() => {
    updateLocalStorage();
  }, [essential]);

  const changeCategory = (category: string) => {
    setChosenCategory(category);
  };

  const packEssential = (id: string, packed: boolean) => {
    const tmpArr = essential.map((item) => {
      if (item.id === id) {
        item.packed = packed;
      }
      return item;
    });
    setEssential(tmpArr);
  };
  const notEssential = (id: string, essentialBool: boolean) => {
    const tmpArr = essential.map((item) => {
      if (item.id === id) {
        item.essential = essentialBool;
      }
      return item;
    });
    setEssential(tmpArr);
  };

  const changeAmount = (id: string, amount: number) => {
    if (amount < 1) {
      return;
    }
    const tmpArr = essential.map((item) => {
      if (item.id === id) {
        item.count = amount;
      }
      return item;
    });
    setEssential(tmpArr);
  };

  const resetToDefault = () => {
    if (confirm("Are you sure you want to reset everything to default?")) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <section>
      <h1 className='text-2xl font-bold underline text-center md:text-2xl'>
        THE ULTIMATE PACKING CHECKLIST
      </h1>
      <p className='w-[90vw] text-center my-2 mx-auto text-xl bg-yellow-300 rounded-md p-3'>
        I am sure you are excited and looking forward to your journey abroad
        this fall. Worried you missed something essential while packing? I’ve
        got you covered! This list is very exhaustive, so don’t feel like you
        need to take everything. Use it as a reference to ensure you don’t miss
        something important.{" "}
        <span className='bg-black text-yellow-400 p-1'>
          Your personal checklist will be stored locally in your browser, so you
          don't have to worry. Feel free to share it with your friends!
        </span>
      </p>
      <div className='md:w-[90vw] my-0 mx-auto'>
        <FilterBtns
          essentials={essential}
          changeCategory={changeCategory}
          chosenCategory={chosenCategory}
        ></FilterBtns>
        <button
          className='text-xl p-2 bg-yellow-300 font-semibold shadow-lg rounded transition-all hover:bg-black hover:text-yellow-300 '
          onClick={resetToDefault}
        >
          Reset to Default
        </button>
        <PercentagePacked essentials={essential}></PercentagePacked>
        <ChecklistContainer
          essentials={essential}
          notEssential={notEssential}
          packEssential={packEssential}
          chosenCategory={chosenCategory}
          changeAmount={changeAmount}
        ></ChecklistContainer>
      </div>
    </section>
  );
}
