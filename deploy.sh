#!/bin/bash

# ==============================================================================
# SCRIPT DE DEPLOY AUTOMATIZADO COM ROLLBACK SIMPLES (PARTE 5)
# ==============================================================================

echo "🚀 Iniciando processo de Deploy Automatizado..."

# 1. Salvar o estado atual (Backup/Rollback point)
echo "📦 Salvando a versão atual dos containers caso precisemos de Rollback..."
docker compose stop
# Fazemos um commit temporário do estado atual dos containers (simulação de backup de versão)
docker tag stock-backend:latest stock-backend:rollback-backup 2>/dev/null || true
docker tag stock-frontend:latest stock-frontend:rollback-backup 2>/dev/null || true

# 2. Atualizar para a nova versão (Deploy)
echo "🔄 Puxando as novas atualizações e reconstruindo imagens..."
# O --pull always garante que pegamos as imagens novas se elas vierem do Docker Hub
docker compose up -d --build

# 3. Verificação de Saúde (Healthcheck)
echo "⏳ Aguardando 15 segundos para a estabilização dos serviços..."
sleep 15

echo "🩺 Verificando se a API está saudável (Healthcheck)..."
# Tenta fazer uma requisição para a rota de health do backend
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health || echo "000")

if [ "$HTTP_STATUS" -eq 200 ]; then
    echo "✅ DEPLOY COM SUCESSO! O sistema está online e saudável."
else
    # 4. ROLLBACK SIMPLES (Caso o deploy tenha falhado)
    echo "❌ ALERTA: O deploy falhou! A API retornou status $HTTP_STATUS."
    echo "⏪ INICIANDO ROLLBACK SIMPLES..."
    
    # Derruba a versão com defeito
    docker compose down
    
    # Restaura as tags antigas que salvamos no passo 1
    docker tag stock-backend:rollback-backup stock-backend:latest 2>/dev/null || true
    docker tag stock-frontend:rollback-backup stock-frontend:latest 2>/dev/null || true
    
    # Sobe a versão antiga novamente (sem buildar para usar a imagem velha)
    docker compose up -d
    
    echo "✅ ROLLBACK CONCLUÍDO! O sistema voltou para a versão anterior segura."
    exit 1 # Sai com erro para a pipeline saber que falhou
fi