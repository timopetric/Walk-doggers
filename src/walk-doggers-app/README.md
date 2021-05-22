# Walk Doggers app

## Frontend Requirements

* [Expo](https://docs.expo.io/).

### To start:

```bash
expo start
```

### To run expo in docker:

```bash
# ! change REACT_NATIVE_PACKAGER_HOSTNAME to your (local) ip addr !
docker run -it --rm \
    -p 19000-19010:19000-19010 -v "$PWD:/app" \
    -e REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.120 \
    -e EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
    --name=walk-doggers-expo kerbe/expo start
```

### To run expo web version for TEST purposes:
```bash
docker run -it --rm \
    -p 19000-19010:19000-19010 -v "$PWD:/app" \
    -e EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
    --name=walk-doggers-expo-web kerbe/expo start:web
# now scan the qr code with your device
```

add API url to walk-doggers-app/localConstants.js

for example:
```
export const BASE_API_URL='https://walk-doggers.herokuapp.com';
```
