import React from 'react';

/**
 * Componente ProductList
 * Responsável por renderizar a tabela de produtos.
 */
const ProductList = ({ produtos, formatCurrency, onEdit, onDelete }) => {
    return (
        <div className="table-container glass">
            <div className="table-header">
                <h2>Inventário Atual</h2>
                <div className="badge">{produtos.length} produtos</div>
            </div>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Qtd</th>
                            <th>Preço Unitário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.length > 0 ? (
                            produtos.map(produto => (
                                <tr key={produto.id}>
                                    <td>#{produto.id}</td>
                                    <td className="font-medium">{produto.nome}</td>
                                    <td className="text-muted">{produto.descricao || '-'}</td>
                                    <td>
                                        <span className={`status-badge ${produto.quantidade === 0 ? 'out-stock' : 'in-stock'}`}>
                                            {produto.quantidade} un
                                        </span>
                                    </td>
                                    <td className="font-medium">{formatCurrency(produto.preco)}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => onEdit(produto)} className="btn-icon edit" title="Editar">
                                            ✏️
                                        </button>
                                        <button onClick={() => onDelete(produto.id)} className="btn-icon delete" title="Excluir">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty-state">Nenhum produto cadastrado no momento.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
