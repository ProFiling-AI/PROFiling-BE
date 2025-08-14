import professorlistService from "../services/professorlist.service.js";

const professorlistController = {
    getMyProfessors: async (req, res, next) => {
    try {
        const userId = req.user.id; // authMiddleware에서 세팅됨
        const professors = await professorlistService.getProfessorsByUserId(userId);
        return res.success(professors, 200);
    } catch (error) {
        next(error);
    }
    }
};

export default professorlistController;
