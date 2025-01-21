FROM python:3.9-slim

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=server.py
ENV ruta_archivo=./data/cards.json
ENV palabra=globalData


CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]

