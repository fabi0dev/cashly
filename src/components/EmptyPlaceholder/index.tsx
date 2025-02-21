interface EmptyPlaceholderProps {
  title: string;
  description?: string;
}

export const EmptyPlaceholder = ({
  title,
  description,
}: EmptyPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div>
        <img src="/ui/piggy-bank.png" className="w-36 opacity-80" />
      </div>
      <div className="text-gray-900 dark:text-gray-400 text-center">
        <div className="font-bold">{title ?? "Nada para mostrar"}</div>
        {description && <div className="text-gray-500">{description}</div>}
      </div>
    </div>
  );
};
