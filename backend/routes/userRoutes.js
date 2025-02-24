import { Router } from "express"
import {addMarks, createStudent, deleteStudent, fetchStudents, getStudentDetails, getStudentMarks, updateStudent} from "../controller/userController.js" 
const router = Router();

router.post("/", createStudent)

router.get("/", fetchStudents);
router.get("/getMarks/:id", getStudentMarks)

router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

router.get("/:id",getStudentDetails);


// for backend
router.post("/add",addMarks)


export default router;