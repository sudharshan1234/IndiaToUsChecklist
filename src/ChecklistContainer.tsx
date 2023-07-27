import { FC } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
const ChecklistContainer: FC<Props> = ({
  essentials,
  notEssential,
  packEssential,
  chosenCategory,
  changeAmount,
}) => {
  let chosenEssentials = essentials;
  if (chosenCategory !== "All") {
    chosenEssentials = essentials.filter(
      (item) => item.category === chosenCategory
    );
  }
  return (
    <div className=' w-full h-5/6 grid place-items-center overflow-x-scroll'>
      <table className='border-2 border-yellow-500 border-solid text-center'>
        <thead>
          <tr>
            <th className='p-2 border-2 border-yellow-500 border-solid bg-yellow-400 text-black'>
              Packed?
            </th>
            <th className='p-2 border-2 border-yellow-500 border-solid bg-yellow-400 text-black'>
              Name
            </th>
            <th className='p-2 border-2 border-yellow-500 border-solid bg-yellow-400 text-black'>
              Essential
            </th>
            <th className='p-2 border-2 border-yellow-500 border-solid bg-yellow-400 text-black'>
              Count
            </th>
            <th className='p-2 border-2 border-yellow-500 border-solid bg-yellow-400 text-black'>
              Shopping link
            </th>
          </tr>
        </thead>
        <tbody>
          {chosenEssentials.map((item) => {
            return (
              <tr key={item.id}>
                <td className='p-2 border-2 border-yellow-500 border-solid'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onChange={() => {
                      packEssential(item.id, !item.packed);
                    }}
                    checked={item.packed}
                  />
                </td>
                <td className='p-2 border-2 border-yellow-500 border-solid'>
                  {item.name}
                </td>

                <td className='p-2 border-2 border-yellow-500 border-solid'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onChange={() => {
                      notEssential(item.id, !item.essential);
                    }}
                    checked={item.essential}
                  />
                </td>
                <td className='p-2 border-2 border-yellow-500 border-solid grid grid-cols-1 md:grid-cols-3 place-items-center gap-1'>
                  <button
                    className='bg-yellow-300 p-2'
                    onClick={() => {
                      changeAmount(item.id, item.count - 1);
                    }}
                  >
                    <FaMinus></FaMinus>
                  </button>
                  <p className='w-10 border-2 border-yellow-300 px-2 text-xl inline-block'>
                    {item.count}
                  </p>
                  <button
                    className='bg-yellow-300 p-2'
                    onClick={() => {
                      changeAmount(item.id, Number(item.count) + 1);
                    }}
                  >
                    <FaPlus></FaPlus>
                  </button>
                </td>
                <td className='p-2 border-2 border-yellow-500 border-solid'>
                  {item.link1 !== "" ? (
                    <a
                      className='bg-yellow-300 text-xs p-1 w-16 cursor-pointer font-semibold shadow-lg rounded transition-all hover:bg-black hover:text-yellow-300'
                      target='_blank'
                      href={item.link1}
                    >
                      Shop Now
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ChecklistContainer;

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
  packEssential: (id: string, packed: boolean) => void;
  notEssential: (id: string, packed: boolean) => void;
  chosenCategory: string;
  changeAmount: (id: string, amount: number) => void;
}
