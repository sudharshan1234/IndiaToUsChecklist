import { FC } from "react";

const FilterBtns: FC<Props> = ({
  essentials,
  changeCategory,
  chosenCategory,
}) => {
  const categories = [
    "All",
    ...new Set(essentials.map((item) => item.category)),
  ];
  console.log(categories);

  return (
    <div className='my-5 mx-auto'>
      <div className='flex gap-1 justify-center flex-wrap items-center'>
        {categories.map((category, index) => {
          return (
            <button
              key={index}
              className={` text-xl p-2 font-semibold shadow-lg rounded transition-all hover:bg-black hover:text-yellow-300 ${
                category === chosenCategory
                  ? "bg-black text-yellow-300"
                  : "bg-yellow-300 text-black"
              }`}
              onClick={() => {
                changeCategory(category);
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default FilterBtns;

interface Props {
  essentials: {
    id: string;
    category: string;
    name: string;
    packed: boolean;
    essential: boolean;
    count: number;
    link1: string;
  }[];
  changeCategory: (category: string) => void;
  chosenCategory: string;
}
