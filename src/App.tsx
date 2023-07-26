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
    not_needed: boolean;
    link: string;
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
  const notNeeded = (id: string, not_needed: boolean) => {
    const tmpArr = essential.map((item) => {
      if (item.id === id) {
        item.not_needed = not_needed;
      }
      return item;
    });
    setEssential(tmpArr);
  };

  return (
    <section>
      <h1 className='text-2xl font-bold underline text-center md:text-2xl'>
        THE ULTIMATE PACKING CHECKLIST
      </h1>
      <div className='md:w-[90vw] my-0 mx-auto'>
        <FilterBtns
          essentials={essential}
          changeCategory={changeCategory}
          chosenCategory={chosenCategory}
        ></FilterBtns>
        <PercentagePacked essentials={essential}></PercentagePacked>
        <ChecklistContainer
          essentials={essential}
          notNeeded={notNeeded}
          packEssential={packEssential}
          chosenCategory={chosenCategory}
        ></ChecklistContainer>
      </div>
    </section>
  );
}
