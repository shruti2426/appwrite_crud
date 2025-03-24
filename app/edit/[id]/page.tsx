"use client";
import { useEffect, useState, use } from "react";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // ✅ Unwrap `params`
    const [formData, setFormData] = useState({ term: "", interperation: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/interpertion/${id}`); // ✅ Use unwrapped `id`
                if (!response.ok) throw new Error("Failed to fetch interpretations");

                const data = await response.json();
                setFormData({ term: data.term, interperation: data.interperation });
            } catch (error) {
                console.error(error);
                setError("Failed to fetch interpretation");
            }
        };
        fetchData();
    }, [id]); // ✅ Add `id` as dependency

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.term || !formData.interperation) {
            setError("Please fill in all fields");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/interpertion/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update interpretation");

            router.push("/");
        } catch (error) {
            console.error(error);
            setError("Something went wrong, Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Edit Interpretation</h2>
            <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
                <input
                    type="text"
                    name="term"
                    placeholder="term"
                    value={formData.term}
                    className="py-1 px-4 border rounded-md"
                    onChange={handleInputChange}
                />
                <textarea
                    name="interperation" // ✅ Fixed typo
                    rows={4}
                    placeholder="Interpretation"
                    value={formData.interperation}
                    className="py-1 px-4 border rounded-md resize-none"
                    onChange={handleInputChange}
                />
                <button className="bg-black text-white mt-5 px-4 py-1 rounded-md">
                    {isLoading ? "Updating..." : "Update Interpretation"}
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
