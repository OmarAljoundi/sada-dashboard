import { SideMenu } from "@/components/layout/side-menu";
import { FC, useEffect, useState } from "react";

const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section>{children}</section>;
};

export default MainLayout;
