FROM python:3.10
WORKDIR /backend
COPY ./requirements.txt /backend/requirements.txt
RUN pip install -r /backend/requirements.txt
COPY . /backend
EXPOSE 8000
CMD ["python3", "main.py"]