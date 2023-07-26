import { FC } from "react";
import { FaCheck } from "react-icons/fa";
const ChecklistContainer: FC<Props> = ({
  essentials,
  notNeeded,
  packEssential,
  chosenCategory,
}) => {
  let chosenEssentials = essentials;
  if (chosenCategory !== "All") {
    chosenEssentials = essentials.filter(
      (item) => item.category === chosenCategory
    );
  }
  return (
    <div className=' w-full h-5/6 grid place-items-center'>
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
              Not Needed for You?
            </th>
            <th className='p-2 border-2 border-yellow-500 border-solid bg-yellow-400 text-black'>
              Amazon Link
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
                  {item.essential ? <FaCheck></FaCheck> : ""}
                </td>
                <td className='p-2 border-2 border-yellow-500 border-solid'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    onChange={() => {
                      notNeeded(item.id, !item.not_needed);
                    }}
                    checked={item.not_needed}
                  />
                </td>
                <td className='p-2 border-2 border-yellow-500 border-solid'>
                  <button className='bg-yellow-300 text-xs p-1 w-16 font-semibold shadow-lg rounded transition-all hover:bg-black hover:text-yellow-300'>
                    Shop Now
                  </button>
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
    not_needed: boolean;
    link: string;
  }[];
  packEssential: (id: string, packed: boolean) => void;
  notNeeded: (id: string, packed: boolean) => void;
  chosenCategory: string;
}
