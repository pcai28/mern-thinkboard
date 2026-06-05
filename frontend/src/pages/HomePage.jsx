import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]); // by default this will be an empty array
  const [loading, setLoading] = useState(true); // as soon as we visit the HomePage, we'll try to fetch the notes

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // if you were to use fetch, this is how you would do it:
        // const res = await fetch("http://localhost:5001/api/notes");
        // const data = await res.json();
        // console.log(data);
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes"); // either case finally the loading state is false
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div>
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default HomePage;
