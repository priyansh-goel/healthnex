from typing import Annotated, Optional, List

from fastapi import APIRouter, Depends, status, Query, Security, HTTPException
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_session, get_current_user
from app.models import Appointment, User

router = APIRouter()
