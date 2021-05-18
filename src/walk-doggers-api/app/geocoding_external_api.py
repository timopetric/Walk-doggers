import pytest
from httpx import AsyncClient
import json
from pprint import pprint
import traceback
from ratelimit import limits, sleep_and_retry

# geocode.xyz free tier limit is 1 call per second
CALLS = 1
RATE_LIMIT = 1


@sleep_and_retry
@limits(calls=CALLS, period=RATE_LIMIT)
async def _get_location_text_request(lat: float, lon: float) -> dict:
    async with AsyncClient() as client:
        url = f"https://geocode.xyz/{lat:.6f},{lon:.6f}?json=1&region=SI"
        print(f"Trying to get location text from url: {url}")
        r = await client.get(url, timeout=30.0)

        try:
            resp_dict = json.loads(r.text)
        except Exception as e:
            print("Something went wrong with geocoding api", traceback.print_exc())

        return resp_dict


async def get_location_text(lat: float, lon: float) -> str:
    geocoding_dict = await _get_location_text_request(lat, lon)

    try:
        city = geocoding_dict["city"]
        street_address = geocoding_dict["staddress"]
        street_number = geocoding_dict["stnumber"]
        city = city if city else "-"
        street_address = street_address if street_address else "-"
        street_number = street_number if street_number else "-"
        return f"{city}, {street_address} {street_number}"
    except Exception:
        print("Extracting street text from geocoding api json failed.", traceback.print_exc())
        print("got response:")
        pprint(geocoding_dict)
        return "None"


# if __name__ == "__main__":
#     import asyncio
#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)
#     result = loop.run_until_complete(get_location_text(46.020052, 14.382740))
#     pprint(result)
#     result = loop.run_until_complete(get_location_text(46.05769025550722, 14.510479368879631))
#     pprint(result)
#     result = loop.run_until_complete(get_location_text(46.16289119572218, 14.544952475000815))
#     pprint(result)
