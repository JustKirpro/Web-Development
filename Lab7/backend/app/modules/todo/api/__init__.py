from fastapi import APIRouter

from .v1.list import router as todo_router

router = APIRouter()
router.include_router(todo_router, prefix="/list")
