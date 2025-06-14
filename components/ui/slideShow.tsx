import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import unileverBanner from "../../assets/img/mas.png";
import ifsBanner from "../../assets/img/gtn.png";
import ifs from "../../assets/img/ifs.png";
import sensusHub from "../../assets/img/sensusHub-cropped.png";

const slideimgs = [unileverBanner, ifsBanner, ifs,sensusHub];
const delay = 2500;

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slideimgs.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="mx-auto overflow-hidden max-w-md mt-10">
      <div
        className="whitespace-nowrap transition ease-linear duration-1000"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slideimgs.map((slideimg, index) => (
          <div className="inline-block w-full rounded-lg" key={index}>
            <Image
              className="w-full h-auto rounded-lg p-2"
              src={slideimg}
              alt={`Slide ${index}`}
              layout="responsive"
              width={500}
              height={300}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {slideimgs.map((_, idx) => (
          <div
            key={idx}
            className={`inline-block h-5 w-5 rounded-full cursor-pointer mx-2 ${
              index === idx ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
