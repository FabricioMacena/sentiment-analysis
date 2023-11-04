# Use a imagem Python 3.11.4 como base
FROM python:3.11.4

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

CMD ["flask", "run", "--host=0.0.0.0"]
