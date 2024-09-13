from typing import Annotated, Optional, List

from fastapi import APIRouter, Depends, status, Query, Security, HTTPException
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_session, get_current_user
from app.models import Appointment, User

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
)
async def get_appointments(
    user_id: str,
    session: AsyncSession = Depends(get_session),
    user: User = Security(get_current_user, scopes=["user"]),
):
    query = select(Appointment).where(
        or_(Appointment.patient_id == user_id, Appointment.patient_id == user_id)
    )
    result = await session.execute(query)

    appointments = result.all()

    return appointments


# @router.get("/{appointment_id}", response_model=, status_code=status.HTTP_200_OK)
