  import { FiSearch } from "react-icons/fi"
import Navbar from "./component/Navbar"
import { AiFillPlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import ContactCard from "./component/ContactCard"
import { db } from "./config/firebase"
import AddandUpdateContact from "./component/AddandUpdateContact"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDisclouse from "./hooks/useDisclouse"
import Notfound from "./component/Notfound"

const App = () => {

  const [contacts, setContacts] = useState([]);

  const {isOpen, onOpen, onClose} = useDisclouse();



  useEffect(() => {

    const getContants = async () => {
      try {
          const contactsRef = collection(db, "Contacts");
          

          onSnapshot(contactsRef, (snapshot) => {
            const contactLists = snapshot.docs.map((doc) => {
              return{
                id: doc.id,
                ...doc.data(),
              };
            });
            setContacts(contactLists); 
            return contactLists; 
          })


          
      } catch (error) {}
    };
    getContants();
  }, []);

  const  filterContact  = (e) => {
    const value = e.target.value; 

    const contactsRef = collection(db, "Contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return{
          id: doc.id,
          ...doc.data(),
        };
      });


      const filteredContacts = contactLists.filter(contact => contact.name.toLowercase().includes(value.toLowercase()) );
      setContacts(filteredContacts); 




      return filteredContacts; 
    })
  }






  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow ">
            <FiSearch className="text-white text-3xl absolute ml-1 "/>
            <input onChange={filterContact}
            type="text" className="border bg-transparent border-white rounded-md h-10 flex-grow text-white pl-9 " />
          </div>

          <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer"/>

        </div>
        <div className="mt-4 gap-3 flex flex-col" >
          { contacts.length <= 0 ? ( <Notfound /> ) :
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} /> 
          ))
          }</div>
      </div>
          <AddandUpdateContact onClose={onClose} isOpen={isOpen}/>
          <ToastContainer position="buttom-center"/>
    </>
  )
}

export default App