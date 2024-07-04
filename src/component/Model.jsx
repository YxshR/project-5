import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai"

const Model = ({onClose, isOpen, childern}) => {
  return createPortal(
    <>
    {isOpen && (
    <div  className="backdrop-blur h-screen absolute top-0 w-screen z-40 grid place-items-center">
    <div className=" z-50 m-auto relative min-h-[200px] min-w-[80%] bg-white p-4">
            <div className="flex justify-end">
                <AiOutlineClose onClick={onClose} className="text-2xl self-end "/>
                {childern}
            </div>
            
        </div>
        
    </div>
  )}
    </>,
  document.getElementById("modal-root"));
}

export default Model;