import { FC } from "react";

const PercentagePacked: FC<Props> = ({ essentials }) => {
  const totalLen = essentials.filter((item) => item.essential).length;
  const packedEssential = essentials.filter(
    (item) => item.essential && item.packed
  ).length;

  const percentage = ((packedEssential * 100) / totalLen).toFixed(2);
  let color = "bg-red-500";
  if (Number(percentage) > 33 && Number(percentage) < 66) {
    color = "bg-yellow-500";
  }
  if (Number(percentage) > 66) {
    color = "bg-green-500";
  }
  return (
    <div className='flex justify-center items-center m-3'>
      <h3 className='text-4xl'>Percentage of essentials packed: </h3>
      <div
        className={`h-28 w-28 p-2 rounded-full flex justify-center bg-re items-center text-white text-3xl ${color}`}
      >
        {((packedEssential * 100) / totalLen).toFixed(2)}%
      </div>
    </div>
  );
};
export default PercentagePacked;

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
}
