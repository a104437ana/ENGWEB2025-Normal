import json
import ast

with open('dataset.json','r',encoding='utf-8') as file:
    data = json.load(file)

resultado = []
for valor in data.values():
    novo_obj = dict(valor)
    novo_obj["_id"] = novo_obj.pop("id")  # troca "id" por "_id"
    novo_obj["anoEdição"] = int(novo_obj["anoEdição"])
    resultado.append(novo_obj)

with open("dataset_corrigido.json",'w',encoding='utf-8') as file:
    json.dump(resultado, file, indent=4, ensure_ascii=False)