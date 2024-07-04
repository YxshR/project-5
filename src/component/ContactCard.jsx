import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddandUpdateContact from "./AddandUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";


const ContactCard = ({contact}) => {

  const {isOpen, onOpen, onClose} = useDisclouse();


  const deleteContact = (id) =>{
    try{
        await deleteDoc(doc(db, "Contacts", id));
        toast.success("Contact Delected Successfully")
    } catch (error){}
  }
  return (
    <>
       <div key={contact.id} className="bg-yellow justify-between flex items-center rounded-lg p-2">
                <div className="flex gap-1  ">
                <HiOutlineUserCircle className="bg-orange text--4xl"/>
                <div className="">
                    <h2 className="font-medium">{contact.name}</h2>
                    <p className="text-sm">{contact.email}</p>
                </div>
                </div>

                <div className="flex text-3xl">
                <IoMdTrash onClick= {() => deleteContact(contact.id)} className="text-orange cursor-pointerr"  />
                <RiEditCircleLine onClick={onOpen} className="cursor-pointer "/>
                </div>
        </div>
        <AddandUpdateContact className="cursor-pointer" 
        contact={contact}
        isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ContactCard