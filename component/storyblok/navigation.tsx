import { useState } from "react";
import Link from "next/link";
const Navigation = () => {
  const [openMenu, setOpenMenu] = useState(false);
 
  return (
    <div className="relative bg-white border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center  py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              
            
                <img
                  className="h-20 w-auto sm:h-10 hidden sm:block"
                  src='https://a.storyblok.com/f/88751/251x53/0d3909fe96/storyblok-primary.png'
                  alt="Storyblok"
                />
                
             
            </Link>
            </div>
          </div>
      </div>

    </div>
  );
};
 
export default Navigation;