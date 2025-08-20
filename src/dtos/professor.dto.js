const professorListDto = (list) => {
    return list.map(list => ({
        professor_name: list.name,
        department: list.department,
        gender: list.gender,
        subject_name: list.subject_name,
    }));

};

export default {
    professorListDto,
};