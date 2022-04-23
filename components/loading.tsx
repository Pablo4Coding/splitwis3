const Loading = () => {
  return (
    <div className="absolute top-0 left-0 bg-secondary h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans">
      <div className="h-screen w-full absolute flex items-center justify-center bg-modal text-white text-xl tracking-widest">
        MINING...
      </div>
    </div>
  );
};

export default Loading;
