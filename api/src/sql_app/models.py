from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String(64))
    created_at = Column(DateTime)
    full_name = Column(String)
    age = Column(Integer)
    weight = Column(Float)
    height = Column(Integer)
    sex = Column(Integer)


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime)
    content = Column(String)


class Lift(Base):
    __tablename__ = "lifts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class UserLift(Base):
    __tablename__ = "user_lifts"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime)
    lift_id = Column(Integer, ForeignKey("lifts.id"))
    gym_id = Column(Integer, ForeignKey("gyms.id"))
    weight = Column(Float)
    reps = Column(Integer)


class Gym(Base):
    __tablename__ = "gyms"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime)
    name = Column(String)
    address = Column(String)
    img1 = Column(String)


class Friend(Base):
    __tablename__ = "friends"

    id = Column(Integer, primary_key=True)
    follower_id = Column(Integer, ForeignKey("users.id"))
    following_id = Column(Integer, ForeignKey("users.id"))

