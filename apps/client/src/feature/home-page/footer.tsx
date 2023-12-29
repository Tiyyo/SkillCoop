import Xtwitter from '../../assets/icon/Xtwitter';
import Facebook from '../../assets/icon/Facebook';
import Insta from '../../assets/icon/Insta';

function Footer() {
  return (
    <footer className="bg-dark py-12 px-12 lg:px-24 text-base-light w-full ">
      <ul className="flex flex-col lg:flex-row gap-x-4">
        <li>Home</li>
        <li>Our Product</li>
        <li>FAQ</li>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </ul>
      <div className="w-full py-3 flex ">
        <div className="flex flex-col w-full">
          <div
            className=" w-full basis-1/2 border-b 
          border-b-grey-sub-text"
          ></div>
          <div></div>
        </div>
        <ul
          className="bg-base-light basis-3/12 
          rounded-full min-w-fit max-w-[174px]
          flex items-center justify-center gap-x-5 px-5 py-2"
        >
          <li>
            <Xtwitter />
          </li>
          <li>
            <Facebook />
          </li>
          <li>
            <Insta />
          </li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row gap-12">
        <div>
          <p>Location</p>
          <p className="text-grey-sub-text">Paris, FR</p>
        </div>
        <div>
          <p>Contact</p>
          <p className="text-grey-sub-text">contact@skillcoop.fr</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
