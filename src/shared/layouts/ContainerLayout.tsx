import React from "react";

type ContainerLayoutProps = {
  children: React.ReactNode;
};

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] 2xl:max-w-[50%] mx-auto">
      {children}
    </div>
  );
};

export default ContainerLayout;
