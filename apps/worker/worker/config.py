import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/growthfactory")
WEB_INTERNAL_URL = os.getenv("WEB_INTERNAL_URL", "http://localhost:3000")
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "mock")
