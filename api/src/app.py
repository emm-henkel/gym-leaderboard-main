from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlalchemy.orm import Session
import sql_app.crud as crud, sql_app.models as models, sql_app.schemas as schemas
from sql_app.schemas import User
from sql_app.database import SessionLocal, engine

# openssl rand -hex 32
SECRET_KEY = "da0ed0992eb3249def811e3d2953e0914a8af0c466326bc144d21788a52f2cba"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

models.Base.metadata.create_all(bind=engine)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class FollowEmail(BaseModel):
    follower_id: int
    following_email: str


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


myDB: Session = Depends(get_db)


# Password Hashing Functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(db, username: str, password: str):
    user = crud.get_user_by_email(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.put("/users/{user_id}", response_model=schemas.User)
def edit_user(user_id: int, user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.edit_user(db, user_id, user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.delete("/users/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user(db=db, user_id=user_id)


@app.post("/gyms/", response_model=schemas.Gym)
def create_gym(gym: schemas.GymCreate, db: Session = Depends(get_db),
               current_user: User = Depends(get_current_active_user)):
    db_gym = crud.get_gyms_by_address(db, address=gym.address)
    if db_gym:
        raise HTTPException(status_code=400, detail="Address already registered")
    return crud.create_gym(db=db, gym=gym)


@app.get("/gyms/", response_model=list[schemas.Gym])
def read_gyms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    gyms = crud.get_gyms(db, skip=skip, limit=limit)
    return gyms


@app.get("/gyms/{gym_id}", response_model=schemas.Gym)
def read_gym(gym_id: int, db: Session = Depends(get_db)):
    db_gym = crud.get_gym(db, gym_id=gym_id)
    if db_gym is None:
        raise HTTPException(status_code=404, detail="Gym not found")
    return db_gym


@app.get("/user/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/user/me/items/")
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]


@app.get("/lifts/{lift_id}", response_model=schemas.Lift)
def read_lift(lift_id: int, db: Session = Depends(get_db)):
    db_lift = crud.get_lift(db, lift_id=lift_id)
    if db_lift is None:
        raise HTTPException(status_code=400, detail="Lift ID not found")
    return db_lift


@app.post("/lifts/", response_model=schemas.Lift)
def create_lift(lift: schemas.LiftCreate, db: Session = Depends(get_db)):
    return crud.create_lift(db=db, lift=lift)


@app.get("/user_lifts/")
def read_user_lifts(db: Session = Depends(get_db)):
    user_lifts = crud.get_user_lifts(db)
    if user_lifts is None:
        raise HTTPException(status_code=400, detail="No lifts exist")
    return user_lifts


@app.get("/user_lifts/user/{user_id}")
def read_user_lift_by_user_id(user_id: int, db: Session = Depends(get_db)):
    db_user_lift = crud.get_user_lifts_for_user(db, user_id=user_id)
    if db_user_lift is None:
        raise HTTPException(status_code=400, detail="User ID does not have any lifts")
    return db_user_lift


@app.get("/user_lifts/gym/{gym_id}")
def read_user_lift_by_gym_id(gym_id: int, db: Session = Depends(get_db)):
    db_user_lift = crud.get_user_lifts_for_gym(db, gym_id=gym_id)
    if db_user_lift is None:
        raise HTTPException(status_code=400, detail="Gym ID does not have any lifts")
    return db_user_lift


@app.get("/user_lifts/lift/{lift_id}")
def read_user_lift_by_lift_id(lift_id: int, db: Session = Depends(get_db)):
    db_user_lift = crud.get_user_lifts_for_lift(db=db, lift_id=lift_id)
    if db_user_lift is None:
        raise HTTPException(status_code=400, detail="Lift ID does not have any lifts")
    return db_user_lift


@app.post("/user_lifts/")
def create_user_lift(user_lift: schemas.UserLiftCreate, db: Session = Depends(get_db)):
    return crud.create_user_lift(db, user_lift=user_lift)



@app.get("/user/following/{user_id}")
def read_user_followings(user_id: int, db: Session = Depends(get_db)):
    db_followings = crud.get_followings_for_user(db, user_id=user_id)
    if db_followings is None:
        raise HTTPException(status_code=400, detail="User ID is not following anyone")
    return db_followings


@app.get("/user/followers/{user_id}")
def read_user_followers(user_id: int, db: Session = Depends(get_db)):
    db_followers = crud.get_followers_for_user(db, user_id=user_id)
    if db_followers is None:
        raise HTTPException(status_code=400, detail="User ID is not following anyone")
    return db_followers


@app.post("/user/follow")
def create_follower(follower: schemas.FriendCreate, db: Session = Depends(get_db)):
    return crud.create_relationship(db, follower_id=follower.follower_id, following_id=follower.following_id)


@app.post("/user/email_follow")
def create_follower_email(follow: FollowEmail, db: Session = Depends(get_db)):
    return crud.create_relationship_email(db, follower_id=follow.follower_id, following_email=follow.following_email)


@app.get("/posts/{user_id}")
def get_user_posts(user_id: int, db: Session = Depends(get_db)):
    db_posts = crud.get_user_posts(db=db, user_id=user_id)
    if db_posts is None:
        raise HTTPException(status_code=400, detail="User does not have any posts")
    return db_posts


@app.get("/posts/")
def get_posts(db: Session = Depends(get_db)):
    db_posts = crud.get_all_posts(db=db)
    if db_posts is None:
        raise HTTPException(status_code=400, detail="User does not have any posts")
    return db_posts


@app.post("/posts/")
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.create_post(db, post)
