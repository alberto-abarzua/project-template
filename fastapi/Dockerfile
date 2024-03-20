FROM python:3.12.2-bookworm

WORKDIR /app

# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential coreutils && \
    rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV PYTHONPATH=/app/src

RUN pip install --no-cache-dir pdm==2.12.4

COPY ./pyproject.toml ./pyproject.toml
COPY ./pdm.lock ./pdm.lock

COPY . .

RUN pdm install

CMD ["pdm","run","start"]

