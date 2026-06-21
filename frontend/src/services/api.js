// Pega a URL do Vite (Nginx passará isso no docker-compose) ou cai pro default local
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async getProducts() {
    const res = await fetch(`${API_URL}/produtos`);
    if (!res.ok) throw new Error('Erro ao buscar produtos');
    return res.json();
  },

  async createProduct(data) {
    const res = await fetch(`${API_URL}/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Erro ao criar produto');
    return res.json();
  },

  async updateProduct(id, data) {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Erro ao atualizar produto');
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Erro ao deletar produto');
    return res.json();
  }
};
