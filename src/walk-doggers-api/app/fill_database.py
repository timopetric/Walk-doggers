import requests
import json
from datetime import datetime, timedelta
import random
import time

# BASE_URL = "https://walk-doggers.herokuapp.com"
from requests import Session

BASE_URL = "http://localhost"
BASE_IMAGE_URL = "https://walk-doggers.s3.eu-central-1.amazonaws.com"

DOG_IMAGE_NAMES = ["pbckxlkskqsduda.jpeg", "bswgyhdxpnjjuij.jpeg", "ftlvwpbzptwlobm.jpeg", "znieuyjdqxnulzp.jpeg",
                   "hosruophzhyooxx.jpeg", "uxdsvwcztutnnqs.jpeg", "bxgjcaaifxrrpdb.jpeg"]
DOG_IMAGE_URLS = [f"{BASE_IMAGE_URL}/{img_name}" for img_name in DOG_IMAGE_NAMES]

DOG_NAMES = ["Koki", "Kiki", "Bobi", "Kepica", "Kuki", "Strela", "Yellow", "Pika", "Dark", "Blue", "Stella"]
LISTING_DESCRIPTIONS = [
    "Zelo dober opis oglasa.",
    "Kuža je že več časa sam. Išče sprehajalca.",
    "moj ljubljenček išče sprehajalca",
    "Pes ki je ves čas sprehoda na nogah",
    "Kuža je že več časa sam. Išče sprehajalca.",
    "Zelo okoren kuža, potrebuje nekoga, ki mu bo delal družbo.",
    "Rad skače.",
    "Zelo luškan pes, ki nikomur nič ne zameri.",
    "Rad se igra in namaka v morju.",
    "Lep pes, ki velikokrat kaj ušpiči"
]
LISTING_NAMES = [
    "Vreden ogleda",
    "Ljubek pes",
    "Prijazen kuža",
    "Super kuža 6/5",
    "Najlepši kosmatinec",
    "Lep kuža",
    "Chill dog",
    "Walk friendly",
    "Kuža, ki sprehaja",
    "This dog. *_*"
]


class User:
    def __init__(self, name, email, jwt):
        self.id: str
        self.name = name
        self.email = email
        self.jwt = jwt
        self.dogIds = list()
        self.listingIds = list()
        self.session = requests.Session()
        self.session.headers.update({"Authorization": f"Bearer {self.jwt}"})

    def __str__(self) -> str:
        return f"USER({self.email}, dogs: {self.dogIds}, listings: {self.listingIds} JWT: \n{self.jwt}\n)"

    def __repr__(self) -> str:
        return f"USER({self.email}, {self.dogIds})"

    def add_dog(self, name):
        data = {
            "name": name,
            "description": "My beautiful dog",
            "size_category": 0,
            "photo": random.choice(DOG_IMAGE_URLS)
        }
        # print(data["photo"])
        req = self.session.post(f"{BASE_URL}/dogs", json=data)
        res = json.loads(req.text)
        assert "id" in res
        print(f"Added dog {name} to user {self.email}")
        self.dogIds.append(res["id"])

    def add_listing(self,
                    title, desc,
                    location_lat: float, location_lon: float,
                    date_from: datetime, date_days: float):
        assert len(self.dogIds) > 0
        data = {
            "title": title,
            "description": desc,
            "date_from": date_from.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "date_to": (date_from + timedelta(days=date_days)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "lat": location_lat,
            "lon": location_lon,
            "dog_id": random.choice(self.dogIds)
        }
        # print(self.jwt, data["title"])
        req = self.session.post(f"{BASE_URL}/listings", json=data)
        # print(req.request.headers)
        res = json.loads(req.text)

        assert "id" in res, res
        print(f"Added listing {title} to user {self.email}")
        self.listingIds.append(res["id"])

    def get_user_id(self):
        req = self.session.get(f"{BASE_URL}/auth/protected")
        res = json.loads(req.text)
        assert "id" in res, res
        self.id = res["id"]
        return self.id


def reg_user(email: str, name: str, description: str):
    data = {
        "email": email,
        "first_name": name,
        "last_name": "Novak",
        "description": description,
        # "image_url": "image_url",
        "password": "Dobr0$Geslo"
    }

    req = requests.post(f"{BASE_URL}/auth/register", json=data)
    print(req)
    print(req.text)


def login_and_get_user(email: str) -> User:
    data = {
        "email": email,
        "password": "Dobr0$Geslo"
    }
    req = requests.post(f"{BASE_URL}/auth/login", json=data)
    res = json.loads(req.text)
    assert "jwt" in res
    print(f"Got jwt for {email}")
    # jwt = res["jwt"]
    return User("", email, res["jwt"])


if __name__ == "__main__":

    users = [
        ("aaa@a.a", "Janez", "Rad hodim v hribe"),
        ("bbb@a.a", "Anita", "Vedno vesela :D"),
    ]

    for email, name, description in users:
        reg_user(email, name, description)
        user = login_and_get_user(email)
        for _ in range(3):
            user.add_dog(random.choice(DOG_NAMES))
        for _ in range(3):
            user.add_listing(random.choice(LISTING_NAMES), random.choice(LISTING_DESCRIPTIONS),
                             random.uniform(46.018247, 46.098247), random.uniform(14.501531, 14.589531),
                             datetime.now(), random.uniform(0.8, 4))

        print("################### USER ID: #######################")
        print(user.get_user_id())
