import { Router } from "express";
import { auth } from "../../Middleware/auth.js";
import { validation } from "../../Middleware/validation.js";
import * as noteController from "./note.controller.js";
import {
  updatestatus,
  validationAddNotes,
  validationDeleteNote,
  validationUpdateInfo,
  validationUpdateOne,
} from "./note.validation.js";

const router = Router();

router.post(
  "/",
  validation(validationAddNotes),
  auth(),
  noteController.addNote
);
router.delete(
  "/:noteId",
  validation(validationDeleteNote),
  auth(),
  noteController.deleteNote
);
router.delete("/", auth(), noteController.deleteNotes);
router.get("/", auth(), noteController.getUserNotes);
router.put(
  "/:noteId",
  validation(validationUpdateOne),
  auth(),
  noteController.updateNote
);
router.put("/", auth(), validation(updatestatus), noteController.updateNotes);
router.put(
  "/info/:noteId",
  validation(validationUpdateInfo),
  auth(),
  noteController.updateNoteInfo
);
router.get("/searchByName/:name", auth(), noteController.searchByName);

export default router;
