FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app/

COPY ./src/walk-doggers-api/requirements.txt /app/
RUN pip install -r /app/requirements.txt

ENV PYTHONPATH=/app