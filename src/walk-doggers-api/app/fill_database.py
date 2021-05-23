import requests
import json
from datetime import datetime, timedelta
import random
from typing import List, Tuple

# BASE_URL = "https://walk-doggers.herokuapp.com"
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

CONVERSATION1 = [("Pozdravljeni, kdaj približno bi potrebovali sprehod?", 0),
                 ("Mislim da bi lahko že ob pol enih jutri", 1),
                 ("Super, ravno takrat imam čas. Lahko pridem s kolesom.", 0),
                 ("Mi prosim podate še točen naslov?", 0),
                 ("Seveda, pošljite mi sms in vam pošljem naslov.", 1),
                 ("moj telefon je: 030 021 323", 1),
                 ("Velja! Hvala.", 0),
                 ]


LOREM_IPSUM = """Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ipsum quam, posuere et ipsum eu, 
aliquet pharetra lorem. Nam rutrum viverra arcu, at cursus mauris pulvinar et. Aenean erat neque, tristique blandit 
tellus feugiat, aliquam pulvinar ipsum. Mauris sed blandit ligula, finibus commodo libero. Phasellus molestie sem 
eget scelerisque egestas. Etiam eu arcu nec diam sagittis imperdiet sed eu enim. Suspendisse id ligula eu dui 
malesuada malesuada. Fusce euismod id neque eu fringilla. Curabitur ut neque augue. In hac habitasse platea dictumst. 
Quisque nec nisl vel nisi sodales pharetra. Nullam in tincidunt nisl. 

Quisque rutrum erat eu mauris hendrerit, id consectetur justo rhoncus. Suspendisse vel scelerisque tellus, 
quis tincidunt ligula. Aliquam tincidunt semper mauris, ac consectetur mi. Aliquam congue lobortis elit, ut imperdiet 
quam congue non. Praesent sem lacus, cursus gravida ultricies at, facilisis a nisi. Donec imperdiet libero arcu, 
sed gravida neque eleifend laoreet. Etiam ut orci in arcu feugiat pretium a sit amet lorem. Pellentesque habitant 
morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec et orci non nibh lobortis aliquam. 
Suspendisse metus dolor, posuere dapibus ligula sed, auctor tristique risus. Cras tempus feugiat sapien in pharetra. 
Aliquam tristique laoreet ante eget vestibulum. Quisque vehicula. """

BLOG_POSTS = [
    ("Ne boste verjeli kaj je rekel!!", "Psi naj bi bili po njegovem mnenju ... "+LOREM_IPSUM),
    ("Psi naj bi pomirjali ljudi", "V novi raziskavi, kjer je sodelovalo 1000 ljudi, so ugotovili, "+LOREM_IPSUM)
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
        self.reporter = False

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
        assert "id" in res, res
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

    def send_message(self, text: str, receiver_id: str):
        assert len(receiver_id) == 36, "receiver_id must be string of UUID4 type"
        assert "Bearer" in self.session.headers.get("Authorization"), "user JWT must be set"
        data = {
            "message": text,
            "receiver_id": receiver_id
        }
        req = self.session.post(f"{BASE_URL}/inbox", json=data)
        res = json.loads(req.text)

        assert "id" in res, res
        print(f"User {self.email} sent msg to user: {receiver_id}: '{text}'")

    def check_roles_is_reporter(self):
        req = self.session.get(f"{BASE_URL}/auth/roles")
        res = json.loads(req.text)
        assert "reporter" in res, res
        self.reporter = res["reporter"]
        return self.reporter

    def become_reporter(self):
        req = self.session.post(f"{BASE_URL}/auth/roles/become_reporter")
        res = json.loads(req.text)
        assert "reporter" in res, res
        assert res["reporter"], res
        self.reporter = res["reporter"]
        return self.reporter

    def create_blog_post(self, blog_post: Tuple[str, str]):
        assert "Bearer" in self.session.headers.get("Authorization"), "user JWT must be set"
        if not self.check_roles_is_reporter():
            self.become_reporter()

        title, body = blog_post
        data = {
            "title": title,
            "content": body,
            "photo": random.choice(DOG_IMAGE_URLS)
        }
        req = self.session.post(f"{BASE_URL}/blog", json=data)
        res = json.loads(req.text)

        assert "id" in res, res
        print(f"User {self.email} posted a blog post: {title} [now in rewiew]")


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


def simulate_conversation_with_user(user1: User, user2: User, conversation_list: List[Tuple[str, int]]):
    assert "Bearer" in user1.session.headers.get(
        "Authorization"), "User must be initialized - logged on (valid authorization headers)."
    assert "Bearer" in user2.session.headers.get(
        "Authorization"), "User must be initialized - logged on (valid authorization headers)."
    for msg, u_inx in conversation_list:
        if u_inx == 0:
            user1.send_message(msg, user2.id)
        elif u_inx == 1:
            user2.send_message(msg, user1.id)
        else:
            raise ValueError("Conv list can have only 0 and 1 second vals in tuples")


if __name__ == "__main__":

    # run "docker-compose up --build" and then:
    # docker exec -it walk-doggers-api_server_1 python app/fill_database.py

    users = [
        ("aaaa@a.a", "Janez", "Rad hodim v hribe"),
        ("bbbb@a.a", "Anita", "Vedno vesela :D"),
    ]
    assert len(users) >= 2, "for conv generation we need 2 users"

    created_users: List[User] = list()
    for uEmail, uName, uDescription in users:
        reg_user(uEmail, uName, uDescription)
        user = login_and_get_user(uEmail)
        for _ in range(3):
            user.add_dog(random.choice(DOG_NAMES))
        for _ in range(3):
            user.add_listing(random.choice(LISTING_NAMES), random.choice(LISTING_DESCRIPTIONS),
                             random.uniform(46.018247, 46.098247), random.uniform(14.501531, 14.589531),
                             datetime.now(), random.uniform(0.8, 4))
        print("################### created USER with ID: #######################")
        print(user.get_user_id())
        print(user.jwt)
        print("#################################################################")

        created_users.append(user)

    simulate_conversation_with_user(created_users[0], created_users[1], CONVERSATION1)

    random.choice(created_users).create_blog_post(random.choice(BLOG_POSTS))

