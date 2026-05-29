import React from "react";

export const MemoryRouter = ({ children }) =>
	React.createElement("div", null, children);
export const BrowserRouter = ({ children }) =>
	React.createElement("div", null, children);
export const Routes = ({ children }) =>
	React.createElement("div", null, children);
export const Route = () => null;
export const Link = ({ children, ...props }) =>
	React.createElement("a", props, children);
export const NavLink = ({ children, ...props }) =>
	React.createElement("a", props, children);
export const useNavigate = () => jest.fn();
export const useParams = () => ({});
export const useLocation = () => ({ pathname: "/" });
export const Outlet = () => null;
