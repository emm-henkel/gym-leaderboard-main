from datetime import datetime
from pydantic import BaseModel


class OurBaseModel(BaseModel):
    class Config:
        orm_mode = True


class UserBase(OurBaseModel):
    email: str


class UserCreate(UserBase):
    password: str
    created_at: datetime
    full_name: str = ''
    age: int = 0
    weight: float = 0
    height: int = 0
    sex: int = 0


class User(UserBase):
    id: int
    full_name: str = ''
    age: int = 0
    weight: float = 0
    height: int = 0
    sex: int = 0


class PostBase(OurBaseModel):
    content: str = ''
    user_id: int


class PostCreate(PostBase):
    created_at: datetime


class Post(PostBase):
    pass


class LiftBase(OurBaseModel):
    name: str


class LiftCreate(LiftBase):
    pass


class Lift(LiftBase):
    id: int


class UserLiftBase(OurBaseModel):
    user_id: int
    lift_id: int
    gym_id: int
    weight: float
    reps: int


class UserLiftCreate(UserLiftBase):
    created_at: datetime
    user_id: int
    lift_id: int
    gym_id: int
    weight: float
    reps: int


class UserLift(UserLiftBase):
    pass


class GymBase(OurBaseModel):
    name: str


class GymCreate(GymBase):
    created_at: datetime
    address: str
    img1: str


class Gym(GymBase):
    id: int
    address: str
    img1: str


class FriendBase(OurBaseModel):
    follower_id: int
    following_id: int


class FriendCreate(FriendBase):
    pass


class Friend(FriendBase):
    pass

