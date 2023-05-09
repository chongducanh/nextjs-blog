import Navigation from "./storyblok/navigation";
 
const Layout = ({ children }) => (
  <div>
    <Navigation/>
      {children}
  </div>
);
 
export default Layout;