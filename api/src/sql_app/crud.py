from passlib.context import CryptContext
from sqlalchemy import desc
from sqlalchemy.orm import Session
from . import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.email == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    real_hashed_password = pwd_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=real_hashed_password,
                          created_at=user.created_at, full_name=user.full_name,
                          age=user.age, weight=user.weight,
                          height=user.height, sex=user.sex)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def edit_user(db: Session, user_id: int, user: schemas.User):
    db_user = get_user(db, user_id)
    db_user.email = user.email
    db_user.full_name = user.full_name
    db_user.age = user.age
    db_user.weight = user.weight
    db_user.height = user.height
    db_user.sex = user.sex
    db.flush()
    db.commit()
    return db_user


def update_user(db: Session, user_id: int, newUser: schemas.User):
    db_user = db.query(models.User).filter(models.User.id == user_id). \
        update({models.User.age: models.User.age + 10}, synchronize_session=False)
    db.commit()
    return db_user


def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db.delete(db_user)
    db.commit()
    return db_user


def get_gym(db: Session, gym_id: int):
    return db.query(models.Gym).filter(models.Gym.id == gym_id).first()


def get_gyms_by_address(db: Session, address: str):
    return db.query(models.Gym).filter(models.Gym.address == address).first()


def get_gyms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Gym).offset(skip).limit(limit).all()


def create_gym(db: Session, gym: schemas.GymCreate):
    db_gym = models.Gym(name=gym.name, created_at=gym.created_at,
                        address=gym.address, img1=gym.img1)
    db.add(db_gym)
    db.commit()
    db.refresh(db_gym)
    return db_gym


def get_lift(db: Session, lift_id: int):
    return db.query(models.Lift).filter(models.Lift.id == lift_id).first()


def get_lift_by_name(db: Session, lift_name: str):
    return db.query(models.Lift).filter(models.Lift.name == lift_name).first()


def create_lift(db: Session, lift: schemas.LiftCreate):
    db_lift = models.Lift(name=lift.name)
    db.add(db_lift)
    db.commit()
    db.refresh(db_lift)
    return db_lift


def get_user_lifts(db: Session):
    return db.query(models.UserLift).order_by(desc(models.UserLift.weight)).all()


def get_user_lifts_for_user(db: Session, user_id: int):
    return db.query(models.UserLift)\
        .filter(models.UserLift.user_id == user_id)\
        .order_by(desc(models.UserLift.weight)).all()


def get_user_lifts_for_gym(db: Session, gym_id: int):
    return db.query(models.UserLift)\
        .filter(models.UserLift.gym_id == gym_id)\
        .order_by(desc(models.UserLift.weight)).all()


def get_user_lifts_for_lift(db: Session, lift_id: int):
    return db.query(models.UserLift)\
        .filter(models.UserLift.lift_id == lift_id)\
        .order_by(desc(models.UserLift.weight)).all()


def create_user_lift(db: Session, user_lift: schemas.UserLiftCreate):
    db_user_lift = models.UserLift(user_id=user_lift.user_id, created_at=user_lift.created_at,
                                   lift_id=user_lift.lift_id, gym_id=user_lift.gym_id,
                                   weight=user_lift.weight, reps=user_lift.reps)
    db.add(db_user_lift)
    db.commit()
    db.refresh(db_user_lift)
    return db_user_lift


def get_followings_for_user(db: Session, user_id: int):
    return db.query(models.Friend).filter(models.Friend.follower_id == user_id).all()


def get_followers_for_user(db: Session, user_id: int):
    return db.query(models.Friend).filter(models.Friend.following_id == user_id).all()


def create_relationship(db: Session, follower_id: int, following_id: int):
    db_follower = models.Friend(follower_id=follower_id, following_id=following_id)
    db.add(db_follower)
    db.commit()
    db.refresh(db_follower)
    return db_follower


def create_relationship_email(db: Session, follower_id: int, following_email: str):
    db_user = get_user_by_email(db, following_email)
    db_follower = models.Friend(follower_id=follower_id, following_id=db_user.id)
    db.add(db_follower)
    db.commit()
    db.refresh(db_follower)
    return db_follower


def get_user_posts(db: Session, user_id: int):
    return db.query(models.Post).filter(models.Post.user_id == user_id).all()


def get_all_posts(db: Session):
    return db.query(models.Post).order_by(desc(models.Post.created_at)).all()


def create_post(db: Session, post: schemas.PostCreate):
    db_post = models.Post(content=post.content, created_at=post.created_at, user_id=post.user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post
