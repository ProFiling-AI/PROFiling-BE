import { prisma } from "../db.config.js";
import authError from "../errors/auth.error.js";

const findProfessor =  async (professor_id) => {
    try {
        return await prisma.professor.findMany({
        where: { id: professor_id },
            select: {
            name: true,
            department: true,
            gender: true,
            subject_name: true,
        },
    });
    } catch (error) {
        throw new authError.DataBaseError('Error on finding professor list');
    }
    
};

export default {
    findProfessor,
}