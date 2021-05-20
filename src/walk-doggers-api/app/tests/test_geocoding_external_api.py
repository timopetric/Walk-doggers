import pytest
from app.geocoding_external_api import get_location_text


@pytest.mark.asyncio
async def test_get_location_text1():
    result = await get_location_text(46.020052, 14.382740)
    assert result == 'Dragomer, Lepa pot 5'


@pytest.mark.asyncio
async def test_get_location_text2():
    result = await get_location_text(46.16289119572218, 14.544952475000815)
    assert result == 'Domžale, Šinkov Turn -'
