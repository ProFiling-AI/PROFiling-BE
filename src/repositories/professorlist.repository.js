import { prisma } from "../db.config.js";

const professorlistRepository = {
    findByUserId: async (userId) => {
    return await prisma.professor.findMany({
        where: { user_id: userId },
            select: {
            professor_name: true,
            department: true,
            gender: true,
            subject_name: true,
        },
    });
    },
};

export default professorlistRepository;