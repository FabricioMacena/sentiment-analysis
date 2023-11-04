# Use a imagem Python 3.11.4 como base
FROM python:3.11.4

WORKDIR /app/

COPY . /app/

RUN /venv/bin/python -m pip install -r requirements.txt

EXPOSE 5000

CMD ["waitress-serve", "--call", "app:create_app"]
