import noteModel from "../../Db/models/note.model.js";

export const addNote = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, desc } = req.body;
    const newNote = new noteModel({ name, desc, createdBy: _id });
    const savedNote = await newNote.save();
    if (savedNote) {
      res.json({ message: "Note saved successfuly", savedNote });
    } else {
      res.json({ message: "Note Saved Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.params;
    const note = await noteModel.findById(noteId);
    if (_id.toString() == note.createdBy.toString()) {
      const deletedNote = await noteModel.deleteOne({ _id: noteId });
      res.json({ message: "Done", deletedNote });
    } else {
      res.json({ message: "Not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.body;
    const notes = await noteModel.find({
      createdBy: _id,
      _id: {
        $in: noteId,
      },
    });
    if (notes.length) {
      const deletedNotes = await noteModel.deleteMany({
        createdBy: _id,
        _id: {
          $in: noteId,
        },
      });
      if (deletedNotes.deletedCount > 0) {
        res.json({ message: "Done", deletedNotes });
      } else {
        res.json({ message: "Not authorized" });
      }
    } else {
      res.json({ message: "No notes found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const getUserNotes = async (req, res) => {
  try {
    const { _id } = req.user;
    const notes = await noteModel.find({ createdBy: _id });
    if (notes.length) {
      res.json({ message: "done", notes });
    } else {
      res.json({ message: "no notes found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.params;
    const note = await noteModel.findOneAndUpdate(
      { _id: noteId, createdBy: _id },
      { status: true }
    );
    if (note) {
      res.json({ message: "done", note });
    } else {
      res.json({ message: "not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.body;
    console.log({ noteId });
    const notes = await noteModel.find({
      createdBy: _id,
      _id: {
        $in: noteId,
      },
    });
    if (notes.length) {
      const updatedNotes = await noteModel.updateMany(
        {
          createdBy: _id,
          _id: {
            $in: noteId,
          },
        },
        { status: true }
      );
      if (updatedNotes.modifiedCount) {
        res.json({ message: "Done", updatedNotes });
      } else {
        res.json({ message: "Not authorized" });
      }
    } else {
      res.json({ message: "No notes found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const updateNoteInfo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { noteId } = req.params;
    const { name, desc } = req.body;
    const note = await noteModel.findOneAndUpdate(
      { _id: noteId, createdBy: _id },
      { name, desc },
      { new: true }
    );
    if (note) {
      res.json({ message: "done", note });
    } else {
      res.json({ message: "not authorized" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};

export const searchByName = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name } = req.params;
    const notes = await noteModel.find({
      name: { $regex: `^${name}` },
      createdBy: _id,
    });
    if (notes.length) {
      res.json({ message: "Done", notes });
    } else {
      res.json({ message: "there is no notes by that name" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "catch error" });
  }
};
