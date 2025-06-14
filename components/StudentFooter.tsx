import Image from "next/image";
import mas from "../assets/img/mas.png";
import ifs from "../assets/img/ifs.png";
const ResponsiveComponent = () => {
  return (
    <div className="container-fluid w-full mt-7 flex flex-col items-center justify-center">
      {/* Color line */}
      <div className="bg-gradient-to-r from-stv-yellow via-stv-blue to-stv-dark-blue w-full h-1.5 rounded mb-5"></div>

      <div className="w-full mt-7">
        {/* main row */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">
              Main Industrial Partner
            </div>
            <div className="w-36 h-36 flex justify-center items-center">
              <Image src={ifs} alt="logo" width={150} height={20} />
            </div>
          </div>
        </div>
        {/* first row */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Organized By</div>
            <div className="h-16 flex justify-center items-center">
              <Image
                src="/companyImg/SBlogo.png"
                alt="logo"
                width={230}
                height={20}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Supported By</div>
            <div className="h-16 flex justify-center items-center">
              <Image
                src="/companyImg/yplogo.png"
                alt="logo"
                width={230}
                height={20}
              />
            </div>
          </div>
        </div>

        {/* second row */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-5 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Gold Partner</div>
            <div className="w-36 h-36 flex justify-center items-center">
              <Image
                src={mas}
                alt="mas"
                width={200}
                height={200}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Silver Partner</div>
            <div className="w-36 h-36 flex justify-center items-center">
              <Image
                src="/companyImg/gtnlogo.png"
                alt="logo"
                width={130}
                height={20}
              />
            </div>
          </div>
        </div>

        {/* third row */}
        {/* <div className="flex flex-col md:flex-row justify-center items-center mt-5 gap-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Silver Partner</div>
            <div className="h-24 flex justify-center items-center">
              <Image
                src="/companyImg/gtnlogo.png"
                alt="logo"
                width={130}
                height={20}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Silver Partner</div>
            <div className="h-24 flex justify-center items-center">
              <Image
                src="/companyImg/PickMe---_Silver.png"
                alt="logo"
                width={200}
                height={20}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-center text-lg w-64">Bronze Partner</div>
            <div className="h-24 flex justify-center items-center">
              <Image
                src="/companyImg/ZeroBeta.png"
                alt="logo"
                width={150}
                height={20}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ResponsiveComponent;
