'use client';
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreatePage(){

    const [formData, setFormData] = useState({term: "", interperation: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData((prevData) =>
        ({
            ...prevData,
            [e.target.name]: e.target.value,
        })
        );
    }
        console.log(formData);
        const handleSubmit  = async (e: React.FormEvent) =>{
            e.preventDefault();

        if(!formData.term || !formData.interperation){
            setError("Please fill in all fields ");
            return;
        }

        setError(null);
        setIsLoading(true);

        try{
            const response = await fetch("/api/interpertion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if(!response.ok){
                throw new Error("Failed to create interpretation");
            }
            router.push("/");
            // const data = await response.json();
            // console.log(data);
            // setFormData({term: "", interpretation: ""});
            // setError(null);

        }
        catch(error){
        console.log(error)
        setError("Something went wrong, Please try again.");
        }
        finally{
        setIsLoading(false);
        }
    }

    return <div>
        <h2 className="text-2xl font-bold">Add New Interpretation</h2>
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
            <input 
            type="text"
             name= "term"
              placeholder="term"
              value={formData.term}
              className="py-1 px-4 border wounded-md" 
              onChange={handleInputChange}/>

            <textarea 
            name="interperation"
            rows={4}
            placeholder="interperation"
            value={formData.interperation}
            className="py-1 px-4 border rounded-md resize-none"
            onChange={handleInputChange} >

            </textarea>
            <button className="bg-black text-white mt-5 px-4 py-1 rounded-md
            cursor-pointer" type="submit"
            disabled={isLoading}>
              
              {isLoading ? "Adding..." : "Add Interpretation"}  
            </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
         </div>;
    
}