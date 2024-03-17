import React from "react";

type ContainerLayoutProps = {
  children: React.ReactNode;
  
};

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
  return (
    <div className="w-[90%] 2xl:w-[75%] 3xl:w-[70%] 4xl:w-[65%] mx-auto h-[95%]">
      {children}
    </div>
  );
};

export default ContainerLayout;
