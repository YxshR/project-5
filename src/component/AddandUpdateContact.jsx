import { Form, Formik, ErrorMessage, Field } from "formik";
import Model from "./Model";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";


const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddandUpdateContact = ({isOpen, onClose, isUpdate , contact}) => {


    const addContact = async (contact) =>{
        try{

            const contactref = collection(db, "Contacts");
            await addDoc(contactref, contact);
            onClose();
            toast.success("Contact Added Successfully");
        }catch (error){}    
    };

    const updateContact = async (contact) =>{
        try{

            const contactref = doc(db, "Contacts");
            await updateDoc(contactref, contact);
            onClose();
            toast.success("Contact Updated Successfully");
        }catch (error){}
    };


  return (
    <div>      
    <Model isOpen={isOpen} onClose={onClose}> 
        <Formik
        validationSchema={contactSchemaValidation}
        initialValues={
            isUpdate ? {
                name:"contact.name",
                email:"contact.email",
            }
            :{
                name:"",
                email:"",
            }
        }
        onSubmit={(values) => {
            
            isUpdate ?
            updateContact(values, contact.id):
            addContact(values);

        }}
        >
            <Form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Name</label>
                    <Field name = "name" className="h-10 border" />
                    <div className="text-red-500 text-rs">
                        <ErrorMessage name="name" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <Field name = "email" className="h-10 border" />
                    <div className="text-red-500 text-rs">
                        <ErrorMessage name="email" />
                    </div>
                </div>

                <button className="bg-orange px-3 py-1.5 border self-end">
                    { isUpdate ? "update" : "add"} contact
                </button>
            </Form>
        </Formik>
    </Model>
    </div>
  )
}

export default AddandUpdateContact;