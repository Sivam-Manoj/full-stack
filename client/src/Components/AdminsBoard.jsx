import { useSelector } from "react-redux";

useSelector
const AdminsBoard = () => {
    const {userData} = useSelector((state)=>state.auth)
  return (
    <>
      <div className="w-[250px] h-[600px] rounded-[35px] mt-11 ml-11 bg-green-50">

        <h3 className="text-center pt-3 text-[0.9rem] font-sans text-slate-700 bg-green-100  rounded-tr-xl rounded-tl-xl">WELLCOME <span className=" uppercase">{userData.name}</span></h3>

      </div>
    </>
  );
};

export default AdminsBoard;
