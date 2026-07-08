interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export default function Container({
  children,
  className,
  centered = true,
}: ContainerProps) {
  return (
    <div
      className={`${centered ? 'flex items-center justify-center' : ''} w-full max-w-[100rem] mt-25 p-2 ${className}`}
    >
      {children}
    </div>
  );
}