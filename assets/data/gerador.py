import csv
import json
import pandas as pd

df = pd.read_csv("taxa.csv", sep=";")

states = df.name.unique().tolist()
years = df.date.unique().tolist()
values = []

values = [df.loc[df.name == s, "value"].to_list() for s in states]

print(values)

with open('taxa.csv', mode='w') as taxas:
    taxas_writer = csv.writer(taxas, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

    taxas_writer.writerow(["name"] + years)

    for (s, v) in zip(states, values):
        taxas_writer.writerow([s] + v)


