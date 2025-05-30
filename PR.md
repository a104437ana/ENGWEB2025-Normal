O ficheiro queries.txt está na pasta ex1.
O dataset que importei para o Mongo está na pasta ex1 e chama-se dataset_corrigido.json.
O dataset original é o dataset.json na pasta ex1 (não importei este dataset para o Mongo).

# Persistência de dados
Eu implementei a persistência de dados no **MongoDB**, armazenando um array de objetos JSON. Cada objeto representa uma edição da Eurovisão.

# Setup da base de dados
## Modificações no dataset
Primeiro analisei o dataset e percebi que:
1. O campo do Ano de Edição era uma String.
2. As edições tinham o campo id em vez do campo _id.
3. Tinhamos um dicionários de edições da eurovisão.

Em segundo lugar, alterei o dataset:
1. Mudei o campo Ano de Edição para um Inteiro.
2. O campo id passou a ser _id porque no MongoDB os identificadores teem este nome normalmente;
3. Passamos a ter um array de ediçõs da eurovisão.

Para alterar o dataset executei o programa [dataset.py](ex1/dataset.py) na pasta ex1:
```
python3 dataset.py
```
Assim, obtive o novo dataset tratado, [dataset_corrigido.json](ex1/dataset_corrigido.json).

Em terceiro lugar, importei o novo dataset numa base de dados em MongoDB como pedia no enunciado:

Iniciar o meu container Docker:
```
sudo docker start a828ec4bc4de
```
Copiar o [dataset_corrigido.json](ex1/dataset_corrigido.json) para o container:
```
sudo docker cp dataset_corrigido.json mongoEW:/tmp
```
Acessar o terminal do container:
```
sudo docker exec -it mongoEW sh
```
Importar o [dataset_corrigido.json](ex1/dataset_corrigido.json) para o MongoDB:
```
mongoimport -d eurovisao -c edicoes /tmp/dataset_corrigido.json --jsonArray
```
# Respostas textuais pedidas

As queries em MongoDB já se encontram no ficheiro [queries.txt](ex1/queries.txt), mas aqui as temos novamente:

1. Quantos registos estão na base de dados;
```js
   db.edicoes.countDocuments()
```
2. Quantos edições têm "Ireland" como vencedor?
```js
   db.edicoes.countDocuments({ vencedor: "Ireland" })
```
3. Qual a lista de intérpretes (ordenada alfabeticamente e sem repetições)?
```js
   db.edicoes.aggregate([
  { $unwind: "$musicas" },
  { $group: { _id: "$musicas.interprete" } },
  { $sort: { _id: 1 } }
])
```
4. Qual a distribuição de músicas por edição (quantas músicas há em cada edição)?
```js
   db.edicoes.aggregate([
  { $project: { anoEdicao: 1, totalMusicas: { $size: "$musicas" } } },
  { $sort: { anoEdicao: 1 } }
])
```
5. Qual a distribuição de vitórias por país (quantas vitórias tem cada país)?
```js
   db.edicoes.aggregate([
  { $group: { _id: "$vencedor", totalVitorias: { $sum: 1 } } },
  { $sort: { totalVitorias: -1 } }
])
```
# Ações necessárias para quem estiver de fora poder arrancar as aplicações‼️
Clonar o repositório:
- Via SSH:
```
git clone git@github.com:a104437ana/ENGWEB2025-Normal.git
```
- Ou, se preferir, via HTTPS:
```
git clone https://github.com/a104437ana/ENGWEB2025-Normal.git
```
Depois, entrar no repositório:
```
cd ENGWEB2025-Normal
```
Iniciar um container Docker:
```
sudo docker start ???
```
Copiar o [ex1/dataset_corrigido.json](ex1/dataset_corrigido.json) para seu o container:
```
sudo docker cp ex1/dataset_corrigido.json ??:/tmp
```
Acessar o terminal do seu container:
```
sudo docker exec -it ?? sh
```
Importar o [ex1/dataset_corrigido.json](ex1/dataset_corrigido.json) para o MongoDB:
```
mongoimport -d eurovisao -c edicoes /tmp/dataset_corrigido.json --jsonArray
```
# Instruções de como executar as aplicações desenvolvidas / Comandos de execução das apps‼️

Depois de clonar o repositório e importar os dados para o MongoDB, vamos executar as aplicações.

Abrir **dois** terminais na pasta `ENGWEB2025-Normal`:

### Terminal 1 
(correr API de dados)
```
cd ex1
```
```
cd API_de_dados
```
```
npm i
```
```
npm start
```
Para explorar a API de dados apenas: http://localhost:25000
### Terminal 2 
(correr o front-end, que depende da API de dados, logo a API de dados tem de estar a correr)
```
cd ex2
```
```
cd Front-end
```
```
npm i
```
```
npm start
```
Para explorar o Front-end: http://localhost:25001