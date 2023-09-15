import { MenuItemStyles, menuClasses } from "react-pro-sidebar";
import styled from "@emotion/styled";

// hex to rgba converter
export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;
export const themes = {
  sidebar: {
    backgroundColor: "#212121",
    color: "#8ba1b7",
  },
  menu: {
    menuContent: "#082440",
    icon: "#59d0ff",
    hover: {
      backgroundColor: "white",
      color: "#d32f2f",
    },
    disabled: {
      color: "#3e5e7e",
    },
  },
};

export const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: "16px",
    fontWeight: 400,
    color: "white",
  },
  icon: {
    color: "white",
    [`&.${menuClasses.disabled}`]: {
      color: themes.menu.disabled.color,
    },
  },
  SubMenuExpandIcon: {
    color: "#b6b7b9",
  },
  subMenuContent: ({ level }) => ({
    backgroundColor:
      level === 0
        ? hexToRgba(themes.sidebar.backgroundColor, 1)
        : "transparent",
  }),
  button: {
    [`&.${menuClasses.disabled}`]: {
      color: themes.menu.disabled.color,
    },
    "&:hover": {
      backgroundColor: hexToRgba(themes.menu.hover.backgroundColor, 0.8),
      color: themes.menu.hover.color,
      [`& .ps-menu-icon`]: {
        color: themes.menu.hover.color,
      },
      [`& .ps-submenu-expand-icon`]: {
        color: themes.menu.hover.color,
      },
    },
  },
  label: ({ open }) => ({
    fontWeight: open ? 600 : undefined,
    paddingRight: "10px",
  }),
};
