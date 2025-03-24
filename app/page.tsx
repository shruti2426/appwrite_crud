'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
interface IInterpration {
  $id : string;
  term : string;
  interperation : string;
}

export default function Home() {

  const [interpretations, setInterpretations] = useState<IInterpration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchInterpretations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/interpertion");
        if(!response.ok){
          throw new Error("Failed to fetch interpretations");
        }
        const data = await response.json();
        setInterpretations(data);
        
      } catch (error) {
        console.error("Error fetching interpretations:", error);
        setError("Failed to fetch interpretations");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterpretations();
    }
    , []);

    const handleDelete = async (id: string) => {
      try {
        await fetch(`/api/interpertion/${id}`, {
          method: "DELETE"
        })
        setInterpretations((prevInterpretations) => prevInterpretations?.filter((i) => i.$id !== id));
      }
      catch(error){
        setError("Failed to delete interpretation");

      }
      
    }
  return (
 <div>
  {error && <p className="py-4 text-red-500">{error}</p>} 
  {isLoading ? (<p>Loading...</p>
  ) : interpretations?.length > 0 ? (<div>
    {
      interpretations?.map(interpretation=> (
        <div key={interpretation.$id} className="p-4 my-2 rounded-md border-b leading-8">
           <div className="font-bold">{interpretation.term}</div>
  <div>
   {interpretation.interperation}
    </div>

    <div className="flex gap-4 mt-4 justify-end">
      <Link  
      className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-wider" href={`/edit/${interpretation.$id}`}>Edit</Link>
      <button onClick ={() => handleDelete(interpretation.$id)} className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-wider">
        Delete
      </button>
      </div>
          </div>
      ))
    }
    
  </div>
      ):(
      <p>No interpretations found</p>)
      }

      </div>


  );
}
