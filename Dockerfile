FROM python:3.11.4

WORKDIR /app/sentimentanalysis/

COPY . /app/sentimentanalysis/

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["waitress-serve", "--call", "app:create_app"]
