import { post, put, get, deleteById, deleteAll } from './api';

export const adminListAPI = {
  async add(data: any) {
    const finishData = await post('admin-list/add', data); // добавление функции add на бэк
    return finishData;
  },

  async addSkill(data: any) {
    return post('admin-list/addSkill', data); // добавление функции add на бэк
  },
  async update(data: any) {
    return put(`admin-list/update/${data.id}`, data);
  },
  async updateSkill(data: any) {
    return put(`admin-list/update-skill/${data.skill_id}`, data);
  },
  async get(id: number) {
    return get(`admin-list/get/${id}`); // Используем метод GET и корректный URL
  },
  async deleteSkillById(id: number) {
    return deleteById('admin-list/deleteSkillById/', id);
  },
  async deleteById(id: number) {
    return deleteById('admin-list/deleteById/', id);
  },

  async deleteAll() {
    return deleteAll('admin-list/deleteAll'); // Отправка запроса на сервер для удаления всех данных
  },
  async getAll() {
    return get('admin-list/getAll'); // Используем метод GET для получения всех данных
  },
};
