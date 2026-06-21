// O Vite expõe variáveis de ambiente usando import.meta.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Utilitário genérico para fazer requisições fetch à API.
 * 
 * @param {string} endpoint - Caminho da API (ex: '/produtos')
 * @param {Object} options - Configurações padrão do fetch (método, corpo, etc)
 * @returns {Promise<any>} - Resposta em formato JSON
 */
const apiFetch = async (endpoint, options = {}) => {
    // Configura headers padrão e injeta token de autenticação se disponível
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        // Se retornar erro 401, remove token e redireciona (Sessão Expirada)
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Sessão expirada. Por favor, faça login novamente.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || `Erro na requisição: ${response.status}`);
        }

        // Caso a resposta seja 204 No Content, não fazemos parse de JSON
        if (response.status === 204) return null;

        return await response.json();
    } catch (error) {
        console.error(`Erro na requisição ${options.method || 'GET'} ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Objeto de serviços agrupados para a entidade Produto.
 */
export const ProductService = {
    getAll: () => apiFetch('/produtos'),
    create: (data) => apiFetch('/produtos', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiFetch(`/produtos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/produtos/${id}`, { method: 'DELETE' }),
};

/**
 * Objeto de serviços agrupados para a entidade Autenticação.
 */
export const AuthService = {
    login: (email, senha) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
    register: (nome, email, senha) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ nome, email, senha }) }),
};
