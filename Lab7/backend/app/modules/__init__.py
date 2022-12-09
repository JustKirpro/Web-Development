from fastapi import APIRouter

from .todo.api import router as todo_router

router = APIRouter()
router.include_router(todo_router, prefix="/v1")
