import uvicorn
import os
from dotenv import load_dotenv

from app import create_app

load_dotenv(dotenv_path='.env')

if __name__ == '__main__':
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))

    uvicorn.run("main:app", host=host, port=port, log_level="info", reload=True, reload_dirs=["app"])
else:
    app = create_app()
