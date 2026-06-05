import Note from "../models/Note.js";
// export const getAllNotes = (req, res) => {
//     res.status(200).send("You just fetched the notes");
// }

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1}); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error); // debugging purpose
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error); // debugging purpose
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    // console.log(title, content)
    // by default you cannot access these value
    // you need app.use(express.json()); in server.js

    // create a note
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error); // debugging purpose
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }, // return the updated note with the updated field
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error); // debugging purpose
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Not not found" });

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error); // debugging purpose
    res.status(500).json({ message: "Internal server error" });
  }
}
