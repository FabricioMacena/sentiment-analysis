FROM python:3.11.4

WORKDIR /app/sentiment-analysis/

COPY . /app/sentiment-analysis/

RUN /bin/bash -c "source /app/sentimentanalysis/env/bin/activate"

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["waitress-serve", "--call", "app:create_app"]
