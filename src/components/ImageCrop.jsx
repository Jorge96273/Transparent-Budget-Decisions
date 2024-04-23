import { useEffect, useState } from 'react';

const ImageCrop = ({children}) => {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach the event listener to the window resize event
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="" style={{ width: viewportSize.width, height: viewportSize.height, overflow: 'hidden'}}>
      {children}
    </div>
  );
};

export default ImageCrop;