interface DividerProps {
  space?: string;
}
export const Divider = ({ space }: DividerProps) => {
  return (
    <div className={`flex items-center justify-center py-${space || 6}`}>
      <div className="w-full h-[0.5px] bg-gray-100 dark:bg-gray-700"></div>
    </div>
  );
};
