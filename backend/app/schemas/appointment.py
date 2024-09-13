from enum import Enum


class AppointmentStatus(Enum):
    PENDING = "pending"
    BOOKED = "booked"
    PROPOSED = "proposed"
    ARRIVED = "arrived"
    FULFILLED = "fulfilled"
    CANCELLED = "cancelled"
    NO_SHOW = "noshow"
    ENTERED_IN_ERROR = "entered-in-error"
    CHECKED_IN = "checked-in"
    WAITLIST = "waitlist"


class AppointmentType(Enum):
    routine = "routine"
    walk_in = "walk in"
    checkup = "checkup"
    follow_up = "follow up"
    emergency = "emergency"


# class AppointmentSchema:
