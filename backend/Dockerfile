FROM python:3.12.4-slim-bullseye as base

ENV PYTHONUNBUFFERED 1
WORKDIR /build

FROM base as common
COPY requirements.txt .
# Create venv, add it to path and install requirements
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"
RUN pip install -r requirements.txt

# Install uvicorn server
RUN pip install uvicorn[standard]

# Copy the rest of app
COPY app app
COPY alembic alembic
COPY alembic.ini .
COPY init.sh .

COPY ../../../Desktop/healthnex-backend-master/healthnex-backend-master /build

CMD bash init.sh && \
    /venv/bin/uvicorn app.main:app --app-dir /build --host 0.0.0.0 --port 8000 --loop uvloop
#    /venv/bin/uvicorn app.main:app --app-dir /build --host 0.0.0.0 --workers 2 --port 8000 --loop uvloop

# TODO: IMPLEMENT MULTIPLE WORKERS
# Expose the application port
EXPOSE 8000
