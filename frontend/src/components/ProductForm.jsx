import React from 'react';

/**
 * Componente ProductForm
 * Formulário reutilizável para criação e edição de produtos.
 */
const ProductForm = ({ formData, setFormData, onSubmit, isEditing, onCancelEdit }) => {
    return (
        <div className="form-container glass">
            <h2>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h2>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label>Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="Ex: Teclado Mecânico"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        placeholder="Detalhes opcionais"
                        value={formData.descricao}
                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    />
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <label>Quantidade</label>
                        <input
                            type="number"
                            min="0"
                            value={formData.quantidade}
                            onChange={(e) => setFormData({...formData, quantidade: Number(e.target.value)})}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Preço (R$)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData.preco}
                            onChange={(e) => setFormData({...formData, preco: Number(e.target.value)})}
                            required
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {isEditing ? 'Salvar Alterações' : 'Adicionar ao Estoque'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={onCancelEdit} className="btn-secondary">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
