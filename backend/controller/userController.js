import prisma from "../DB/db.config.js";

export const fetchStudents = async (req, res) => {
  
  const students = await prisma.student.findMany({
  });

  return res.json({ status: 200, data: students });
};

// export const fetchStudents = async (req, res) => {
//   try {
//     let { page = 1, limit = 4 } = req.query; // Default limit is 4 per page
//     page = parseInt(page);
//     limit = parseInt(limit);

//     const totalStudents = await prisma.student.count(); // Get total number of students
//     const students = await prisma.student.findMany({
//       skip: (page - 1) * limit, // Skip students based on page number
//       take: limit, // Take only 4 students per page
//     });

//     return res.json({
//       status: 200,
//       data: students,
//       totalStudents,
//       totalPages: Math.ceil(totalStudents / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     return res.status(500).json({ status: 500, message: "Server Error" });
//   }
// };


export const createStudent = async (req, res) => {
  const { name, email } = req.body;

  const findStudent = await prisma.student.findUnique({
    where: { email },
  });

  if (findStudent) {
    return res.json({
      message: "Email Already Taken.",
    });
  }
  const newStudent = await prisma.student.create({
    data: {
      name,
      email,
    },
  });
  return res.json({
    message: "User Created",
    Data: newStudent,
  });
};

export const getStudentMarks = async (req, res) => {
  const studentId = parseInt(req.params.id);

  try {
    const marks = await prisma.mark.findMany({
      where: { studentId: studentId },
      select: {
        subject: true,
        score: true,
      },
    });

    if (!marks.length) {
      return res.status(404).json({ status: 404, message: "No marks found for this student" });
    }

    return res.json({ status: 200, data: marks });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Error fetching marks", error: error.message });
  }
};

export const getStudentDetails = async (req, res) => {
  const studentId = parseInt(req.params.id);

  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        name: true,
        email: true,
      },
    });

    if (!student) {
      return res.status(404).json({ status: 404, message: "Student not found" });
    }

    return res.json({ status: 200, data: student });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Error fetching student details", error: error.message });
  }
};



//  update the user
export const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name, email } = req.body;

  await prisma.student.update({
    where: {
      id: parseInt(studentId),
    },
    data: {
      name,
      email,
    },
  });

  return res.json({ status: 200, message: "User updated successfully" });
};

// * Delete user
export const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  await prisma.student.delete({
    where: {
      id: parseInt(studentId),
    },
  });

  return res.json({ msg: "User deleted successfully" });
};

export const addMarks = async (req, res) => {
  try {
    const { studentId, subject, score } = req.body;

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Create a new mark record
    const mark = await prisma.mark.create({
      data: { studentId, subject, score },
    });

    res.status(201).json(mark);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};